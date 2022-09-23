import { post } from '@/api/index';

// 查找候选人信息接口
export function findPv(data?: any) {
  return post('/api/pv', data);
}
