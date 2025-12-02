import { execFile } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, describe, it } from 'node:test'
import { clone, isGit, pull, sidecar } from '../src/git.js'
import { isLinux } from '../src/sh.js'
import { checkCloned, doPull, fileExists, Repo } from './common.js'

describe('git', $ => {
  let tmps = []
  after(cleanUp)

  it('detects itself', async $ => {
    $.assert.ok(await isGit())
    $.assert.ok(!await isGit(tmpdir()))
  })

  describe('clones', $ => {

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
    for (let i = 0; i < 3; i += 2) {
      repos[i].url = 'https://github.com/' + repos[i].url
    }
    for (let test of repos) {
      it(test.name, async $ => {
        let folder = await tmp()
        await clone(test.url, folder)

        // Check whether history.length == 1
        let out = await new Promise(function (resolve, reject) {
          execFile('git', 'log --oneline -n 10'.split(' '), { cwd: folder }, cb)
          function cb(error, stdout, stderr) {
            if (error)
              return reject(error)
            if (stderr)
              return reject(Error(`Said: $stderr`))
            resolve(stdout)
          }
        })
        $.assert.equal(out.trim().indexOf("\n"), -1)
      })
    }

    it('for dev', async $ => {
      let folder = await tmp()
      await clone('ukoloff/sandbox.docker/sidecar?dev=y#sidecar', folder)
      $.assert.ok(fileExists(join(folder, '.git')))
    })
  })

  it('pulls', async $ => {
    let puller = await doPull(await tmp())
    await pull(puller.dst)
    await puller.check(true)
  })

  it('executes sidecar scripts', async $ => {
    if (!await isLinux()) {
      $.skip('Run on Linux')
      return
    }

    it('clone', async $ => {
      let repo = join(await tmp(), 'subfolder')
      await sidecar(Repo, repo)
      await checkCloned(repo)
    })

    it('pulls', async $ => {
      let pull = await doPull(await tmp())
      await sidecar(pull.url, pull.dst)
      await pull.check()
    })
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
