import Docker from 'dockerode'

let docker = new Docker()
let i = await docker.info()

if (!i.Swarm.Nodes) {
  console.error('Swarm not found!')
  process.exit(1)
}

console.debug('Initial labeling')
await gather()
console.debug('Watching for changes...')
setInterval(gather, 27000)

async function gather() {
  let t = await buildTable()
  patchNodes(t)
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
    if (task.Status.State != 'running')
      continue
    (nodes[task.NodeID] ||= new Set).add(L)
  }
  return {
    label,
    labels: new Set(Object.values(services)),
    nodes,
  }
}

function buildEmptyTable() {
  return {
    label: getLabel(),
    labels: new Set,
    nodes: {},
  }
}

function getLabel() {
  return process.env.SWARM_LABEL || 'ukoloff.swarm.label'
}

async function patchNodes(table) {
  let prefix = table.label + '.'
  let sortedLabels = [...table.labels]
  sortedLabels.sort()
  for (const node of await docker.listNodes()) {
    const name = node.Description.Hostname
    const labels = node.Spec.Labels
    let remove = []
    for (const [k, v] of Object.entries(labels)) {
      if (!k.startsWith(prefix))
        continue
      if (!table.labels.has(k.substring(prefix.length))) {
        remove.push(k)
      }
    }
    for (const k of remove) {
      delete labels[k]
      console.debug(`${name}:${k} --`)
    }
    const Ls = table.nodes[node.ID] || new Set
    for (const L of sortedLabels) {
      const value = Ls.has(L) ? '1' : '0'
      const label = prefix + L
      if (labels[label] === value)
        continue
      labels[label] = value
      console.debug(`${name}:${label} = ${value}`)
    }
    const upd = {
      version: node.Version.Index,
      ...node.Spec,
    }
    const nx = docker.getNode(node.ID)
    await nx.update(upd)
  }

}
