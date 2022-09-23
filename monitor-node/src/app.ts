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
import { createConnections } from "typeorm";
import { koaSwagger } from "koa2-swagger-ui";
import swaggerRouter from './config/swagger';

import sendCaptcha from './routes/user/sendCaptcha';
import login from './routes/user/login';
import register from './routes/user/register';
import forget from './routes/user/forget';
import logout from './routes/user/logout';

// Error 异常
import addJs from './routes/error/js/add';
import findJs from './routes/error/js/find';
// promise 异常
import addPromise from './routes/error/promise/add';
import findPromise from './routes/error/promise/find';
// resource 异常
import addResource from './routes/error/resource/add';
import findResource from './routes/error/resource/find';
// cors 异常
import addCors from './routes/error/cors/add';
import findCors from './routes/error/cors/find';
// console.error 异常
import addConsoleError from './routes/error/consoleError/add';
import findConsoleError from './routes/error/consoleError/find';
// interface 异常
import addInterfaceError from './routes/error/interface/add';
// blankScreen 异常
import addBlankScreen from './routes/error/blankScreen/add';
// history 路由
import addHistory from './routes/behaviour/history/add';
// hash 路由
import addHash from './routes/behaviour/hash/add';
// pv
import addPv from './routes/performance/pv/add';

createConnections ()
    .then(async () => {
        const app = new Koa();
        const router = new Router();

        // 处理cookie跨域
        const corsOptions ={
            origin: 'http://localhost:5014',
            credentials: true,
            optionSuccessStatus: 200
        }
        app.use(cors(corsOptions));

        // 处理 Navigator.sendBeacon 传参
        app.use(async function(ctx,next) {
            //判断请求的路由路径
            if (/^.*\/beacon\/.+$/.test(ctx.path)) {
                ctx.disableBodyParser = true;
            }
            await next();
        })
        // 处理 post 请求的参数
        app.use(bodyParser());

        app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods())
        const swaggerOption = {
            routePrefix: '/swagger', // host at /swagger instead of default /docs
            swaggerOptions: {
                url: '/swagger/swagger.json' // example path to json 其实就是之后swagger-jsdoc生成的文档地址
            }
        }
        app.use(koaSwagger(swaggerOption))

        router.post('/api/send-captcha', sendCaptcha);
        router.post('/api/login', login);
        router.post('/api/register', register);
        // router.post('/api/forget_password', forget);
        // router.post('/api/logout', logout);

        // Error 异常
        router.post('/report/js', addJs);
        router.get('/api/js', findJs);

        // promise 异常
        router.post('/report/promise', addPromise);
        router.get('/api/promise', findPromise);

        // resource 异常
        router.post('/report/resource', addResource);
        router.get('/api/resource', findResource);

        // cors 异常
        router.post('/report/cors', addCors);
        router.get('/api/cors', findCors);

        // console.error 异常
        router.post('/report/console-error', addConsoleError);
        router.get('/api/console-error', findConsoleError);

        // interface 异常
        router.post('/report/interface', addInterfaceError);

        // 白屏异常
        router.post('/report/blankScreen', addBlankScreen);

        // hash 路由
        router.post('/report/hash', addHash);

        // history 路由
        router.post('/report/history', addHistory);

        // pv
        router.post('/report/pv', addPv);

        // 组装匹配好的路由，返回一个合并好的中间件
        app.use(router.routes());

        app.listen(8080, () => {
            console.log('网站服务器启动成功，请访问 http://localhost:8080');
            console.log('swagger api 文档可访问：http://localhost:8080/swagger');
        })
    })
    .catch((error: any) => console.log('TypeOrm连接失败', error))
