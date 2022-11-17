import { queryApi } from '../../utils/env';
import { ApiResponse } from "../../utils/response";
import {ParsedUrlQuery} from "querystring";

export default async function find(params: { bucket: string, queryTime?: string, query?: string }) {
    return await new Promise((resolve, reject) => {
        let res: any = null;
        let arr: any[] = [];
        const { bucket, queryTime, query } = params;
        let time: string = queryTime ? queryTime : '-30d';
        const fluxQuery = query ? query : `from(bucket: "${bucket}")
          |> range(start: ${time})
        `;
          // |> filter(fn: (r) => r._measurement == "${cookie}")
          // |> filter(fn: (r) => r._field == "sss")

        queryApi.queryRows(fluxQuery, {
            next(row: any, tableMeta: { toObject: (arg0: any) => any }) {
                const o = tableMeta.toObject(row)
                arr.push(o);
                if (arr.length > 0) {
                    res = new ApiResponse({
                        code: 200,
                        msg: '数据查询成功',
                        data: {
                            status: true,
                            response: arr
                        }
                    })
                  console.log(`${bucket}查询成功`)
                  resolve(res);
                }
            },
            error() {
                res = new ApiResponse({
                    code: 500,
                    msg: '数据查询失败',
                    data: {
                        status: false,
                    }
                })
                reject(res);
            },
            complete() {
              if (arr.length <= 0) {
                res = new ApiResponse({
                  code: 0,
                  msg: '查无此数据',
                  data: {
                    status: false,
                  }
                })
                reject(res);
              }
            }
        })
    })
}
