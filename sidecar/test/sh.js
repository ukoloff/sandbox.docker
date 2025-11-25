import { it, describe, after } from 'node:test'
import { isLinux, sh } from '../src/sh.js'
import { join } from 'path'
import { rm, mkdtemp, access, readFile, constants } from 'fs/promises'
import { tmpdir } from 'os'
import { fstat } from 'fs'

const skip = !await isLinux()

describe('Shell', { skip }, async $ => {
  let tmp = await mkdtemp(join(tmpdir(), 'sidecar-sh-'))
  after($ =>
    rm(tmp, { recursive: true })
      .catch($ => 0)
  )

  it('runs', async $ => {
    await sh(join(import.meta.dirname, 'sh/true.sh'), tmp)
    let one = await readFile(join(tmp, '1.txt'))
    $.assert.equal(one.toString().trim(), 'One')
    let two = await readFile(join(tmp, '2.txt'))
    $.assert.equal(two.toString().trim(), 'Two')
  })

  it('fails', async $ => {
    await $.assert.rejects(async $ =>
      await sh(join(import.meta.dirname, 'sh/false.sh'), tmp))
    let three = await readFile(join(tmp, '3.txt'))
    $.assert.equal(three.toString().trim(), 'Three')
    await $.assert.rejects(async $ =>
      access(join(tmp, '4.txt'), constants.F_OK)
    )
  })

  it('errors 2', async $ =>
    await $.assert.rejects(async $ =>
      await sh(join(import.meta.dirname, 'sh/404.sh'), tmp))
  )

  it('errors 3', async $ =>
    await $.assert.rejects(async $ =>
      await sh(join(import.meta.dirname, 'sh/true.sh'), tmp + '!'))
  )
})
