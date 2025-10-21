import { resolve } from 'node:path'
import { wait, run, spawn } from './run.js'

export async function isGit(cwd = '') {
  cwd = resolve(cwd)
  let git = spawn('git', ['rev-parse', '--is-inside-work-tree'], { cwd: cwd })
  let res = await wait(git)
  return !res
}

export async function clone(url, cwd = '') {
  cwd = resolve(cwd)
  let U = new URL(url, 'https://github.com/')
  let [base, folder] = splitPath(U.pathname)
  U.pathname = base
  let branch = U.hash.replace(/^#?/, '')
  U.hash = ''
  let repo = U.toString()
  let args = 'clone -q -n --depth=1 --filter=tree:0'.split(' ')
  if (branch)
    args.push('--branch', branch)
  args.push(U.toString(), '.')
  let options = { cwd: cwd, stdio: 'inherit' }
  await run('git', args, options)
  if (folder) {
    await run('git',
      ['sparse-checkout', 'set', '--no-cone', `/${folder}/`],
      options)
  }
  await run('git', ['checkout', '-q'], options)
}

function splitPath(path) {
  let folders = path.split('/').filter($ => $)
  return [folders.slice(0, 2).join('/'), folders.slice(2).join('/')]
}
