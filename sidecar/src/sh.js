import { access, constants, glob } from 'node:fs/promises'
import { run } from './run.js'
import { join } from 'node:path'

const SHELL = '/bin/sh'

export async function isLinux() {
  try {
    await access(SHELL, constants.F_OK)
    return true
  } catch { }
}

export async function sh(file, folder = '') {
  return run(SHELL, ['-e', file], { cwd: folder })
}

export async function sidecar(folder = '') {
  let scripts = await Array.fromAsync(glob(join(folder, '.sidecar/**/*.sh')))
  scripts.sort()
  for (let script of scripts) {
    await sh(script, folder)
  }
}
