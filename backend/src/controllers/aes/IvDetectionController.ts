import { BodyParams, Controller, Post } from "@tsed/common";
import * as crypto from 'crypto';


@Controller("/aes/cbc/iv-detection")
export class IvDetectionController {

  static KEY = "123321123321asdx";
  static IV = "super_secure_iv2";
  static FLAG = "485e40a2-8c8a-11ea-bc55-0242ac130003";

  @Post("/send")
  public async send(@BodyParams("data") data: string) {
    // do nothing... just to have an endpoint for the UI to call :)
    return {};
  }


  @Post("/encrypt")
  public async encrypt(@BodyParams("data") data: string) {
    const f = data === IvDetectionController.IV ? IvDetectionController.FLAG : "";

    return { data: this.encryptData(data), flag: f };
  }



  private encryptData(data: string): string {
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(IvDetectionController.KEY), IvDetectionController.IV);
    const tokenBuffer = Buffer.from(data, 'utf8');
    let encrypted = cipher.update(tokenBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
  }

}
