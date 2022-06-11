import * as crypto from 'crypto'
import { ChallengeService } from './ChallengeService'

export class PaddingOracleService extends ChallengeService {

  public static KEY = "SUP3RS3CUR3K3Y123456789012345678"
  public static IV = "super_secure_iv1"


  public static getAnonymousToken(): string {
    const tokenContent = PaddingOracleService.createTokenString()
    const encrypted = this.encryptToken(tokenContent)
    console.info("Encrypted anonymous token " + encrypted)

    return encrypted
  }

  public static createTokenString(user = "Anonymous", isAdmin = false) {
    return `lastRequestAt=${new Date().toISOString()};isAdmin=${isAdmin};username=${user}`
  }

  public static encryptToken(token: string): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(PaddingOracleService.KEY), PaddingOracleService.IV)
    const tokenBuffer = Buffer.from(token, 'utf8')
    let encrypted = cipher.update(tokenBuffer)
    encrypted = Buffer.concat([encrypted, cipher.final()])

    return encrypted.toString("hex")
  }


  public static decryptToken(token: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(PaddingOracleService.KEY), PaddingOracleService.IV)
    const encryptedText = Buffer.from(token, 'hex')
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])

    const t = decrypted.toString()
    console.info("Decrypted token: " + t)

    return t
  }

  public static parseTokenString(token: string): any {
    const tokenObj: any = {}
    const decryptedToken = this.decryptToken(token)
    const tokenPars = decryptedToken.split(";")
    tokenPars.forEach(p => {
      const tmp = p.split("=")
      const key = tmp[0]
      const value = tmp[1]
      tokenObj[key] = value
    })

    return tokenObj
  }

  public static isAdmin(token: string): boolean {
    console.info("Decrypting token " + token)
    const t = this.parseTokenString(token)

    return t.isAdmin === 'true'

  }
}