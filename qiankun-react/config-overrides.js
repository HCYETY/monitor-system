const { name } = require('./package');

module.exports = {
  webpack: (config, env) => {
    // 解决主应用接入后会挂掉的问题：https://github.com/umijs/qiankun/issues/340
    // config.entry = config.entry.filter(
    //   (e) => !e.includes('webpackHotDevClient')
    // );

    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.globalObject = 'window';
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
    return config;
  },
  devServer: (_) => {
    const config = _;
    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;
    config.injectClient = false;
    return config;
  }
}
