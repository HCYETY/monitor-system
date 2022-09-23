export default {
  '/api/getMicro': {
    apps: [
      {
        name: 'qiankun-umi', // 唯一 id
        entry: 'http://localhost:8001/', // html entry
      },
      {
        name: 'micro-umi', // 唯一 id
        entry: 'http://localhost:8002', // html entry
      },
      {
        name: 'micro-vue', // 唯一 id
        entry: 'http://localhost:8003', // html entry
      },
    ],
  }
}
