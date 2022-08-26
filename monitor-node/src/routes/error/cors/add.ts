import { Context } from 'koa';
import add from '../../../utils/middleware/add';

export default async(ctx: Context) => {
    const bucket = 'corsError';
    console.log('@跨域')

    ctx.body = add({ bucket, request: ctx.req });
}