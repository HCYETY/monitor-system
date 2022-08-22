import { post, get } from '../index';

// 登录接口, 示例：
export function login(data: { url?: string; method?: string; data?: string }) {
  return post('/login', data);
}
// 获取 console.error 异常数据
export function consoleErrorGet() {
    return get('/console-error');
}