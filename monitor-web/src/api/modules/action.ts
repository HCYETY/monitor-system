import { post } from '@/api/index';

export function findHistory(data?: any) {
  return post('/api/history', data);
}
export function findHash(data?: any) {
  return post('/api/hash', data);
}
