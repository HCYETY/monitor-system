import { post } from '@/api/index';

// 查找候选人信息接口
export function findJs(data?: any) {
  return post('/api/js', data);
}
export function findPromise(data?: any) {
  return post('/api/promise', data);
}
export function findResource(data?: any) {
  return post('/api/resource', data);
}
export function findCors(data?: any) {
  return post('/api/cors', data);
}
export function findConsoleError(data?: any) {
  return post('/api/console-error', data);
}
export function findInterface(data?: any) {
  return post('/api/interface', data);
}
export function findBlankScreen(data?: any) {
  return post('/api/blankScreen', data);
}
