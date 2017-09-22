var hello = require('./hello')

var name = "chaoran"

//hello(name)

var fs = require('fs')

var data = 'hello chaoran'

//写入文件
/* fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('ok')
    }
}) */

//异步读取
fs.readFile('output.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log('异步读取：', data)
    }
})

//同步读取
var output = fs.readFileSync('output.txt', 'utf-8')
console.log('同步读取：', output)
fs.stat('output.txt', function (err, stat) {
    if (err) {
        console.log(err)
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile())
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory())
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size)
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime)
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime)
        }
    }
})

//流读取
var rs = fs.createReadStream('output.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('Stream DATA:', chunk)
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});

//流写入
var ws = fs.createWriteStream('output1.txt', 'utf-8')
ws.write('使用流写入文本数据：超然，你好 \n')
ws.write('end')
ws.end()

var ws = fs.createWriteStream('output2.txt', 'utf-8')
ws.write(new Buffer('使用流写入二进制数据：超然，你好   \n', 'utf-8'))
ws.write('end')
ws.end()

