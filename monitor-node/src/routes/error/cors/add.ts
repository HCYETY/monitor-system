import { Context } from 'koa';
import middleware from '../../../utils/middleware';

export default async(ctx: Context) => {
    const bucket = 'corsError';
    console.log('@跨域')

    ctx.body = middleware({ bucket, request: ctx.req });
}