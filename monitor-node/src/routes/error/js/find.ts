import { Context } from 'koa';
import find from "../../../utils/middleware/find";

export default async(ctx: Context) => {
    const bucket = 'jsError';
  console.log(bucket)
    return ctx.body = await find({ bucket, queryTime: (ctx.query.time) as string });
}
