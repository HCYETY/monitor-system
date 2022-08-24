import { Context } from 'koa';
import middleware from '../../../utils/middleware';

export default async(ctx: Context) => {
    const bucket = 'historyPage';

    ctx.body = middleware({ bucket, request: ctx.req });
}