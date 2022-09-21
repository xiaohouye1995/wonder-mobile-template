/**
 * @author 周俊阳
 * @desc 项目配置
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path'

const config = {
  projectName: '杭州网达移动多端模板',
  date: '2022-9-19',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  sass: {
    resource: [path.resolve(__dirname, '..', 'src/styles/variables.scss')],
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    router: {
      mode: 'browser' // 'hash' | 'browser'
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
      pxtransform: {
        enable: true,
        config: {
          onePxTransform: false
        }
      }
    },
  },
}

module.exports = function (merge) {
  
  if (process.env.APP_ENV === 'test') {
    return merge({}, config, require('./test'))
  } else if (process.env.APP_ENV === 'prod') {
    return merge({}, config, require('./prod'))
  } else if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
