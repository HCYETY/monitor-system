import { Context } from 'koa';
import find from "../../../utils/middleware/find";

export default async(ctx: Context) => {
    const bucket = 'historyPage';
    const query = `from(bucket: "${bucket}")
    |> range(start: -122h)`;

    return ctx.body = find(query);
}