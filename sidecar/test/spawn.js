import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { it, before, after } from 'node:test'
import { rm, mkdtemp, access, readFile, constants, mkdir } from 'node:fs/promises'
import { run } from '../src/run.js'
import { isLinux } from '../src/sh.js'

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
      await run('node', ['.', 'ukoloff/sandbox.docker/sidecar/test/sh.d#sidecar', repo])
      let home = join(repo, 'sidecar/test/sh.d')
      let a = await readFile(join(home, 'a.txt'))
      $.assert.equal(a.toString().trim(), 'A!')
      let b = await readFile(join(home, 'b.txt'))
      $.assert.equal(b.toString().trim(), 'Non-B!')
      let z = await readFile(join(home, 'z.txt'))
      $.assert.equal(z.toString().trim(), 'Z!')

      it('envvar', async $ => {
        let repo = join(tmp, 'dev/clone.env')
        await mkdir(repo, {recursive:true})
        process.env.SIDECAR_GIT_URL = 'ukoloff/sandbox.docker/sidecar/test/sh.d#sidecar'
        await run('node', [join(import.meta.dirname, '..')], { cwd: repo })
        delete process.env.SIDECAR_GIT_URL
        let home = join(repo, 'sidecar/test/sh.d')
        let a = await readFile(join(home, 'a.txt'))
        $.assert.equal(a.toString().trim(), 'A!')
        let b = await readFile(join(home, 'b.txt'))
        $.assert.equal(b.toString().trim(), 'Non-B!')
        let z = await readFile(join(home, 'z.txt'))
        $.assert.equal(z.toString().trim(), 'Z!')
      })
    })
  })
})
