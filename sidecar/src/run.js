import { spawn } from 'node:child_process'
export { spawn } from 'node:child_process'

export function wait(child) {
    return new Promise(function (resolve, reject) {
        child
            .on('error', reject)
            .on('exit', resolve)
    })
}

export async function run(...params) {
    let res = await wait(spawn(...params))
    if (res)
        throw Error(`Exited with code #${res}`)
}
