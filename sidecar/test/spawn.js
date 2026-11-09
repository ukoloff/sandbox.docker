import { mkdir, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { after, before, it } from 'node:test'
import { run } from '../src/run.js'
import { isLinux } from '../src/sh.js'
import { checkCloned, doPull, fileExists, Repo } from './common.js'

it('Exec', async $ => {
  if (!await isLinux()) {
    $.skip('Run on Linux')
    return
  }

  let tmp

  before(async $ => {
    tmp = await mkdtemp(join(tmpdir(), 'sidecar-exec-'))
  })

  after($ => {
    rm(tmp, { recursive: true })
      .catch($ => 0)
  })

  it('dev', async $ => {

    it('clone', async $ => {
      let repo = join(tmp, 'dev/clone')
      await run('node', ['.', Repo, repo])
      await checkCloned(repo)

      it('envvar', async $ => {
        let repo = join(tmp, 'dev/clone.env')
        await mkdir(repo, { recursive: true })
        process.env.SIDECAR_GIT_URL = Repo
        await run('node', [join(import.meta.dirname, '..')], { cwd: repo })
        delete process.env.SIDECAR_GIT_URL
        await checkCloned(repo)
      })
    })

    it('pull', async $ => {
      let pull = await doPull(join(tmp, 'dev/pull'))
      await run('node', ['.', pull.url, pull.dst])
      await pull.check()

      it('envvar', async $ => {
        let pull = await doPull(join(tmp, 'dev/pull.env'))
        process.env.SIDECAR_GIT_URL = pull.url
        await run('node', [resolve()], {cwd: pull.dst})
        delete process.env.SIDECAR_GIT_URL
        await pull.check()
      })
    })
  })

  it('prod', async $ => {
    let bin = resolve('dist/sidecar-git')

    it('make', async $ => {

      it('install', async $ => {
        await run('npm', ['install'])
      })

      it('bundle', async $ => {
        await run('npm', ['run', 'build'])
        await run('chmod', ['+x', '-R', 'dist'])
        $.assert.ok(fileExists(bin))
      })
    })

    it('clone', async $ => {
      let repo = join(tmp, 'prod/clone')
      await run(bin, [Repo, repo])
      await checkCloned(repo)

      it('envvar', async $ => {
        let repo = join(tmp, 'prod/clone.env')
        await mkdir(repo, { recursive: true })
        process.env.SIDECAR_GIT_URL = Repo
        await run(bin, { cwd: repo })
        delete process.env.SIDECAR_GIT_URL
        await checkCloned(repo)
      })
    })

    it('pull', async $ => {
      let pull = await doPull(join(tmp, 'prod/pull'))
      await run(bin, [pull.url, pull.dst])
      await pull.check()

      it('envvar', async $ => {
        let pull = await doPull(join(tmp, 'prod/pull.env'))
        process.env.SIDECAR_GIT_URL = pull.url
        await run(bin, { cwd: pull.dst })
        delete process.env.SIDECAR_GIT_URL
        await pull.check()
      })
    })
  })
})
