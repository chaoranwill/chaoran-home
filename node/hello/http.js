var http = require('http')

var server = http.createServer(function (request, response) {
    //获取http请求的参数
    console.log(request.method+':'+request.url)
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end('<h3>hello chaoran</h3>')
})

server.listen(8080)
console.log('server is running at http://localhost:8080/')