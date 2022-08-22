import { Context } from 'koa';
import sendEmail from '../../../sendEmail.js';
import { createSixNum } from '../../utils/index';
import { getManager } from "typeorm";
import User from '../../entity/User';
import { ApiResponse } from "../../utils/response";

export default async (ctx:Context) => {
    try{
        const { email, password } = ctx.request.body;
        console.log(email)
        const userRepository = getManager().getRepository(User);
        const saveUsers = await userRepository.findOne({where: { email, password }});
        // const nowtime = nowTime();
        if (saveUsers) {
            ctx.body = new ApiResponse({
                code: 200,
                msg: '该邮箱已注册，可直接登录',
                data: { status: false }
            });
        } else {
            const code = createSixNum();
            const saveUser = await userRepository.findOne({ where: { email }});
            const nowtime = new Date().getTime();
            const mail = {
                from: '1164939253@qq.com',
                to: email,
                subject: '您注册账号的验证码为',
                text:'您的验证码为' + code + ',有效期为五分钟!'
            };
            sendEmail(mail);
            if (saveUser) {
                saveUser.captcha = code;
                saveUser.runtime_captcha = nowtime;
                await userRepository.save(saveUser);
            } else {
                const newUser = new User();
                newUser.email = email;
                newUser.captcha = code;
                newUser.runtime_captcha = nowtime;
                await userRepository.save(newUser);
            }

            ctx.body = new ApiResponse({
                code: 200,
                msg: '邮箱验证码已发送，请注意在有效期内输入',
                data: {status: true, captchaTime: nowtime}
            });
        }
    } catch{(err: any) => ctx.body = {err}}
}