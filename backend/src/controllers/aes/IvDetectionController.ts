import { BodyParams, Controller, Post } from "@tsed/common";
import { IvDetectionService } from '../../services/IvDetectionService';


export interface IResponse {
  data: string;
  flag: string;
}

@Controller("/aes/cbc/iv-detection")
export class IvDetectionController {

  @Post("/send")
  public send(@BodyParams("data") data: string) {
    // do nothing... just to have an endpoint for the UI to call :)
    return {};
  }

  @Post("/encrypt")
  public encrypt(@BodyParams("data") data: string): IResponse {
    const f = data === IvDetectionService.IV ? IvDetectionService.getFlag() : "";

    return { data: IvDetectionService.encryptData(data), flag: f };
  }

  @Post("/decrypt")
  public decrypt(@BodyParams("data") data: string): IResponse {
    return { data: IvDetectionService.decryptData(data), flag: "" };
  }

}
