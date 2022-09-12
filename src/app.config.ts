import { PAGES } from './utils/pages'

export default {
  pages: PAGES,
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '智云领航',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F6F6F6',
    enablePullDownRefresh: false,
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#D25858',
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
        pagePath: 'pages/scenes/index',
        text: '场景',
        iconPath: './assets/tabbar/tab_scenes.png',
        selectedIconPath: './assets/tabbar/tab_scenes_selected.png',
      },
      {
        pagePath: 'pages/serve/index',
        text: '服务',
        iconPath: './assets/tabbar/tab_serves.png',
        selectedIconPath: './assets/tabbar/tab_serves_selected.png',
      },
      {
        pagePath: 'pages/group/index',
        text: '集团',
        iconPath: './assets/tabbar/tab_group.png',
        selectedIconPath: './assets/tabbar/tab_group_selected.png',
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
      desc: '你的位置信息将用于杭州网达软件内部位置信息效果展示',
    },
  },
}
