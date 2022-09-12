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
    API_ROOT: isH5 ? '"/"' : '"http://180.167.180.242:14001/"',
    // H5_ROOT: '"/"'
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/5gmall-api/': {
          target: 'http://180.167.180.242:14001/',
          // pathRewrite: {
          //   '^/api/': '5gmall-api/'
          // },
          logLevel: 'debug', // 打印真实接口地址
          changeOrigin: true
        },
        '/svga/': {
          target: 'https://navigation-1256354221.cos.ap-shanghai.myqcloud.com/',
          // pathRewrite: {
          //   '^/api/': '5gmall-api/'
          // },
          logLevel: 'debug', // 打印真实接口地址
          changeOrigin: true
        }
      }
    }
  }
}
