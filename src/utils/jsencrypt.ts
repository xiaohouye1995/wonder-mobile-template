import { JSEncrypt } from 'jsencrypt'

const PRIV_KEY =
  'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMGYuWUHuepCypCzacERpcImSZoHOhuL'

const PUB_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBmLllB7nqQsqQs2nBEaXCJkmaBzobi'

// 公钥加密
export function encrypt(text) {
  const encryptdata = new JSEncrypt()
  encryptdata.setPublicKey(PUB_KEY)
  const encrypted = encryptdata.encrypt(text)
  return encrypted
}

// 私钥解密
export function decrypt(text) {
  const decryptdata = new JSEncrypt()
  decryptdata.setPrivateKey(PRIV_KEY)
  const decrypted = decryptdata.decrypt(text)
  return decrypted
}
