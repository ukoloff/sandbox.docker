import Docker from 'dockerode'

let d = new Docker()
let i = await d.info()
console.log(i)
