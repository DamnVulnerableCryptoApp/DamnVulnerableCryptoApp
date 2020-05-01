import { BodyParams, Controller, Get, Post } from "@tsed/common";
import * as crypto from 'crypto';


@Controller("/aes/cbc/iv-detection")
export class IvDetectionController {

  static KEY = "SUP3RS3CUR3K3Y12"; // TODO: CHANGE
  static IV = "super_secure_iv1"; // TODO: CHANGE
  static FLAG = "ab194c44-b2f7-4c3e-a2e8-d2601cafe73f"; // TODO: CHANGE

  @Get("/")
  public async home() {

  }


  @Post("/encrypt")
  public async encrypt(@BodyParams("data") data: string) {
    return { data: this.encryptData(data) };
  }

  @Post("/decrypt")
  public async decrypt(@BodyParams("data") data: string) {
    return { data: this.decryptData(data) };
  }


  private encryptData(data: string): string {
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(IvDetectionController.KEY), IvDetectionController.IV);
    // cipher.setAutoPadding(false);
    const tokenBuffer = Buffer.from(data, 'utf8');
    let encrypted = cipher.update(tokenBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
  }


  private decryptData(data: string): string {
    const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(IvDetectionController.KEY), IvDetectionController.IV);
    // decipher.setAutoPadding(false);
    const encryptedText = Buffer.from(data, 'hex');
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString("hex");
  }
}
