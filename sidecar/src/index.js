//
// Command Line Interface
//
import { basename } from 'node:path'
import { sidecar } from './git.js'

let url = process.argv[2] || process.env.SIDECAR_GIT_URL
if (!url) Help()

delete process.env.SIDECAR_GIT_URL

sidecar(url, process.argv[3] || '')

function Help() {
  console.log(`Usage: ${basename(process.argv[1])} [[https://github.com/]user/repo/folder#branch] folder`)
  process.exit(1)
}
