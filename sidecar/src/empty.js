//
// Check if folder is empty
//
import { opendir } from 'node:fs/promises'

export default async function empty(folder) {
  let dir = await opendir(folder)
  try {
    return !!await dir.read()
  } finally {
    dir.close()
  }
}
