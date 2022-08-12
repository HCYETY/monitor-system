// 引入koa
import Koa from 'koa'
import http from 'http'
import path from 'path'
import cors from 'koa-cors'

// 创建koa实例
const app = new Koa()
// 创建服务器
const server: http.Server = new http.Server(app.callback())
app.use(cors());
app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , Access-Control-Allow-Credentials');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set('Vary', 'Origin');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
})

// 中间件
app.use(async (ctx) => {
    console.log('addd')
    ctx.body = 'Hello World'
})
// 监听端口
app.listen(9000, () => {
    console.log('run success')
    console.log('app started at port 9000...')
})