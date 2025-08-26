import Docker from 'dockerode'

console.log('Hello, world!')

process.env.DOCKER_HOST = 'ssh://root@swarm01.ekb.ru'
let d = new Docker()
let i = await d.info()
console.log(i)
