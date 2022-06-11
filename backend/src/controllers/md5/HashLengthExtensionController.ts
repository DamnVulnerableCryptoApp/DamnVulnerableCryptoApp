import { HashLengthExtensionService } from '../../services/HashLengthExtensionService'
import BaseController from '../BaseController'

interface IData {
  data: string
  signature: string
}

interface IResponse {
  flag: string
  tampered: boolean
}

export class HashLengthExtensionController extends BaseController {

  public index(): IResponse {
    // json doesn't allow hex escape. Content needs to be escaped in unicode... ex: \x00 -> \u0000

    const data: IData = this.req.body.data

    let tampered = false
    // data = "56476870637942706379427164584E30494746756233526F5A5849675A57467A644756794947566E5A793467534746325A534235623355675A6D3931626D51676447686C625342686247772F\x80\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x06\x18asd"
    // signature = "1346d98335868e2da281eda2b48dd6954b91566f19f7a84bf24e22867f1a60a2"

    console.log(HashLengthExtensionService.sign(data.data))

    if (HashLengthExtensionService.sign(data.data) === data.signature) {
      if (HashLengthExtensionService.EXPECTED_SIGNATURE !== data.signature)
        return { flag: HashLengthExtensionService.getFlag(), tampered: false }
    }
    else
      tampered = true

    return { flag: "", tampered }
  }

  public data(): IData {
    const data = HashLengthExtensionService.DATA
    const signature = HashLengthExtensionService.sign(data)

    return { data, signature }
  }

}
