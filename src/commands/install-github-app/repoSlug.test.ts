import assert from 'node:assert/strict'
import test from 'node:test'

import { extractGitHubRepoSlug } from './repoSlug.ts'

test('keeps owner/repo input as-is', () => {
  assert.equal(extractGitHubRepoSlug('Gitlawb/tigerpaw'), 'Gitlawb/tigerpaw')
})

test('extracts slug from https GitHub URLs', () => {
  assert.equal(
    extractGitHubRepoSlug('https://github.com/Gitlawb/tigerpaw'),
    'Gitlawb/tigerpaw',
  )
  assert.equal(
    extractGitHubRepoSlug('https://www.github.com/Gitlawb/tigerpaw.git'),
    'Gitlawb/tigerpaw',
  )
})

test('extracts slug from ssh GitHub URLs', () => {
  assert.equal(
    extractGitHubRepoSlug('git@github.com:Gitlawb/tigerpaw.git'),
    'Gitlawb/tigerpaw',
  )
  assert.equal(
    extractGitHubRepoSlug('ssh://git@github.com/Gitlawb/tigerpaw'),
    'Gitlawb/tigerpaw',
  )
})

test('rejects malformed or non-GitHub URLs', () => {
  assert.equal(extractGitHubRepoSlug('https://gitlab.com/Gitlawb/tigerpaw'), null)
  assert.equal(extractGitHubRepoSlug('https://github.com/Gitlawb'), null)
  assert.equal(extractGitHubRepoSlug('not actually github.com/Gitlawb/tigerpaw'), null)
  assert.equal(
    extractGitHubRepoSlug('https://evil.example/?next=github.com/Gitlawb/tigerpaw'),
    null,
  )
  assert.equal(
    extractGitHubRepoSlug('https://github.com.evil.example/Gitlawb/tigerpaw'),
    null,
  )
  assert.equal(
    extractGitHubRepoSlug('https://example.com/github.com/Gitlawb/tigerpaw'),
    null,
  )
})
