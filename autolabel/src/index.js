import Docker from 'dockerode'

let mutex = 0, exiting = 0

let docker = new Docker()
let i = await docker.info()

if (!i.Swarm.Nodes) {
  console.error('Swarm not found!')
  process.exit(1)
}

for (let sig of 'HUP INT TERM'.split(' ')) {
  let signal = `SIG${sig}`
  process.on(signal, async $ => {
    console.debug(`Got ${signal}, exiting...`)
    exiting = 1
    clearInterval(timer)
    events.off('data', gather)
    if (process.env.CLEAN_ON_EXIT) {
      await patchNodes(buildEmptyTable())
    }
    process.exit(1)
  })
}

console.debug('Initial labeling')
await gather()
console.debug('Watching for changes...')
let timer = setInterval(gather, 27000)
let events = await docker.getEvents({ filters: JSON.stringify({ type: ['service'] }) })
events.on('data', gather)

async function gather() {
  if (exiting)
    return
  if (mutex) {
    mutex++
    return
  }
  mutex = 1
  try {
    let t = await buildTable()
    patchNodes(t)
  } finally {
    if (mutex > 1) {
      setTimeout(gather, 777)
    }
    mutex = 0
  }
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
  let changedNodes = 0
  for (const nn of await docker.listNodes()) {
    const node = await docker.getNode(nn.ID).inspect()
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
    let changes = remove.length
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
      changes++
      console.debug(`${name}:${label} = ${value}`)
    }
    if (!changes)
      continue
    changedNodes++
    const upd = {
      version: node.Version.Index,
      ...node.Spec,
    }
    try {
      await docker.getNode(node.ID).update(upd)
    } catch (e) {
      console.error('Error:', e.message)
    }
  }
  if (changedNodes) {
    setTimeout(gather, 2025)
  }
}
