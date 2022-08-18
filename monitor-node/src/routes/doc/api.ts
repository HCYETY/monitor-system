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
 *   AddPromise:
 *       type: object
 *       required:
 *         - code
 *         - msg
 *         - data
 *       properties:
 *          code:
 *              type: integer
 *              format: int64
 *          msg:
 *             type: string
 *             example: 数据写入失败
 *          data:
 *             type: object
 *             properties:
 *                 status:
 *                      type: boolean
 *                      example: false
 */



// promiseError 接口
// #region
/**
 * @swagger
 * /api/promise_report:
 *   post:
 *     description: sdk 向服务器上报异常数据
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
 *                    example: 数据写入成功
 *                 data:
 *                    type: object
 *                    properties:
 *                        status:
 *                             type: boolean
 *                             example: true
 *       '500':
 *         description: 数据写入失败
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
 *                     example: 500
 *                 msg:
 *                    type: string
 *                    example: 数据写入失败
 *                 data:
 *                    type: object
 *                    properties:
 *                        status:
 *                             type: boolean
 *                             example: false
 */
// #endregion

//  登录接口
/**
 * @swagger
 * /login:
 *   post:
 *     description: 用户登入
 *     tags: [用户登入模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: account
 *         description: 账号
 *         in: formData
 *         required: true
 *         type: string
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
 *       - name: runtime_captcha
 *         description: 发送验证码的时间戳
 *         in: formData
 *         required: false
 *         type: integer
 *       - name: session
 *         description: sessionID
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

