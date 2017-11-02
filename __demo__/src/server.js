const http = require('http')

const server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify({
    id: 1,
    name: 'bulbasaur',
    base_experience: 64,
    height: 7,
    is_default: true,
    order: 1,
    weight: 69
  }))
})

const port = process.env.NODE_PORT || 3000
server.listen(port, () => console.log(`===Server is listening on ${server.address().address}:${server.address().port}===`))
