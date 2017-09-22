var
fs = require('fs'),
url = require('url'),
path = require('path'),
http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);

//创建服务器
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname
    console.log('pathname', +pathname)
    var filepath = path.join(root, pathname)
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            //没有出错且存在文件
            console.log('200', + request.url)
            //发送成功响应
            response.writeHead(200)
            //读写文件
            fs.createReadStream(filepath).pipe(response)
        }else {
            console.log('404' + request.url)
            //发送404响应
            response.writeHead('404')
            response.end('404 not found')
        }
    })
})

server.listen(8080)
console.log('server is running at http://localhost:8080/')