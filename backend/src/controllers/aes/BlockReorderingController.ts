
import { BlockReorderingService } from '../../services/BlockReorderingService'
import BaseController from '../BaseController'


export interface IAdminResponse {
  isAdmin: boolean
  flag: string
}

export interface IAccessResponse {
  token: string
}

export class BlockReorderingController extends BaseController {

  public index() {
    const token = BlockReorderingService.createToken(this.getHeader("username"))

    return { token }
  }

  public admin(): IAdminResponse {

    const token = this.getHeader("token")
    let isAdmin = false

    try {
      isAdmin = BlockReorderingService.isAdmin(token)
    }
    catch (ex: any) {
      throw new Error(ex)
    }

    if (isAdmin)
      return { isAdmin, flag: BlockReorderingService.getFlag() }
    else
      return { isAdmin, flag: "" }

  }


}