import { it, describe, after } from 'node:test'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { mkdtemp, rm } from 'node:fs/promises'
import { clone } from '../src/git.js'

describe('git', $ => {
  let tmps = []
  after(cleanUp)

  it('clones repo', async $ => {
    await clone('ukoloff/sandbox.docker/autolabel#al.js', await tmp())
  })

  async function tmp() {
    let tmp = await mkdtemp(join(tmpdir(), 'sidecar-git-'))
    tmps.push(tmp)
    return tmp
  }

  async function cleanUp() {
    for (let tmp of tmps) {
      rm(tmp, { recursive: true })
        .catch($ => 0)
    }
  }
})
