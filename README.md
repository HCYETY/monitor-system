# SDK 介绍

## 技术选型

+ TypeScript
+ Webpack
+ Babel
+ vitest

## 业务分析

使用原生 js 监控项目的运行情况，包括捕获 各种可能发生的错误、用户行为、网页性能和网站信息等等，并将捕获到的数据提取成一个对象，然后将该对象上报到后端时序数据库。

需要监控的地方：
- 异常数据
  - 前端异常
    - JS 异常
    - Promise 异常
    - resource 异常
    - console.error 异常
    - 跨域异常
  - 接口异常
    - 超时/未响应异常
    - 4xx 请求异常
    - 5xx 请求异常
    - ...
  - 白屏异常
- 行为数据
  - 用户操作路径
  - 路由跳转
- 性能数据
  - 白屏时间、首屏渲染时间等页面关键信息
- 其他
  - PV、UV

## 项目代码介绍

### 目录

**大纲**：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6132c5d0976043eb93c5f619c043c94c~tplv-k3u1fbpfcp-watermark.image?)

**说明**：

```
Project
|—— example 		# 存放用于测试当前开发 sdk 的项目
|—— lib			# 存放 rollup 打包后的文件
|—— src			# 主要代码目录
|    |—— test		# vitest 单元测试
|    |—— type		# 存放 TypeScript 类型
|    |—— util		# 工具类，用于存放各种处理函数
```

### 关于各种监听函数的实现思路
#### 异常处理
1. xhr 异常

实现思路
> 通过重写 window 上的 `XMRHttpRequest` 方法，并使用 `addEventListener` 监听器对各种情况进行判断
> 	 timeout => 超时
>
> 	 loadend => 加载结束阶段 

2. Fetch 异常

实现思路
> 方法和 `xhr 异常` 同理，也是通过重写 window 上的 fetch 方法，区别在于由于 fetch 的特殊性（**只有网络错误或者无法连接时，Fetch 才会报错**，其他情况下**都不会报错**，而是认为 **请求成功**），因此，我们只能通过
> 1.  `Response.status`  属性，得到 `HTTP` 回应的真实状态码，才能判断请求是否成功
> 2. 或者判断 `response.ok` 是否为 `true`, `true` => 请求成功，否则 **请求失败**

3. JS 异常 （资源加载异常，脚本异常）

实现思路
> 通过 `window.addEventListener` 事件监听钩子函数的 `error` 事件去获取，我们可以在捕获异常事件的同时去处理这些异常信息，在这里，我们使用了 `getErrorKey` 函数去获取事件的错误类型，包括了 `Resource 异常、JS 异常以及跨域 CORS 异常` ，然后我们就可以根据错误类型去获取我们要的信息

4. Promise 异常

实现思路
> 通过`window.addEventListener` 事件监听钩子函数的 `unhandledrejection` 去获取，首先判断该`Promise` 是否跨域， 如果存在跨域异常，就按照跨域的情况来处理信息，否则就是 `Promsie Error`

5. console.error 异常

实现思路
> 我们可以用一个变量`consoleError` 去等于`window.console.error`，然后再通过重写 `window` 上的 `console.error` 方法，将各种错误信息处理完成，最后将 `consoleError` 这个变量的 `this` 绑定到 `console` 上

6. 白屏异常

实现思路
> 白屏异常有很多种的实现方法，可以通过全埋点，十字埋点等，这里我们使用的是 十字埋点，十字就是在当前屏幕的正十字方向，我们可以通过检索这个十字方向上的埋点元素来判断是否白屏。
>
> 注意：这里我们需要考虑一个点：**判断白屏的时机**,，很显然需要时加载完页面之后。


#### PV 统计
7. `history` 路由监听

实现思路
> 因为 history路由依赖全局对象 `history` 实现的，所以我们的实现思路就可以依赖 `pushState` 和 `replaceState` 来实现，但是这两个方法不能被 `popstate` 监听到，所以我们需要重写这两个方法来实现数据的采集。

8. `hash` 路由监听

实现思路
> 因为 当`hash 改变会触发 hashchange` ，所以我们只需要在全局加上一个 监听函数，在监听函数中实现采集并上报就行了，但是 在 `React` 以及 `Vue` 中，对于 `hash` 路由的跳转并不是通过 `hashchange` 的监听实现的，而是用的 `pushState` ，所以我们还要加个 对`pushState` 的监听。



#### 数据上报

实现思路
> 使用 `Navigator.sendBeacon()` 发送请求，后端调用 `co-body` 第三方库解析数据；如果浏览器不支持 `sendBeacon` ，则通过 `new Image()` 设置 `src` 属性发送请求。
