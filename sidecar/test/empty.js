import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { it, describe } from 'node:test'
import { mkdtemp, rm } from 'node:fs/promises'
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
