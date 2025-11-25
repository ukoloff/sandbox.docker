import { access, constants } from 'node:fs/promises'
import { run } from './run.js'
import { chdir } from 'node:process'

const SHELL = '/bin/sh'

export async function isLinux() {
  try {
    await access(SHELL, constants.F_OK)
    return true
  } catch { }
}

export async function sh(file, folder = '') {
  return run(SHELL, ['-e', file], {chdir: folder})
}
