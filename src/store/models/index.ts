import { Models } from '@rematch/core'
import { global } from './global'
import { userInfo } from './user'

export interface RootModel extends Models<RootModel> {
  global: typeof global
  userInfo: typeof userInfo
}

export const models: RootModel = {
  global,
  userInfo,
}
