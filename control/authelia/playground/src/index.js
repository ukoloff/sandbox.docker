import { createServer } from 'http'

createServer(handler)
  .listen(1488, logger)

function handler(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.write("Hello, world!")
  res.end()
}

function logger() {
  console.log(`Web server is running...`);
}
