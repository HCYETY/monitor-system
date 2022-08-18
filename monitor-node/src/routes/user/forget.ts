import { Context } from 'koa';
import { getManager } from "typeorm";
import User from '../../entity/User';
import { ApiResponse } from "../../utils/response";

export default async (ctx: Context) => {
  try{
    const { email, captcha, cypher } = ctx.request.body;
    const userRepository = getManager().getRepository(User);
    const saveUser = await userRepository.findOne({where: { email, captcha }});
    if (!saveUser) {
      ctx.body = new ApiResponse({
          code: 200,
          msg: '请输入正确的验证码',
          data: {
            status: false
            }
        });
    } else {
      saveUser.password = cypher;
      await userRepository.save(saveUser);
      ctx.body = new ApiResponse({
          code: 200,
          msg: '密码修改成功',
          data: {
            status: true
        }
    });
    }
  } catch{(err: any) => ctx.body = {err}}
}