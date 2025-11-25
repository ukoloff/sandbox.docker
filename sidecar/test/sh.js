import { it, describe, after } from 'node:test'
import { isLinux } from '../src/sh.js'

const skip = !await isLinux()

describe('Shell', { skip }, $ => {
  it('runs', $ => {
  })

  it ('fails', $ => {

  })
})
