import { ApiResponseProps } from '../types';

const defaultRes = {
  code: 0,
  msg:  '',
  data: {},
}

// 接口统一的响应格式
export class ApiResponse {
  res: ApiResponseProps =  {}

  constructor(params: ApiResponseProps) {
    this.res = Object.assign({}, defaultRes, params);
  }

  // koa 在 ctx.body 上会自动调用 toJSON 方法
  toJSON() {
    return this.res;
  }
}
