import { PAGES } from './utils/pages'

export default {
  pages: PAGES,
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '餐饮红黑榜',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F6F6F6',
    enablePullDownRefresh: false,
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#a30022',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './assets/tabbar/tab_home.png',
        selectedIconPath: './assets/tabbar/tab_home_selected.png',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: './assets/tabbar/tab_my.png',
        selectedIconPath: './assets/tabbar/tab_my_selected.png',
      },
    ],
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于餐饮红黑榜内部位置信息效果展示',
    },
  },
}
