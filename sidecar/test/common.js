import assert from "node:assert";
import { access, constants, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { run } from "../src/run.js";

export const Repo = 'ukoloff/sandbox.docker/sidecar/test/sh.d#sidecar'
export const fakeRepo = 'none/none/project#none'

export async function checkCloned(repo) {
  let home = join(repo, 'sidecar/test/sh.d')
  let a = await readFile(join(home, 'a.txt'))
  assert.equal(a.toString().trim(), 'A!')
  let b = await readFile(join(home, 'b.txt'))
  assert.equal(b.toString().trim(), 'Non-B!')
  let z = await readFile(join(home, 'z.txt'))
  assert.equal(z.toString().trim(), 'Z!')
}

export async function doPull(base) {
  let src = join(base, 'src')
  let dst = join(base, 'dst')

  await mkdir(src, { recursive: true })
  await mkdir(dst, { recursive: true })

  await run('git', ['init', '-q'], { cwd: src })
  await writeFile(join(src, '.gitignore'), '# None')
  await run('git', ['add', '.'], { cwd: src })
  await run('git', ['commit', '-m', 'Commit #1'], { cwd: src })
  await run('git', ['clone', src, dst])
  assert.ok(await fileExists(join(dst, '.gitignore')))
  let sfolder = join(src, 'project/.sidecar')
  await mkdir(sfolder, { recursive: true })
  await writeFile(join(sfolder, 'run.sh'), 'echo $(( 6 * 7 )) > answer.txt')
  await run('git', ['add', '.'], { cwd: src })
  await run('git', ['commit', '-m', 'Commit #2'], { cwd: src })
  return { src, dst, url: fakeRepo, check }
}

async function check(noscript = false) {
  assert.ok(await fileExists(join(this.dst, 'project/.sidecar')))
  if (noscript)
    return
  let a = await readFile(join(this.dst, 'project/answer.txt'))
  assert.equal(a.toString().trim(), '42')
}

export async function fileExists(path) {
  try {
    await access(path, constants.F_OK)
    return true
  } catch { }
}
