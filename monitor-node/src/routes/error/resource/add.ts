import { Context } from 'koa';
import add from '../../../utils/middleware/add';

export default async(ctx: Context) => {
    const bucket = 'resourceError';

    ctx.body = add({ bucket, request: ctx.req });
}