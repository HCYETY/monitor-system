// export function createColor() {
//   return '#' + (function(color) {
//     return (color += '0123456789abcdef'[Math.floor(Math.random()*16)]) && (color.length === 6) ? color : arguments.callee(color);
//   })('');
// }

export function createColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = Math.random(); // 如果是 rgb ，则固定该值即可
  const color = `rgba(${r}, ${g}, ${b}, ${a})`;
  return color;
}
