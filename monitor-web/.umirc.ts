import { defineConfig } from 'umi';
import routes from './config/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    title: '前端监控系统',
  },
  routes,
  fastRefresh: {},
  mfsu: {},
  extraPostCSSPlugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    // require('postcss-import'),
    // require('postcss-nested'), // or require('postcss-nesting')
    //   require('tailwindcss')({
  //     config: './tailwind.config.ts',
  //   }),
  ],

  // 在开发模式下，主应用加载微应用的图片等静态资源的代理
  proxy: {
    '/xx': {
      target: 'http://localhost:xxxx',
      changeOrigin: true,
    },
  },
  // 开启`qiankun`主应用
  qiankun: {
    master: {},
  },
});
