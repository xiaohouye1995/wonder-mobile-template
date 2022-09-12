import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'
import { store } from '@/store/index'
import 'default-passive-events'
import '@/styles/index.scss'
import './app.scss'

class App extends Component {
  onLaunch() {
    // 获取启动参数接口
    this.handleStartup()
  }

  componentDidShow() {
    // 检查版本更新
    this.checkVersion()
  }

  onError(err) {
    console.log('err', err)
  }

  componentDidCatchError(error: string) {
    console.log('global', error)
  }

  /**
   * 检查并更新版本
   */
  checkVersion() {
    // 更新版本管理只有线上版本才有版本的概念，体验版没有
    // 所以需要对以下代码进行编译环境处理
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.TARO_ENV !== 'h5'
    ) {
      const updateManager = Taro.getUpdateManager()
      // 版本有更新
      updateManager.onUpdateReady(function () {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          showCancel: false,
          cancelColor: '#A5A5A5',
          confirmColor: '#FF4E4F',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          },
        })
      })
    }
  }

  /**
   * 获取启动参数
   */
  handleStartup() {
    // 获取系统信息
    store.dispatch.global.setSystemInfo()
    // 获取用户及启动数据
    // store.dispatch.userInfo.initUserInfo()
    // 获取是否使用自定义标题栏
    store.dispatch.global.setUseCustomNav()
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
