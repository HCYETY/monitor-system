import { Context } from 'koa';
import { Point } from '@influxdata/influxdb-client';
import { clientDB, INFLUX_ORG } from '../../../utils/env';
import { ApiResponse } from "../../../utils/response";
import coBody from 'co-body';

export default async(ctx: Context) => {
    const bucket = 'promiseError';

    try {
        const params = await coBody.json(ctx.req);
        const { cookie, data } = JSON.parse(params);
        const { message, type, errorType, fileName, position, selector, isSolve } = data;
        const writeApi = clientDB.getWriteApi(INFLUX_ORG, bucket);
        writeApi.useDefaultTags({host: 'host1'});

        // 将前端传来的数据存进时序数据库
        const point = new Point(cookie)
            .tag('sensor_id', 'TLM010')
            .stringField('message', message)
            .stringField('type', type)
            .stringField('error_type', errorType)
            .stringField('file_name', fileName)
            .stringField('position', position)
            .stringField('selector', selector)
            .booleanField('is_solve', isSolve);
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