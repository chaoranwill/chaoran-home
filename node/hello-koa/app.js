const Koa = require('koa')//引入class 大写
//app对象表示web app本身
const app = new Koa()

//每收到一个http请求，koa通过app.use注册的async函数
//每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数
//middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序。
//如果一个middleware没有调用await next()，会怎么办？答案是后续的middleware将不再执行了

app.use(async (ctx, next) => {
    await next()
    if (ctx.request.path === '/') {
        ctx.response.type = 'text/html'
        ctx.response.body = '<h3>hello chaoran</h3>'
        console.log('index')
    }
    
})

app.use(async (ctx, next) => {
    await next()
    if (ctx.request.path === '/test') {
        ctx.response.type = 'text/html'
        ctx.response.body = '<h3>test</h3>'
        console.log('/test')
    }
})

app.use(async (ctx, next) => {
    const start = new Date().getTime()
    await next()
    const ms = new Date().getTime() - start
    console.log(`last: ${ms}ms`)
    
})

app.use(async (ctx, next) => {
    await next()
    ctx.response.body = '<h3>hello koa</h3>'
})

app.listen(3300)
console.log('server is running at port 3300')