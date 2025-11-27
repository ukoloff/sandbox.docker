//
// Command Line Interface
//
import { basename } from 'node:path'
import { sidecar } from './git.js'

const ENVVAR = 'SIDECAR_GIT_URL'
let { argv, env } = process

let url = argv[2] || env[ENVVAR]
if (!url) Help()

delete env[ENVVAR]

sidecar(url, argv[3] || '')

function Help() {
  console.log(`Usage: ${basename(argv[1])} [[https://github.com/]user/repo[/folder][#branch]] [folder]`)
  process.exit(1)
}
