import { nodes } from "./dns.js"

const who = 'World'

console.log(`Hello, ${who}`)

let ns = await nodes()
console.log('Nodes:', ns)