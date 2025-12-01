#!/usr/bin/env node
import { randomUUID } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

await writeFile(join(import.meta.dirname, '..', '.env'), `# Generated file
STGUIAPIKEY=${randomUUID()}
STGUIADDRESS=0.0.0.0:8384
`)
