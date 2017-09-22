const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()
const app = new Koa()

//log request url
app.use(async (ctx, next) => {
    console.log(`process ${ctx.request.method} ${ctx.request.url}`)
    await next()
})

//add url-router
//使用router.get('/path', async fn)来注册一个GET请求
//变量可以通过ctx.params.name访问
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name
    ctx.response.body = `<h3>hello ${name}</h3>`
})

//post 请求
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>index</h1>
        <form action="/signin" method="post">
            <p>name: <input name="name" value="koa"></p>
            <p>password: <input name="pwd" type="password"></p>
            <p><input type="submit" value="submit"></p>
        </form>`
})


router.post('/signin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.pwd || '';
    console.log(`you sign in with name ${name}, password ${password}`)
    if (name === 'koa' &&　password === '333') {
        ctx.response.body = `<h1>hello ${name}</h1>`
    } else {
        ctx.response.body = `<h1>login failed</h1>`
    }
})
//bodyparser 必须在router之前被注册到app对象上
app.use(bodyParser())

// add router middleware:
app.use(router.routes())


app.listen(3000)
console.log('app is running at port 3000')