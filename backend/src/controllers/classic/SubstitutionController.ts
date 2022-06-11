import { SubstitutionService } from '../../services/SubstitutionService'
import BaseController from '../BaseController'

export interface IResponse {
  data: string
}

export interface ICheckResponse {
  success: boolean
  flag: string
}

export class SubstitutionController extends BaseController {

  public index(): IResponse {
    const enc = SubstitutionService.encrypt("It was an ambush. Five or our men died. We got the goods. We leave at dawn")

    return { data: enc }
  }


  public check(): ICheckResponse {
    const answer = this.req.query["answer"]

    if (answer === "iwbodteld")
      return { flag: SubstitutionService.getFlag(), success: true }
    else
      return { flag: "", success: false }
  }

}
