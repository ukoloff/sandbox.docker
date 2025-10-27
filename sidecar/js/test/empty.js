import { it, describe, after } from 'node:test'
import { tmpdir } from 'node:os'
import { mkdtemp, rm } from 'node:fs/promises'
import { join } from 'node:path'
import empty from '../src/empty.js'

describe('Empty gives', $ => {
  it("false for non-empty", async $ => {
    $.assert.ok(await empty(import.meta.dirname))
  })
  it("true for empty", async $ => {
    let tmp = await mkdtemp(join(tmpdir(), 'sidecar-empty-'))
    try {
      $.assert.ok(!await empty(tmp))
    } finally {
      rm(tmp, { recursive: true })
    }
  })
})
