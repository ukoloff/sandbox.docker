//
// Command Line Interface
//
import { basename } from 'node:path'
import { parse, sidecar } from './git.js'

const ENVVAR = 'SIDECAR_GIT_URL'
let { argv, env } = process

let url = argv[2] || env[ENVVAR]
if (!url) Help()

delete env[ENVVAR]

sidecar(url, argv[3] || '')

function Help() {
  console.log(`Usage: ${basename(argv[1])} [[https://github.com/]user/repo[/folder][#branch]] [folder]

Defaults:
- URL:    \${${ENVVAR}}
- folder: .

See: ${parse('ukoloff/sandbox.docker').safe}`)
  process.exit(1)
}
