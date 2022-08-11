import { post } from '../index';

// 登录接口, 示例：
export function login(data: { email?: string; cypher?: string; cookie?: string }) {
  return post('/login', data);
}
