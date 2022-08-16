import { post } from "../index";

// 登录接口, 示例：
export function login(data: { url?: string; method?: string; data?: string }) {
  return post("/login", data);
}
