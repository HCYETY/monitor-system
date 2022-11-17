import { Point } from '@influxdata/influxdb-client';
import { clientDB, INFLUX_ORG } from '../env';
import { ApiResponse } from "../response";
import coBody from 'co-body';

export default async function add (paramObj: { bucket: string, request: object }) {
    const { bucket, request } = paramObj;

    try {
        const params = await coBody.json(request);
        const { cookie, data, inquiry } = params;
        const keyArr = Object.keys(data);
        const writeApi = clientDB.getWriteApi(INFLUX_ORG, bucket);
        // writeApi.useDefaultTags({host: 'host1'});
        // 将前端传来的数据存进时序数据库
        const point = new Point(cookie);
        // const point = new Point(cookie).tag('sensor_id', 'TLM010');
        keyArr.forEach((key: string) => {
            let type = typeof data[key];
            if (type === 'number') {
                type = (Number.isInteger(data[key]) === true) ? 'number' : 'bigint';
            }
            console.log('type2', type, data[key])
            switch (type) {
                case 'string':
                    point.stringField(key, data[key]);
                    break;
                case 'number':
                    point.intField(key, data[key]);
                    break;
                case 'bigint':
                    point.floatField(key, data[key]);
                    break;
                case 'boolean':
                    point.booleanField(key, data[key]);
                    break;
                case 'object':
                    const str = JSON.stringify(data[key]);
                    point.stringField(key, str);
                    break;
            }
        })
        writeApi.writePoint(point);
        await writeApi.close();

        return new ApiResponse({
            code: 200,
            msg: '数据写入成功',
            data: {
                status: true,
            }
        })
    } catch (err) {
        return new ApiResponse({
            code: 500,
            msg: '数据写入失败',
            data: {
                status: false,
            }
        })
    }
}
