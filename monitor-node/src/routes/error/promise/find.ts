import { Context } from 'koa';
import { queryApi } from '../../../utils/env';
import { ApiResponse } from "../../../utils/response";

export default async(ctx: Context) => {
    const query = `from(bucket: "promiseError")
    |> range(start: -122h)
    |> filter(fn: (r) => r._measurement == "ddd")
    |> filter(fn: (r) => r._field == "sss")`;

    return ctx.body = await new Promise((resolve, reject) => {
        let res: any = null;
        let arr: any[] = [];

        queryApi.queryRows(query, {
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
                if (arr.length === 0) {
                    res = new ApiResponse({
                        code: 0,
                        msg: '查无此数据',
                        data: {
                            status: false,
                        }
                    })
                }
                resolve(res);
            }
        })
    })
}

// const chalk = require('chalk');
// var asciichart = require ('asciichart');
// const maxLength = 100;
// const bots = [];
// const humans = [];
// var config = {
//     height:  18,         // any height you want
//     colors: [
//         asciichart.blue,
//         asciichart.red,
//         asciichart.default, // default color
//         undefined, // equivalent to default
//     ]
// }
//
// function pushRow(row) {
//     if (bots.length >= maxLength) {
//         bots.shift ();
//     }
//     if (humans.length >= maxLength) {
//         humans.shift ();
//     }
//
//     row.isBot == 'true' ? bots.push( row['_value']) : humans.push( row['_value']);
// }
//
// function render(){
//     if(bots.length != 0 && humans.length != 0) {
//         const plt = asciichart.plot ([bots,humans], config).split ('\n');
//         chart.setLine (0, chalk.blue('Bots: '+bots[bots.length-1]) + ' ' + chalk.red('Humans: '+humans[humans.length-1]));
//         plt.forEach ((line, i) => {
//             chart.setLine (i + 1, line);
//         });
//     }
//     screen.render();
// }
//
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }