import { Context } from 'koa';
import find from "../../../utils/middleware/find";

export default async(ctx: Context) => {
  const bucket = 'promiseError';
  return ctx.body = await find({ bucket, queryTime: (ctx.query.time) as string });
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
