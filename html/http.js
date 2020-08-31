var http = require('http')
var fs = require('fs')
var url = require('url');

var server = http.createServer()

server.on('request', function (request, response) {
  console.log('got request, path: ' + request.url)
  
  fs.readFile("."+request.url, 'utf-8', function (err, data) {
    var pathname = url.parse(request.url).pathname
    var ext = pathname.match(/(\.[^.]+|)$/)[0]
    if (err) {
      response.setHeader('Content-Type', 'text/plain; charset=utf-8')
      response.end('File error')
    }
    else {
      switch(ext) {
        case ".html":
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          break
        case ".css":
          response.setHeader('Content-Type', 'text/css; charset=utf-8')
          break
        case ".jpg":
          response.setHeader('Content-Type', 'image/jpeg')
          break
        default:
          response.setHeader('Content-Type', 'image/jpeg')
      }
      response.end(data)
    }
  })
})

server.listen(3000, function () {
  console.log('Server started, use http://127.0.0.1:3000/ to visit.')
})