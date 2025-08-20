const http = require('http')
const os = require('os')

console.log("Kubia server starting...")
var www = http.createServer(handler)
www.listen(8080)

function handler(request, response) {
  console.log("Received request from " + request.connection.remoteAddress)
  response.writeHead(200)
  response.end("You've hit " + os.hostname() + "\n")
}
