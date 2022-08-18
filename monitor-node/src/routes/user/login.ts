import { Context } from 'koa';
import { getManager } from "typeorm";
import { generateMixed } from '../../utils';
import User from '../../entity/User';
import { ApiResponse } from "../../utils/response";

export default async (ctx: Context) => {
  const { email, password, cookie } = ctx.request.body;
  const userRepository = getManager().getRepository(User);
  const saveUsers = await userRepository.findOne({ where: { email: email }});
  let code: number = 0;
  let msg: string = '';
  let data = { isLogin: false };

  if ((!saveUsers || !saveUsers.password) && !cookie) {
      code = 0;
      msg = '你还未注册，请先注册';
  } else if (saveUsers && !cookie) {
    if (password === saveUsers.password) {
      // 设置20位数的 session 随机数，同时和查找到的用户信息一并存进数据库中
      const session = generateMixed(20)
      saveUsers.session = session;
      await userRepository.save(saveUsers)
      // 设置cookie
      ctx.cookies.set(
        'session', session, { httpOnly: false, maxAge: 1296000000 }
      )

      data.isLogin = true;
      code = 200;
      msg = '登录成功';
    } else {
        code = 0;
        msg = '邮箱账号或密码输入错误';
    }
  } else if (!saveUsers && cookie) {
    const findCookieUser = await userRepository.findOne({ where: { session: cookie }});
    if (findCookieUser) {
      data.isLogin = true;
      code = 200;
      msg = '你已处于登录状态';
    }
  }
  ctx.body = new ApiResponse({
      code, msg, data
  })
}