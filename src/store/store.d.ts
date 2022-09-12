declare namespace Store {
  namespace Global {
    // 全局对象
    interface IGlobal {
      userToken: string
      systemInfo: Taro.getSystemInfoSync.Result
      useCustomNav: boolean // 使用自定义导航
    }
  }
  namespace User {
    interface IUser {
      info: IUserInfo
      token: string
    }
    interface IUserInfo {
      id: any
      area: string
      city: string
      country: string
      email: string
      gender: number
      guid: string
      houseNo: string
      latitude: number
      longitude: number
      name: string
      phone: string
      province: string
      street: string
      userType: number
      avatarUrl: string
      remainPoints: number // 用户积分
    }
    interface ILocation {
      latitude: number
      longitude: number
    }
    interface IExtendedParameters {
      sharer?: string
      scene?: string
    }
  }

  namespace Home {
    interface IQueySites {
      list: IQueySitesListInfo[]
      siteInfo: IQueySiteInfo
    }
    interface IQueySiteInfo {
      createTime: string
      module: number
      page: string
      publish: number
      siteName: string
      siteNo: string
    }
    interface IQueySitesListInfo {
      title: string
      subTitle: string
      img: string
      icon: string
      elementId: number
      address: string
      type: number
      publish: number //0下架1上架
      childList: IQueySitesInfoListChild[]
    }
    interface IQueySitesInfoListChild {
      title: string
      subTitle: string
      img: string
      icon: string
      elementId: number
      address: string
      type: number
      childList: IQueySitesInfoListChild[]
    }
    interface IQueryCommodityGroup {
      categoryId: number
      categoryName: any
      chapterIds: any
      commodityGroupName: string
      commodityGroupPrice: string
      description: string
      fileUrl: string
      groupRelationVos: any
      intro: string
      loadDescription: any
      loadUrl: any
      relationLoad: any
      status: number
      subTexts: IQueryCommodityGroupSubTexts[]
      videoBgUrl: any
      videoUrl: any
    }
    interface IQueryCommodityGroupSubTexts {
      child: IQueryCommodityGroupSubTexts[]
      content: string
      id: number
      title: string
    }
  }
}
