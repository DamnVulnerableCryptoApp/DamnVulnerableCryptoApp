import { ByteAtATimeService } from '../../services/ByteAtATimeService'
import BaseController from '../BaseController'


export interface IAccessResponse {
  granted: boolean
  token: string
}

export interface IAdminResponse {
  success: boolean
  flag: string
}

export class ByteAtATimeController extends BaseController {

  public static ADMIN_PASSWORD = "THISISTHEADMINPASSWORD!!!"

  public requestAccess(): IAccessResponse {
    const username = this.getHeader("username")
    const token = ByteAtATimeService.encrypt(username + ByteAtATimeController.ADMIN_PASSWORD)

    return { granted: true, token }
  }

  public admin(): IAdminResponse {

    const auth = this.getHeader("Authorization")
    const b64auth = (auth || '').split(' ')[1] || ''
    const [user, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    let flag = "", success = false
    if (user === "admin" && password === ByteAtATimeController.ADMIN_PASSWORD) {
      flag = ByteAtATimeService.getFlag()
      success = true
    }

    return { flag, success }
  }






}