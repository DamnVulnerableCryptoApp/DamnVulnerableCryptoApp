import { WeakHashingService } from '../../services/WeakHashingService'
import BaseController from '../BaseController'

export interface ILogin {
  username: string
  password: string
}

export interface ICheckResponse {
  success: boolean
  flag: string
}

export class WeakHashingController extends BaseController {

  public login(): ICheckResponse {
    // https://crackstation.net/ - securepassword = b0439fae31f8cbba6294af86234d5a28

    const body: ILogin = this.req.body

    if (body.username === "admin" && WeakHashingService.hashPassowrd(body.password) === WeakHashingService.ADMIN_PASSWORD_HASHED)
      return { success: true, flag: WeakHashingService.getFlag() }
    else
      return { success: false, flag: "" }
  }



}
