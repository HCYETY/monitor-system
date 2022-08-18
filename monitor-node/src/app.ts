// // 引入koa
// import Koa from 'koa';
// import http from 'http';
// import path from 'path';
// import cors from 'koa-cors';
// import influx from 'influx';
//
// // 创建koa实例
// const app = new Koa()
// // 创建服务器
// const server: http.Server = new http.Server(app.callback())
// app.use(cors());
// app.use(async (ctx, next)=> {
//     ctx.set('Access-Control-Allow-Origin', '*');
//     ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , Access-Control-Allow-Credentials');
//     ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
//     ctx.set('Access-Control-Allow-Credentials', 'true');
//     ctx.set('Vary', 'Origin');
//     if (ctx.method == 'OPTIONS') {
//         ctx.body = 200;
//     } else {
//         await next();
//     }
// })
//
// // 中间件
// app.use(async (ctx) => {
//     console.log('addd')
//     ctx.body = 'Hello World'
// })
// // 监听端口
// app.listen(9000, () => {
//     console.log('run success')
//     console.log('app started at port 9000...')
// })

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';

// promise 异常
import addPromise from './routes/error/promise/add';
import findPromise from './routes/error/promise/find';
// console.error 异常
import addConsoleError from './routes/error/consoleError/add';
import findConsoleError from './routes/error/consoleError/find';

const app = new Koa();
const router = new Router();

// 处理cookie跨域
const corsOptions ={
    origin: 'http://localhost:5014',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
// 处理 post 请求的参数
app.use(bodyParser());

// promise 相关
router.post('/api/promise_report', addPromise);
router.post('/api/promise_find', findPromise);

// console.error 相关
router.post('/api/console_error_report', addConsoleError);
router.post('/api/console_error_find', findConsoleError);

// 组装匹配好的路由，返回一个合并好的中间件
app.use(router.routes());

app.listen(8080, () => {
    console.log('网站服务器启动成功，请访问 http://120.79.193.126:8080');
})
