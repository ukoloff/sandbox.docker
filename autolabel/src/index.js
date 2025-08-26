import Docker from 'dockerode'

let d = new Docker()
let i = await d.info()
console.log(i)

if (!i.Swarm.Nodes) {
  console.error('Swarm not found!')
  process.exit(1)
}

await gather(d)

async function gather(docker) {
  let n = await docker.listNodes()
  let s = docker.listServices()
  let t = docker.listTasks()
  console.log('Nodes: ', n.length)
}
