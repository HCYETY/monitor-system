## Why

## Install

```shell
npm i monitor-system-sdk --save
```

## Usage

in index.js

```js
import { init } from 'monitor-system-sdk';

init(initOptions);
```
```ts
interface initOptions {
    appId?: string;  // 系统id
    cookie: string; // 用户id
    reportUrl: string; // 后端url
    delay?: number; // 延迟和合并上报的功能
    autoTracker?: boolean; // 自动埋点
    hashPage: boolean; // 是否为 hash 路由
    errorReport: boolean;// 是否开启错误监控
    performanceReport: boolean // 是否开启性能监控
}
```

# Function

- [x] 监控 JavaScript 异常 
- [x] 监控 Promise 异常
- [x] 监控 console.error 异常
- [x] 监控 resource 异常
- [x] 监控跨域异常
- [x] 监控白屏异常
- [x] 监控接口异常
- [x] 监控页面路由跳转
- [x] 监控页面性能
- [x] 监控网站信息
- [x] 监控用户行为
