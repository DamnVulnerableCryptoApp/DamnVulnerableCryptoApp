import { Buffer } from 'node:buffer'
import crypto from 'node:crypto'
import { ChallengeService } from './ChallengeService'

export class BlockReorderingService extends ChallengeService {

  static KEY = "aneuck27sSi2m3b$"

  // TODO: DO NOT LET BYTE AT A TIME HERE
  public static createToken(username: string, isAdmin = false): string {
    const tokenContent = `username=${username};isAdmin=${isAdmin};at=${new Date().toUTCString()}`
    const encrypted = this.encryptToken(tokenContent)

    console.info("Generated token: " + tokenContent)
    console.info("Encrypted anonymous token " + encrypted)

    return encrypted
  }

  public static encryptToken(token: string): string {
    const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(BlockReorderingService.KEY), '')
    const tokenBuffer = Buffer.from(token, 'utf8')
    let encrypted = cipher.update(tokenBuffer)
    encrypted = Buffer.concat([encrypted, cipher.final()])

    return encrypted.toString("hex")
  }


  public static decryptToken(token: string): string {
    const decipher = crypto.createDecipheriv('aes-128-ecb', Buffer.from(BlockReorderingService.KEY), '')
    const encryptedText = Buffer.from(token, 'hex')
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])

    const t = decrypted.toString()
    console.info("Decrypted token: " + t)

    return t
  }

  public static isAdmin(token: string): boolean {
    console.info("Decrypting token " + token)
    const tokenObj: any = {}
    const decryptedToken = this.decryptToken(token)
    const tokenPars = decryptedToken.split(";")
    tokenPars.forEach(p => {
      const tmp = p.split("=")
      const key = tmp[0]
      const value = tmp[1]
      tokenObj[key] = value
    })

    return tokenObj.isAdmin === 'true'

  }
}