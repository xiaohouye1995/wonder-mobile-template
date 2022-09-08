/**
 * @author 小侯爷
 * @desc 开发环境配置
 */

const isH5 = process.env.TARO_ENV === 'h5'
const HOST = '"/"'

/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {
    API_ROOT: isH5 ? '"/"' : '"/"',
    // H5_ROOT: '"/"'
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
        }
      }
    }
  }
}
