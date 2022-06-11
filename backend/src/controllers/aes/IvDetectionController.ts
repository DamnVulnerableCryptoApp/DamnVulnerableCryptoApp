import { IvDetectionService } from '../../services/IvDetectionService'
import BaseController from '../BaseController'

export interface IResponse {
  data: string
  flag: string
}

export class IvDetectionController extends BaseController {

  public send() {
    const data = this.req.body.data
    // do nothing... just to have an endpoint for the UI to call :)

    return {}
  }

  public encrypt(): IResponse {
    const data = this.req.body.data
    const f = data === IvDetectionService.IV ? IvDetectionService.getFlag() : ""

    return { data: IvDetectionService.encryptData(data), flag: f }
  }

  public decrypt(): IResponse {
    const data = this.req.body.data

    return { data: IvDetectionService.decryptData(data), flag: "" }
  }

}
