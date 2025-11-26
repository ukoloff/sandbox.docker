import { join } from 'node:path'
import { access, constants, glob } from 'node:fs/promises'
import { run } from './run.js'

const SHELL = '/bin/sh'

export async function isLinux() {
  try {
    await access(SHELL, constants.X_OK)
    return true
  } catch { }
}

export async function sh(file, folder = '', mute = false) {
  let params = { cwd: folder }
  if (!mute)
    params.stdio = 'inherit'
  return run(SHELL, ['-e', file], params)
}

export async function sidecar(folder = '') {
  let scripts = await Array.fromAsync(glob(join(folder, '.sidecar/**/*.sh')))
  scripts.sort()
  for (let script of scripts) {
    await sh(script, folder)
  }
}
