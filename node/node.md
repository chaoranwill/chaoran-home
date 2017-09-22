## 1. CommonJS规范
#### 1.1. 使用规则
* 要在模块中对外输出变量，用：

    ```js
    module.exports = variable;
    ```
    **输出的变量可以是任意对象、函数、数组等等。**
#### 1.2. CommonJS的模块实现原理
**js闭包：**
JavaScript代码用一个函数包装起来，这段代码的所有“全局”变量就变成了函数内部的局部变量。
如：
```js
var s = 'Hello';
var name = 'world';

console.log(s + ' ' + name + '!');

//node执行后转换结果
(function () {
    // 读取的hello.js代码:
    var s = 'Hello';
    var name = 'world';

    console.log(s + ' ' + name + '!');
    // hello.js代码结束
})();
```
**module.exports && exports**
* 如果要输出一个键值对象{}，可以利用exports这个已存在的空对象{}，并继续在上面添加新的键值；
* 如果要输出一个函数或数组，必须直接对module.exports对象赋值。
**万无一失：使用module.exports = xxx的方式来输出模块变量**

## 2. 基本模块
#### 2.1. global
* js 全局对象：Windows
* node 全局对象： global

#### 2.2. process
* nextTick()
    下次事件响应时执行`process.nextTick()`:
    ```js
    // process.nextTick()将在下一轮事件循环中调用:
    process.nextTick(function () {
        console.log('nextTick callback!');
    });
    console.log('nextTick was set!');

    //结果：
    //nextTick was set!
    //nextTick callback!
    ```
* exit
**Node.js进程本身的事件就由process对象来处理。如果我们响应exit事件，就可以在程序即将退出时执行某个回调函数：**
    ```js
    // 程序即将退出时的回调函数:
    process.on('exit', function (code) {
        console.log('about to exit with code: ' + code);
    });
    ```
#### 2.3. 判断JavaScript执行环境
    ```js
    if (typeof(window) === 'undefined') {
        console.log('node.js');
    } else {
        console.log('browser');
    }
    ```

## 3. fs
    Node.js内置的fs模块就是文件系统模块，负责读写文件。
#### 3.1. 异步读文件
##### 3.1.1. 文本文件
```js
var fs = require('fs');

fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {          //正常：null data（string）      错误：err（对象） data（undefined）
        console.log(err);
    } else {
        console.log(data);
    }
});
```
##### 3.1.2. 二进制文件
```js
//读取图片
var fs = require('fs');

fs.readFile('sample.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);   //不传入编码是返回Buffer对象(可与string相互转换)
        console.log(data.length + ' bytes');
    }
});
```
#### 3.2. 同步读取
**区别：**
* 多了sync后缀
* 不接收回调函数
* 函数直接返回结果
##### 3.2.1. 文本文件
```js
var fs = require('fs');

var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);
```
错误捕捉：
```js
try {
    var data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data);
} catch (err) {
    // 出错了
}
```
#### 3.3. 写文件
异步方法：fs.writeFile()
同步方法：fs.writeFileSync()
```js
var fs = require('fs');

var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) { //只关心成功与否,只有err
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});

//同步
var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);
```
#### 3.4. 文件信息
**stat**
`fs.stat` 返回一个`stat`对象
## 4. stream
    仅在服务端可用，流：标准输入流（stdin）、标准输出流（stdout）
特点：**数据是有序的，而且必须依次读取，或者依次写入，不能像Array那样随机定位**
性质：对象
操作：响应流的事件：
* data： 数据可读
* end： 流已到末尾
* error：出错
#### 4.1. 流读取
```js
//example
 var fs = require('fs');

// 打开一个流:
var rs = fs.createReadStream('sample.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);    
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});
```
**data事件可能会有多次，每次传递的chunk是流的一部分数据**
#### 4.2. 流写入
    不断调用write()方法，最后以end()结束
```js
var fs = require('fs');

var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('output2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();
```
**所有可以读取数据的流都继承自stream.Readable，所有可以写入的流都继承自stream.Writable**
#### 4.3. pipe
    用pipe()把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了（实际上是复制文件的程序）
```js
var fs = require('fs');

var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);
//不希望自动关闭Writable流，需要传入参数：
readable.pipe(writable, { end: false });
```
#### 4.4. 文件操作对比
* readFile和writeFile
将要读取的文件内容完整读入缓存区，再从该缓存区中读取文件内容
* read和write
不断地将文件中的一小块内容读/写入缓存区，最后从该缓存区中读/写文件内容
* createReadStream和createWriteStream
**在需要处理大文件的情况时，将文件作为一块一块小的数据流进行处理，而不是一整块大型数据**
可以对读写文件的过程中进行监听，并定义相关的方法pause和resume暂停或恢复文件的读取操作，可以监听写入时缓存区数据是否已满或者是否已全部输出
pipe方法可连接两个数据流，犹如导管一样将数据读入写入

## 5. http
* request对象封装了HTTP请求，调用request对象的属性和方法就可以拿到所有HTTP请求的信息；
* response对象封装了HTTP响应，操作response对象的方法，就可以把HTTP响应返回给浏览器。
#### 5.1. 实践
##### 5.1.1. 简易服务器
```js
// 导入http模块:
var http = require('http');

// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
```
##### 5.1.2. 文件服务器
1. url模块——解析路径
2. path模块——构造目录

## 6. koa
    Express的下一代基于Node.js的web框架
    