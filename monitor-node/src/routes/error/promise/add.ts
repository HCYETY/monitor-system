import { Context } from 'koa';
import { Point } from '@influxdata/influxdb-client';
import { clientDB, INFLUX_ORG } from '../../../utils/env';
import { ApiResponse } from "../../../utils/response";

export default async(ctx: Context) => {
    const bucket = 'promiseError';

    try {
        const { cookie, message, type, errorType, fileName, position, selector, isSolve } = ctx.request.body.data;
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