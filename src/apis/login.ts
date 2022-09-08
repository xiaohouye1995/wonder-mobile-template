import { get, post } from '@/utils/request'

// 获取验证码
export const verifyCodeGenerate = (mobile: string) => {
  const res: any = post('5gmall-api/verifyCode/generate', {
    mobile,
    type: 1,
  })
  return res
}
