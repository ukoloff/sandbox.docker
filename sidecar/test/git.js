import { it, describe, after } from 'node:test'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { mkdtemp, rm } from 'node:fs/promises'
import { clone, isGit } from '../src/git.js'

describe('git', $ => {

  describe('clones', $ => {
    let tmps = []
    after(cleanUp)

    let repos = [
      {
        name: "Branch's folder",
        url: 'ukoloff/sandbox.docker/sidecar#sidecar',
      },
      {
        name: "Branch",
        url: 'ukoloff/sandbox.docker#al.js',
      },
      {
        name: "Folder",
        url: 'ukoloff/sandbox.docker/autolabel',
      },
      {
        name: "Repo",
        url: 'ukoloff/sandbox.docker',
      },
    ]

    repos.sort($ => 0.5 - Math.random())
    for (let test of repos) {
      it(test.name, async $ => {
        let folder = await tmp()
        await clone(test.url, folder)
      })
    }

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

  it('detects itself', async $=>{
    $.assert.ok(await isGit())
    $.assert.ok(!await isGit(tmpdir()))
  })
})
