export const toIndexAllData = (data: any) => {
  const IndexAllData: any = {
    BannerData: [],
    ZoneData: [],
    HotData: [],
    MidBannerData: [],
    NetworkData: [],
    ServiceData: [],
    PlatformData: [],
    solutionData: [],
  }
  if (data) {
    for (const i in data) {
      const dataParent = data[i].list
      for (const j in dataParent) {
        const item = dataParent[j]
        if (data[i].siteInfo.siteNo === 'H5-home-top-banner') {
          //处理header数据
          IndexAllData.BannerData.push({
            address: item.address,
            icon: item.icon,
            img: item.img,
            title: item.title,
            elementId: item.elementId,
            isUse: item.isUse,
            childList: item.childList,
            type: item.type,
          })
        }
        if (data[i].siteInfo.siteNo === 'H5-home-zone') {
          IndexAllData.ZoneData.push({
            address: item.address,
            icon: item.icon,
            img: item.img,
            title: item.title,
            elementId: item.elementId,
            isUse: item.isUse,
            childList: item.childList,
            type: item.type,
          })
        }
        if (data[i].siteInfo.siteNo === 'H5-home-hot') {
          IndexAllData.HotData.push({
            address: item.address,
            icon: item.icon,
            img: item.img,
            title: item.title,
            elementId: item.elementId,
            isUse: item.isUse,
            childList: item.childList,
            type: item.type,
          })
        }
        if (data[i].siteInfo.siteNo === 'H5-home-mid-banner') {
          IndexAllData.MidBannerData.push({
            address: item.address,
            icon: item.icon,
            img: item.img,
            title: item.title,
            elementId: item.elementId,
            isUse: item.isUse,
            type: item.type,
          })
        }
        if (data[i].siteInfo.siteNo === 'H5-home-network') {
          IndexAllData.NetworkData.push({
            address: item.address,
            icon: item.icon,
            img: item.img,
            title: item.title,
            elementId: item.elementId,
            isUse: item.isUse,
            childList: item.childList,
            type: item.type,
          })
        }
        if (data[i].siteInfo.siteNo === 'H5-home-service') {
          IndexAllData.ServiceData.push({
            address: item.address,
            icon: item.icon,
            img: item.img,
            title: item.title,
            elementId: item.elementId,
            isUse: item.isUse,
            childList: item.childList,
            type: item.type,
          })
        }
        if (data[i].siteInfo.siteNo === 'H5-home-platform') {
          IndexAllData.PlatformData.push({
            address: item.address,
            icon: item.icon,
            img: item.img,
            title: item.title,
            elementId: item.elementId,
            isUse: item.isUse,
            childList: item.childList,
            type: item.type,
          })
        }
        if (data[i].siteInfo.siteNo === 'H5-home-solution') {
          IndexAllData.solutionData.push({
            address: item.address,
            icon: item.icon,
            img: item.img,
            title: item.title,
            elementId: item.elementId,
            isUse: item.isUse,
            childList: item.childList,
            type: item.type,
          })
        }
      }
    }
  }
  return IndexAllData
}
