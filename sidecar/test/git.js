import { it, describe, after } from 'node:test'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { access, constants, mkdtemp, rm, readFile, writeFile } from 'node:fs/promises'
import { clone, isGit, pull, sidecar } from '../src/git.js'
import { execFile } from 'node:child_process'
import { run } from '../src/run.js'
import { isLinux } from '../src/sh.js'

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
  })

  it('pulls', async $ => {
    let src = await tmp()
    let dst = await tmp()
    await run('git', ['init', '-q'], { cwd: src })
    writeFile(join(src, 'readme.md'), '# Hi!')
    await run('git', ['add', '.'], { cwd: src })
    await run('git', ['commit', '-m', 'First commit'], { cwd: src })

    await run('git', ['clone', src, dst])
    $.assert.ok(await fileExists(join(dst, 'readme.md')))

    writeFile(join(src, 'LICENSE'), 'None')
    await run('git', ['add', '.'], { cwd: src })
    await run('git', ['commit', '-m', 'Second commit'], { cwd: src })
    await pull(dst)
    $.assert.ok(await fileExists(join(dst, 'LICENSE')))
  })

  it('executes sidecar scripts', async $ => {
    if (!await isLinux()) {
      $.skip('Run on Linux')
      return
    }

    it('clone', async $ => {
      let repo = join(await tmp(), 'subfolder')
      await sidecar('ukoloff/sandbox.docker/sidecar/test/sh.d#sidecar', repo)
      let home = join(repo, 'sidecar/test/sh.d')
      let a = await readFile(join(home, 'a.txt'))
      $.assert.equal(a.toString().trim(), 'A!')
      let b = await readFile(join(home, 'b.txt'))
      $.assert.equal(b.toString().trim(), 'Non-B!')
      let z = await readFile(join(home, 'z.txt'))
      $.assert.equal(z.toString().trim(), 'Z!')
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

  async function fileExists(path) {
    try {
      await access(path, constants.F_OK)
      return true
    } catch { }
  }
})
