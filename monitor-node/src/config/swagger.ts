const Router = require('koa-router');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerRouter = new Router({
    prefix: '/swagger' // 路由前缀
})
const swaggerDefinition = {
    info: {
        title: 'monitor-system-node API 接口文档',
        version: '1.0.0',
        description: '详细的接口文档'
    }
}
const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../routes/doc/*.ts')] // 写有注解的router的存放地址, 最好     path.join()
}
const swaggerSpec = swaggerJSDoc(options);
// 通过路由获取生成的注解文件
swaggerRouter.get('/swagger.json', async function (ctx: { set: (arg0: string, arg1: string) => void; body: any; }) {
    ctx.set('Content-Type', 'application/json')
    ctx.body = swaggerSpec
})

export default swaggerRouter;