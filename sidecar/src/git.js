import { resolve } from 'node:path'
import { wait, run, spawn } from './run.js'

export function parse(uri) {
  let u = new URL(uri, 'https://github.com/')
  let params = Object.fromEntries(u.searchParams)
  u.search = ''
  let folders = u.pathname.split('/').filter($ => $)
  let slug = folders.slice(0, 2).join('/')
  let folder = folders.slice(2).join('/')
  u.pathname = slug
  let ref = u.hash.replace(/^#?/, '')
  u.hash = ''
  let repo = u.toString()
  u.username = ''
  u.password = ''
  let safe = u.toString()
  return { src: uri, repo, safe, slug, folder, ref, params }
}

export async function isGit(cwd = '') {
  let git = spawn('git', ['rev-parse', '--is-inside-work-tree'], { cwd })
  let res = await wait(git)
  return !res
}

export async function clone(url, cwd = '') {
  let src = 'string' == typeof (url) ? parse(url) : url
  let args = 'clone -q -n --depth=1 --filter=tree:0'.split(' ')
  if (src.ref)
    args.push('--branch', src.ref)
  args.push(src.repo, '.')
  let options = { cwd, stdio: 'inherit' }
  await run('git', args, options)
  if (src.folder) {
    await run('git',
      ['sparse-checkout', 'set', '--no-cone', `/${src.folder}/`],
      options)
  }
  await run('git', ['checkout', '-q'], options)
}

