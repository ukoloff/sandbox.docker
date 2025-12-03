import { resolve } from 'node:dns/promises'

export async function nodes(name = 'sthng') {
    let ns = await resolve(name)
    ns.sort()
    return ns
}