import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { it, before, after } from 'node:test'
import { rm, mkdtemp, access, constants, mkdir } from 'node:fs/promises'
import { run } from '../src/run.js'
import { isLinux } from '../src/sh.js'
import { checkCloned, Repo } from './common.js'

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
      let repo = join(tmp, 'dev/pull')

    })
  })
})
