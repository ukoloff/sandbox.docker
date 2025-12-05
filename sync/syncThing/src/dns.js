import { resolve } from 'node:dns/promises'

export async function nodes(name = 'st-node') {
    let ns = await R(name)
    let tns = await R(`tasks.${name}`)
    ns.sort()
    return ns
}

async function R(name) {
  try {
    return await resolve(name)
  } catch {
    return []
  }
}
