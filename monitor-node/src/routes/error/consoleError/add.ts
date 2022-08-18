import { Context } from 'koa';
import { Point } from '@influxdata/influxdb-client';
import { clientDB, INFLUX_ORG } from '../../../utils/env';
import { ApiResponse } from "../../../utils/response";

export default async(ctx: Context) => {
    const bucket = 'consoleError';

    try {
        const { cookie, url, row, column, message, stack, } = ctx.request.body.data;
        const writeApi = clientDB.getWriteApi(INFLUX_ORG, bucket);
        writeApi.useDefaultTags({host: 'host1'});

        // 将前端传来的数据存进时序数据库
        const point = new Point(cookie)
            .tag('sensor_id', 'TLM010')
            .stringField('url', url)
            .intField('row', row)
            .intField('column', column)
            .stringField('message', message)
            .stringField('stack', stack)
            .booleanField('is_solve', false);
        writeApi.writePoint(point);
        await writeApi.close();

        ctx.body = new ApiResponse({
            code: 200,
            msg: '数据写入成功',
            data: {
                status: true,
            }
        })
    } catch (err) {
        ctx.body = new ApiResponse({
            code: 500,
            msg: '数据写入失败',
            data: {
                status: false,
            }
        })
    }
}