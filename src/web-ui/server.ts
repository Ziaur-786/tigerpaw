import http from 'http'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { WebSocketServer } from 'ws'
import chokidar from 'chokidar'
import { QueryEngine } from '../QueryEngine.js'
import { getTools } from '../tools.js'
import { getDefaultAppState } from '../state/AppStateStore.js'
import { FileStateCache, READ_FILE_STATE_CACHE_SIZE } from '../utils/fileStateCache.js'
import { getProviderProfiles, getActiveProviderProfile, setActiveProviderProfile, applyActiveProviderProfileFromConfig } from '../utils/providerProfiles.js'
import { getGlobalClaudeFile } from '../utils/env.js'


const PORT = 8080
const pendingPermissions = new Map<string, (allowed: boolean) => void>()
let activeEngine: QueryEngine | null = null

// Simple HTTP Server
const server = http.createServer((req, res) => {
  const urlPath = req.url || '/'

  // Serve generated workspace files for the preview panel
  if (urlPath.startsWith('/preview/')) {
    const relativePath = urlPath.slice('/preview/'.length).split('?')[0]
    const safePath = path.normalize(path.join(process.cwd(), relativePath))
    
    // Security check: ensure path stays inside workspace
    if (!safePath.toLowerCase().startsWith(process.cwd().toLowerCase())) {
      res.statusCode = 403
      res.end('Forbidden')
      return
    }

    if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
      const ext = path.extname(safePath).toLowerCase()
      let contentType = 'text/plain'
      if (ext === '.html') contentType = 'text/html'
      else if (ext === '.css') contentType = 'text/css'
      else if (ext === '.js') contentType = 'application/javascript'
      else if (ext === '.png') contentType = 'image/png'
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
      else if (ext === '.svg') contentType = 'image/svg+xml'
      else if (ext === '.json') contentType = 'application/json'

      res.setHeader('Content-Type', contentType)
      res.writeHead(200)
      fs.createReadStream(safePath).pipe(res)
    } else {
      res.statusCode = 404
      res.end('Not Found')
    }
    return
  }

  // Serve frontend files
  let webUiDir = path.join(import.meta.dirname, 'frontend')
  if (!fs.existsSync(webUiDir) || !fs.statSync(webUiDir).isDirectory()) {
    // Try resolving relative to workspace root
    webUiDir = path.join(process.cwd(), 'src', 'web-ui', 'frontend')
  }
  if (!fs.existsSync(webUiDir) || !fs.statSync(webUiDir).isDirectory()) {
    // Sibling lookup for bundled cases
    webUiDir = path.join(import.meta.dirname, '..', 'src', 'web-ui', 'frontend')
  }

  let relativePath = urlPath === '/' ? 'index.html' : urlPath.split('?')[0]
  const safePath = path.normalize(path.join(webUiDir, relativePath))

  if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    const ext = path.extname(safePath).toLowerCase()
    let contentType = 'text/plain'
    if (ext === '.html') contentType = 'text/html'
    else if (ext === '.css') contentType = 'text/css'
    else if (ext === '.js') contentType = 'application/javascript'
    else if (ext === '.svg') contentType = 'image/svg+xml'

    res.setHeader('Content-Type', contentType)
    res.writeHead(200)
    fs.createReadStream(safePath).pipe(res)
  } else {
    // SPA fallback: return index.html
    const indexPath = path.join(webUiDir, 'index.html')
    if (fs.existsSync(indexPath)) {
      res.setHeader('Content-Type', 'text/html')
      res.writeHead(200)
      fs.createReadStream(indexPath).pipe(res)
    } else {
      res.statusCode = 404
      res.end('Not Found')
    }
  }
})

// WebSocket Server
const wss = new WebSocketServer({ server })
const clients = new Set<any>()

function broadcast(data: any) {
  const msg = JSON.stringify(data)
  for (const client of clients) {
    if (client.readyState === 1) { // OPEN
      client.send(msg)
    }
  }
}

function getSystemStatus() {
  try {
    const profiles = getProviderProfiles()
    const active = getActiveProviderProfile()
    
    // Find all HTML files in workspace root
    const files = fs.readdirSync(process.cwd())
    const htmlFiles = files.filter(file => {
      try {
        const full = path.join(process.cwd(), file)
        return file.endsWith('.html') && fs.statSync(full).isFile()
      } catch {
        return false
      }
    })

    return {
      profiles: profiles.map(p => ({ id: p.id, name: p.name, model: p.model })),
      activeProfileId: active?.id || '',
      workspaceRoot: process.cwd(),
      htmlFiles
    }
  } catch (e) {
    return {
      profiles: [],
      activeProfileId: '',
      workspaceRoot: process.cwd(),
      htmlFiles: []
    }
  }
}

wss.on('connection', (ws) => {
  clients.add(ws)
  console.log('[WebSocket] Client connected')

  // Send status on connect
  ws.send(JSON.stringify({
    type: 'status',
    status: getSystemStatus()
  }))

  ws.on('message', async (messageData) => {
    let msg: any
    try {
      msg = JSON.parse(messageData.toString())
      console.log('[WebSocket] Received message type:', msg.type)
    } catch (e) {
      console.error('[WebSocket] Failed to parse incoming message:', e)
      return
    }

    if (msg.type === 'get_status') {
      ws.send(JSON.stringify({
        type: 'status',
        status: getSystemStatus()
      }))
    } 
    
    else if (msg.type === 'select_model') {
      const beforeModel = process.env.OPENAI_MODEL || process.env.ANTHROPIC_MODEL || '(none)'
      const beforeProvider = process.env.CLAUDE_CODE_USE_OPENAI === '1' ? 'openai-compat' : 'anthropic'
      console.log(`[WebSocket] Selecting model profile: ${msg.modelId} (before: ${beforeProvider}/${beforeModel})`)
      
      const applied = setActiveProviderProfile(msg.modelId)
      
      const afterModel = process.env.OPENAI_MODEL || process.env.ANTHROPIC_MODEL || '(none)'
      const afterProvider = process.env.CLAUDE_CODE_USE_OPENAI === '1' ? 'openai-compat' : 'anthropic'
      if (applied) {
        console.log(`[WebSocket] Model switched ✓ → ${afterProvider}/${afterModel} (baseURL: ${process.env.OPENAI_BASE_URL || process.env.ANTHROPIC_BASE_URL || 'default'})`)
      } else {
        console.warn(`[WebSocket] ⚠ setActiveProviderProfile returned null — profile ID not found: ${msg.modelId}`)
      }
      
      broadcast({
        type: 'status',
        status: getSystemStatus()
      })
    } 
    
    else if (msg.type === 'permission_response') {
      console.log('[WebSocket] Tool permission response:', msg.requestId, 'allowed:', msg.allowed)
      const resolver = pendingPermissions.get(msg.requestId)
      if (resolver) {
        resolver(msg.allowed)
        pendingPermissions.delete(msg.requestId)
      }
    } 
    
    else if (msg.type === 'user_message') {
      console.log('[WebSocket] User prompt submitted:', msg.message)
      await handleUserMessage(ws, msg.message)
    }
  })

  ws.on('close', () => {
    console.log('[WebSocket] Client disconnected')
    clients.delete(ws)
  })
})

async function handleUserMessage(ws: any, message: string) {
  if (activeEngine) {
    console.warn('[Agent] Rejecting message: Agent is already busy')
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Agent is already busy processing a request'
    }))
    return
  }

  console.log('[Agent] Initializing QueryEngine for prompt:', message)
  try {
    const fileCache = new FileStateCache(READ_FILE_STATE_CACHE_SIZE, 25 * 1024 * 1024)
    let appState = getDefaultAppState()

    const engine = new QueryEngine({
      cwd: process.cwd(),
      tools: getTools(appState.toolPermissionContext),
      commands: [],
      mcpClients: [],
      agents: [],
      includePartialMessages: true,
      canUseTool: async (tool, input, context, assistantMsg, toolUseID) => {
        const requestId = toolUseID || crypto.randomUUID()
        console.log(`[Agent] Tool execution requested: ${tool.name} (id: ${requestId})`)
        
        // Notify client that tool is starting
        ws.send(JSON.stringify({
          type: 'tool_start',
          toolName: tool.name,
          arguments: input,
          requestId
        }))

        // Wait for Web UI permission approval
        return new Promise((resolve) => {
          ws.send(JSON.stringify({
            type: 'action_required',
            requestId,
            toolName: tool.name,
            question: `Approve execution of tool **${tool.name}**?`
          }))

          pendingPermissions.set(requestId, (allowed) => {
            console.log(`[Agent] Tool ${tool.name} permission resolve: ${allowed}`)
            if (allowed) {
              resolve({ behavior: 'allow' })
            } else {
              resolve({ behavior: 'deny', reason: 'User denied permission in Web UI' })
            }
          })
        })
      },
      getAppState: () => appState,
      setAppState: (updater) => { appState = updater(appState) },
      readFileCache: fileCache,
    })

    activeEngine = engine
    console.log('[Agent] Submitting message to QueryEngine')
    const generator = engine.submitMessage(message)
    let fullText = ''

    for await (const msg of generator) {
      console.log('[Agent] Stream event subtype:', msg.type)
      if (msg.type === 'stream_event') {
        if (msg.event.type === 'content_block_delta' && msg.event.delta.type === 'text_delta') {
          ws.send(JSON.stringify({
            type: 'text_chunk',
            text: msg.event.delta.text
          }))
          fullText += msg.event.delta.text
        }
      } else if (msg.type === 'assistant') {
        let assistantText = ''
        const content = msg.message.content
        if (typeof content === 'string') {
          assistantText = content
        } else if (Array.isArray(content)) {
          for (const block of content) {
            if (block && typeof block === 'object') {
              if (block.type === 'text') {
                assistantText += block.text || ''
              }
            }
          }
        }

        if (assistantText && assistantText.length > fullText.length) {
          const diff = assistantText.slice(fullText.length)
          if (diff) {
            ws.send(JSON.stringify({
              type: 'text_chunk',
              text: diff
            }))
            fullText = assistantText
          }
        }
      } else if (msg.type === 'user') {
        const content = msg.message.content
        if (Array.isArray(content)) {
          for (const block of content) {
            if (block.type === 'tool_result') {
              let outputStr = ''
              if (typeof block.content === 'string') {
                outputStr = block.content
              } else if (Array.isArray(block.content)) {
                outputStr = block.content.map(c => c.type === 'text' ? c.text : '').join('\n')
              }
              console.log(`[Agent] Tool result: ${block.tool_use_id} (error: ${block.is_error || false})`)
              ws.send(JSON.stringify({
                type: 'tool_result',
                toolName: block.tool_use_id,
                output: outputStr,
                isError: block.is_error || false
              }))
            }
          }
        }
      }
    }

    console.log('[Agent] Engine completed. Sending done')
    ws.send(JSON.stringify({
      type: 'done',
      fullText
    }))

    // Send updated status since tools might have created new files (like index.html)
    broadcast({
      type: 'status',
      status: getSystemStatus()
    })

  } catch (err: any) {
    console.error('[Agent] Fatal error during message run:', err)
    ws.send(JSON.stringify({
      type: 'error',
      message: err.message || 'Error occurred during generation'
    }))
  } finally {
    activeEngine = null
    console.log('[Agent] Query session ended')
  }
}

// Watch workspace folder for hot reload
const watcher = chokidar.watch(process.cwd(), {
  ignored: /(node_modules|\.git|\.tigerpaw|dist)/,
  persistent: true,
  ignoreInitial: true,
})

watcher.on('all', (event, filePath) => {
  const relativePath = path.relative(process.cwd(), filePath)
  broadcast({
    type: 'file_change',
    filename: relativePath
  })
})

// Watch global config file so CLI model changes auto-sync to the Web UI.
// When the user switches models in a CLI session, it updates the config file
// on disk but this server's process.env stays stale. This watcher detects the
// change and re-applies the active profile, then broadcasts updated status.
try {
  const configPath = getGlobalClaudeFile()
  if (configPath && fs.existsSync(configPath)) {
    let configSyncDebounce: ReturnType<typeof setTimeout> | null = null
    fs.watch(configPath, () => {
      if (configSyncDebounce) clearTimeout(configSyncDebounce)
      configSyncDebounce = setTimeout(() => {
        configSyncDebounce = null
        const previousModel = process.env.OPENAI_MODEL || process.env.ANTHROPIC_MODEL || '(none)'
        applyActiveProviderProfileFromConfig(undefined, { force: true })
        const newModel = process.env.OPENAI_MODEL || process.env.ANTHROPIC_MODEL || '(none)'
        if (newModel !== previousModel) {
          console.log(`[Config] Active model changed via CLI: ${previousModel} → ${newModel}`)
        }
        broadcast({
          type: 'status',
          status: getSystemStatus()
        })
      }, 300)
    })
    console.log(`[Config] Watching global config for model changes: ${configPath}`)
  }
} catch (e) {
  // Ignore if config path is unavailable
}

// Start Server
server.listen(PORT, () => {
  console.log(`\n🐅 Tigerpaw Web UI running at http://localhost:${PORT}`)
})
