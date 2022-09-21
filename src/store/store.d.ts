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
    }
    interface IExtendedParameters {
      sharer?: string
      scene?: string
    }
  }
}
