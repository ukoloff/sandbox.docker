import { spawn } from 'node:child_process'
import { resolve } from 'node:path'

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
  let options = { cwd: cwd, stdio: 'inherit'}
  await execute('git', args, options)
  if (folder) {
    await execute('git',
      ['sparse-checkout', 'set', '--no-cone', `/${folder}/`],
      options)
  }
  await execute('git', ['checkout', '-q'], options)
}

function splitPath(path) {
  let folders = path.split('/').filter($ => $)
  return [folders.slice(0, 2).join('/'), folders.slice(2).join('/')]
}

function wait(child) {
  return new Promise(function (resolve, reject) {
    child
      .on('error', reject)
      .on('exit', resolve)
  })
}

async function execute(...params) {
  let res = await wait(spawn(...params))
  if (res)
    throw Error(`Exited with code #${res}`)
}
