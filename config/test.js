/**
 * @author 周俊阳
 * @desc 测试环境配置
 */

const isH5 = process.env.TARO_ENV === 'h5'

/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    NODE_ENV: '"test"',
  },
  defineConstants: {
    API_ROOT: isH5 ? '"/"' : '"/"',
    H5_ROOT: '"/"'
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/api/': {
          target: '/',
          // pathRewrite: {
          //   '^/api/': '/'
          // },
          logLevel: 'debug', // 打印真实接口地址
          changeOrigin: true
        },
      }
    }
  }
}
