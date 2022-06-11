import { PaddingOracleService } from '../../services/PaddingOracleService'
import BaseController from '../BaseController'


export interface IAdminResponse {
  isAdmin: boolean
  flag: string
}

export interface IAccessResponse {
  token: string
}

export class PaddingOracleController extends BaseController {

  public home(): IAccessResponse {
    const token = PaddingOracleService.getAnonymousToken()

    return { token }
  }

  public admin(): IAdminResponse {

    const token = this.getHeader("token")
    let isAdmin = false

    isAdmin = PaddingOracleService.isAdmin(token)

    if (isAdmin)
      return { isAdmin, flag: PaddingOracleService.getFlag() }
    else
      return { isAdmin, flag: "" }

  }



}
