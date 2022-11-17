import { Context } from 'koa';
import find from "../../../utils/middleware/find";

export default async(ctx: Context) => {
    const bucket = 'pv';
    return ctx.body = find({ bucket, queryTime: (ctx.query.time) as string });
}
