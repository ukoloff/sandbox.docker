import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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
