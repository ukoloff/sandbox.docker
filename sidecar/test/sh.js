import { it, describe, after } from 'node:test'
import { isLinux, sh } from '../src/sh.js'
import { run } from '../src/run.js'
import { join } from 'path'

const skip = !await isLinux()

describe('Shell', { skip }, $ => {
  it('runs', async $ => {
    await sh(join(import.meta.dirname, 'sh/true.sh'))
  })

  it('fails', async $ => {
    await $.assert.rejects(async $ =>
      await sh(join(import.meta.dirname, 'sh/false.sh')))
  })
})
