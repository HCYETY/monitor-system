import { Context } from 'koa';
import { getManager } from "typeorm";
import User from '../../entity/User';
import { ApiResponse } from "../../utils/response";
import { nowTime } from '../../utils/index';

export default async (ctx: Context) => {
  const { email, password, captcha, runtime_captcha } = ctx.request.body;
  const userRepository = getManager().getRepository(User);
  const saveUsers = await userRepository.findOne({where: { email }});
  const doneUser = await userRepository.findOne({where: { email, captcha: +captcha, password }});
  const data = { status: false };

  let msg: string = '';
  if (doneUser) {
    msg = '邮箱已存在，请注册新的邮箱';
  } else if (saveUsers && +captcha !== saveUsers.captcha) {
    msg = '验证码输入错误，请重新输入';
  } else if (saveUsers && +captcha === saveUsers.captcha) {
      const judgeTime = +saveUsers?.runtime_captcha + 5 * 60 * 1000;
    const nowtime = nowTime();
    if (nowtime < judgeTime) {
      saveUsers.password = password;
      await userRepository.save(saveUsers);

      data.status = true;
      msg = '注册成功';
    } else {
      msg = '验证码有效期已到，请重新获取';
    }
  }

    ctx.body = new ApiResponse({
      code: 200,
      msg,
      data
    });
}