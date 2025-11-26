import { join, resolve } from 'node:path'
import { wait, run, spawn } from './run.js'
import { sidecar as shSideCar } from './sh.js'

export function parse(uri) {
  let u = new URL(uri, 'https://github.com/')
  const params = Object.fromEntries(u.searchParams)
  u.search = ''
  const slugcnt = Number(params.slug) || 2
  const folders = u.pathname.split('/').filter($ => $)
  const slug = folders.slice(0, slugcnt).join('/')
  const folder = folders.slice(slugcnt).join('/')
  u.pathname = slug
  const ref = params.ref || u.hash.replace(/^#?/, '')
  u.hash = ''
  const repo = u.toString()
  u.username = ''
  u.password = ''
  const safe = u.toString()
  return { src: uri, repo, safe, slug, folder, ref, params }
}

export async function isGit(cwd = '') {
  let git = spawn('git', ['rev-parse', '--is-inside-work-tree'], { cwd })
  let res = await wait(git)
  return !res
}

export async function clone(url, cwd = '') {
  let src = 'string' == typeof (url) ? parse(url) : url
  const depth = Number(src.params.depth) || 1
  let args = `clone -q -n --depth=${depth} --filter=tree:0`.split(' ')
  if (src.ref)
    args.push('--branch', src.ref)
  args.push(src.repo, '.')
  let options = { cwd, stdio: 'inherit' }
  await run('git', args, options)
  if (src.folder) {
    await run('git',
      ['sparse-checkout', 'set', '--no-cone', '/' + src.folder],
      options)
  }
  await run('git', ['checkout', '-q'], options)
}

export async function pull(cwd = '') {
  await run('git', ['pull', '--ff-only', '-q'], { cwd, stdio: 'inherit' })
}

export async function sidecar(url, cwd = '') {
  const z = parse(url), safeUrl = z.safe, home = join(cwd, z.folder)
  if (!isGit(cwd)) {
    console.log('Clone:', safeUrl)
    await clone(url, cwd)
  } else {
    console.log('Pull:', safeUrl)
    await pull(cwd)
  }
  console.log('Run:', resolve(home))
  await shSideCar(home)
}
