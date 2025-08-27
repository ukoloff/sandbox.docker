import Docker from 'dockerode'

let docker = new Docker()
let i = await docker.info()

if (!i.Swarm.Nodes) {
  console.error('Swarm not found!')
  process.exit(1)
}

await gather()

async function gather() {
  let t = await buildTable()
  console.log(t)
  // let n = await docker.listNodes()
  // let s = docker.listServices()
  // let t = docker.listTasks()
  // console.log('Nodes: ', n.length)
  // let n0 = docker.getNode(n[0].ID)
  // let i = await n0.inspect()
  // let upd = {
  //   version: i.Version.Index,
  //   ...i.Spec,
  //   Labels: { a: "AAA", b: "BBB" },
  // }
  // let z = await n0.update(upd)
}

async function buildTable() {
  const label = getLabel()
  let services = {}
  for (const svc of await docker.listServices()) {
    let L = svc.Spec.Labels[label]
    if (L)
      services[svc.ID] = L
  }
  let nodes = {}
  for (const task of await docker.listTasks()) {
    let L = services[task.ServiceID]
    if (!L || !task.NodeID)
      continue
    (nodes[task.NodeID] ||= new Set()).add(L)
  }
  return {
    label,
    labels: new Set(Object.values(services)),
    nodes,
  }
}

function getLabel() {
  return process.env.SWARM_LABEL || 'ukoloff.swarm.label'
}
