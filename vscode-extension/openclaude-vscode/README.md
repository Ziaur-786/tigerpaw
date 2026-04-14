# Tigerpaw VS Code Extension

A practical VS Code companion for Tigerpaw with a project-aware **Control Center**, predictable terminal launch behavior, and quick access to useful Tigerpaw workflows.

## Features

- **Real Control Center status** in the Activity Bar:
  - whether the configured `tigerpaw` command is installed
  - the launch command being used
  - whether the launch shim injects `CLAUDE_CODE_USE_OPENAI=1`
  - the current workspace folder
  - the launch cwd that will be used for terminal sessions
  - whether `.tigerpaw-profile.json` exists in the current workspace root
  - a conservative provider summary derived from the workspace profile or known environment flags
- **Project-aware launch behavior**:
  - `Launch Tigerpaw` launches from the active editor's workspace when possible
  - falls back to the first workspace folder when needed
  - avoids launching from an arbitrary default cwd when a project is open
- **Practical sidebar actions**:
  - Launch Tigerpaw
  - Launch in Workspace Root
  - Open Workspace Profile
  - Open Repository
  - Open Setup Guide
  - Open Command Palette
- **Built-in dark theme**: `Tigerpaw Terminal Black`

## Requirements

- VS Code `1.95+`
- `tigerpaw` available in your terminal PATH (`npm install -g @gitlawb/tigerpaw`)

## Commands

- `Tigerpaw: Open Control Center`
- `Tigerpaw: Launch in Terminal`
- `Tigerpaw: Launch in Workspace Root`
- `Tigerpaw: Open Repository`
- `Tigerpaw: Open Setup Guide`
- `Tigerpaw: Open Workspace Profile`

## Settings

- `tigerpaw.launchCommand` (default: `tigerpaw`)
- `tigerpaw.terminalName` (default: `Tigerpaw`)
- `tigerpaw.useOpenAIShim` (default: `false`)

`tigerpaw.useOpenAIShim` only injects `CLAUDE_CODE_USE_OPENAI=1` into terminals launched by the extension. It does not guess or configure a provider by itself.

## Notes on Status Detection

- Provider status prefers the real workspace `.tigerpaw-profile.json` file when present.
- If no saved profile exists, the extension falls back to known environment flags available to the VS Code extension host.
- If the source of truth is unclear, the extension shows `unknown` instead of guessing.

## Development

From this folder:

```bash
npm run test
npm run lint
```

To package (optional):

```bash
npm run package
```

