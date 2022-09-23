// 定义模型 可以公用 schema $ref
/**
 * @swagger
 * definitions:
 *   Login:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       path:
 *         type: string
 *   ReportSuccess:
 *     type: object
 *     required:
 *       - code
 *       - msg
 *       - data
 *     properties:
 *        code:
 *            type: integer
 *            format: int64
 *            example: 200
 *        msg:
 *           type: string
 *           example: 数据写入成功
 *        data:
 *           type: object
 *           properties:
 *               status:
 *                    type: boolean
 *                    example: true
 *               response:
 *                    type: object
 *   ReportFail:
 *     type: object
 *     required:
 *       - code
 *       - msg
 *       - data
 *     properties:
 *        code:
 *            type: integer
 *            format: int64
 *            example: 500
 *        msg:
 *           type: string
 *           example: 数据写入失败
 *        data:
 *           type: object
 *           properties:
 *               status:
 *                    type: boolean
 *                    example: false
 *   FindSuccess:
 *     type: object
 *     required:
 *       - code
 *       - msg
 *       - data
 *     properties:
 *        code:
 *            type: integer
 *            format: int64
 *            example: 200
 *        msg:
 *           type: string
 *           example: 数据查询成功
 *        data:
 *           type: object
 *           properties:
 *               status:
 *                    type: boolean
 *                    example: true
 *               response:
 *                    type: object
 *   FindFail:
 *      type: object
 *      required:
 *        - code
 *        - msg
 *        - data
 *      properties:
 *         code:
 *             type: integer
 *             format: int64
 *             example: 500
 *         msg:
 *            type: string
 *            example: 数据查询失败
 *         data:
 *            type: object
 *            properties:
 *                status:
 *                     type: boolean
 *                     example: false
 */

// promiseError 接口
/**
 * @swagger
 * /index/promise:
 *   post:
 *     description: sdk 向服务器上报 promise 异常数据
 *     tags: [promise 异常模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: cookie
 *         description: 用户 cookie
 *         required: true
 *         in: formData
 *         type: string
 *       - name: message
 *         description: 报错信息
 *         required: true
 *         in: formData
 *         type: string
 *       - name: type
 *         description: 数据类型
 *         in: formData
 *         required: true
 *         type: string
 *       - name: errorType
 *         description: 错误类型
 *         in: formData
 *         required: true
 *         type: string
 *       - name: fileName
 *         description: 报错文件位置
 *         in: formData
 *         required: true
 *         type: string
 *       - name: position
 *         description: 报错信息在文件中的定位
 *         in: formData
 *         required: true
 *         type: string
 *       - name: selector
 *         description: 错误堆栈
 *         in: formData
 *         required: true
 *         type: string
 *       - name: is_solve
 *         description: 报错是否解决
 *         in: formData
 *         required: false
 *         type: boolean
 *     responses:
 *       '200':
 *          description: 数据写入成功
 *          schema:
 *              $ref: '#/definitions/ReportSuccess'
 *       '500':
 *         description: 数据写入失败
 *         schema:
 *              $ref: '#/definitions/ReportFail'
 */
/**
 * @swagger
 * /api/promise:
 *   get:
 *     description: web 管理端向服务器请求 promise 异常数据
 *     tags: [promise 异常模块]
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *          description: promise 异常数据查询成功
 *          schema:
 *              $ref: '#/definitions/FindSuccess'
 *       '500':
 *         description: promise 异常数据查询失败
 *         schema:
 *              $ref: '#/definitions/FindFail'
 *       '0':
 *         description: promise 异常数据查询失败,查无此数据
 *         schema:
 *              type: object
 *              required:
 *                - code
 *                - msg
 *                - data
 *              properties:
 *                 code:
 *                     type: integer
 *                     format: int64
 *                     example: 0
 *                 msg:
 *                    type: string
 *                    example: 查无此数据
 *                 data:
 *                    type: object
 *                    properties:
 *                        status:
 *                             type: boolean
 *                             example: false
 */

// console.error 接口
/**
 * @swagger
 * /index/console-error:
 *   post:
 *     description: sdk 向服务器上报 console.error 异常数据
 *     tags: [console.error 异常模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         description: 报错 url
 *         required: true
 *         in: formData
 *         type: string
 *       - name: row
 *         description: 报错位置的行号
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: column
 *         description: 报错位置的列号
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: message
 *         description: 报错信息
 *         in: formData
 *         required: true
 *         type: string
 *       - name: stack
 *         description: 错误堆栈
 *         in: formData
 *         required: true
 *         type: string
 *       - name: is_solve
 *         description: 开发者是否解决异常
 *         in: formData
 *         required: false
 *         type: boolean
 *     responses:
 *       '200':
 *          description: 数据写入成功
 *          schema:
 *              $ref: '#/definitions/ReportSuccess'
 *       '500':
 *         description: 数据写入失败
 *         schema:
 *              $ref: '#/definitions/ReportFail'
 */
/**
 * @swagger
 * /api/console-error:
 *   get:
 *     description: web 管理端向服务器请求 promise 异常数据
 *     tags: [console.error 异常模块]
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *          description: console.error 异常数据查询成功
 *          schema:
 *              $ref: '#/definitions/FindSuccess'
 *       '500':
 *         description: console.error 异常数据查询失败
 *         schema:
 *              $ref: '#/definitions/FindFail'
 */

//  登录接口
/**
 * @swagger
 * /api/send-captcha:
 *   post:
 *     description: 发送验证码
 *     tags: [用户登入模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: 邮箱账号
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       '200':
 *          description: 成功发送验证码
 *          schema:
 *              type: object
 *              required:
 *                - code
 *                - msg
 *                - data
 *              properties:
 *                 code:
 *                     type: integer
 *                     format: int64
 *                     example: 200
 *                 msg:
 *                    type: string
 *                    example: 验证码已成功发送
 *                 data:
 *                    type: object
 *                    properties:
 *                        status:
 *                             type: boolean
 *                             example: true
 *                        captchaTime:
 *                             type: integer
 *                             format: int64
 */
/**
 * @swagger
 * /api/login:
 *   post:
 *     description: 用户登录
 *     tags: [用户登入模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: 邮箱账号
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: formData
 *         required: false
 *         type: string
 *       - name: captcha
 *         description: 验证码
 *         in: formData
 *         required: false
 *         type: integer
 *       - name: cookie
 *         description: 用户 cookie
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       '200':
 *          description: 登录成功的响应
 *          schema:
 *              type: object
 *              required:
 *                - code
 *                - msg
 *                - data
 *              properties:
 *                 code:
 *                     type: integer
 *                     format: int64
 *                     example: 200
 *                 msg:
 *                    type: string
 *                    example: 登录成功
 *                 data:
 *                    type: object
 *                    properties:
 *                        status:
 *                             type: boolean
 *                             example: true
 */
/**
 * @swagger
 * /api/register:
 *   post:
 *     description: 用户注册
 *     tags: [用户登入模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: 邮箱账号
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: formData
 *         required: true
 *         type: string
 *       - name: captcha
 *         description: 验证码
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *          description: 注册成功的响应
 *          schema:
 *              type: object
 *              required:
 *                - code
 *                - msg
 *                - data
 *              properties:
 *                 code:
 *                     type: integer
 *                     format: int64
 *                     example: 200
 *                 msg:
 *                    type: string
 *                    example: 注册成功
 *                 data:
 *                    type: object
 *                    properties:
 *                        status:
 *                             type: boolean
 *                             example: true
 */
