import { $log, Controller, Get, HeaderParams } from '@tsed/common';
import * as crypto from 'crypto';
import { InternalServerError } from 'ts-httpexceptions';

@Controller("aes/ecb/block-reordering/")
export class BlockReorderingController {

  // TODO: DO NOT LET BYTE AT A TIME HERE

  static KEY = "aneuck27sSi2m3b$";
  static FLAG = "531f6323-4643-47f7-b6e3-96d48c7274a8";

  @Get("/")
  public async index(@HeaderParams("username") username: string) {
    const token = this.createToken(username);

    return { token };
  }



  // block reorderdering consists on making the app encrypt a specially crafted
  // block of data that then you can use to replace on other part of the application
  // lets see an example:
  // assuming we are creating a token for user 'test123' this is the generated token:
  // username=test123;isAdmin=true;aat=Tue, 14 Apr 2020 21:17:09 GMT
  // if we now divide this in 16byte blocks (in which AES ECB operates) we get this:
  // .
  // username=test123
  // ;isAdmin=false;a
  // t=Tue, 14 Apr 20
  // 20 21:27:23 GMT
  // .
  // each block gets encrypted individually so this is the final result:
  // f868e0f3c13935d0cbac9f76b65dd03c | username=test123
  // 3a5fd42c3fea13a3b795499740e3cb92 | ;isAdmin=false;a
  // 723a14835a4283582827d2a3ca3de2fe | t=Tue, 14 Apr 20
  // fab3371ab6f05b333ec4cc3933c7502f | 20 21:27:23 GMT
  // .
  // so next step with to try to trick the server to encrypt the isAdmin=true...
  // we can do this by manipulating the username, so our username should be: test123;isAdmin=true;aa
  // now we have a new block:
  // .
  // f868e0f3c13935d0cbac9f76b65dd03c
  // 4934a32c272d0c258d9adc25a9e76d15
  // 3a5fd42c3fea13a3b795499740e3cb92
  // 723a14835a4283582827d2a3ca3de2fe
  // f3861ec4c1f3209733b18e9fca20ed86
  // also the new block (2nd) it the content is IsAdmin=true:
  // So we can use this 2nd block to copy it to the third block:
  // This is the final token: f868e0f3c13935d0cbac9f76b65dd03c4934a32c272d0c258d9adc25a9e76d154934a32c272d0c258d9adc25a9e76d15723a14835a4283582827d2a3ca3de2fef3861ec4c1f3209733b18e9fca20ed86
  // Now sending it to the server and we got admin access:




  @Get("/isAdmin")
  public async admin(@HeaderParams("token") token: string) {

    let isAdmin = false;

    try {
      isAdmin = this.isAdmin(token);
    }
    catch (ex) {
      $log.error(ex.message);

      throw new InternalServerError(ex.message);
    }

    if (isAdmin)
      return { isAdmin, flag: BlockReorderingController.FLAG };
    else
      return { isAdmin, flag: "" };

  }

  private createToken(username: string): string {
    const tokenContent = `username=${username};isAdmin=false;at=${new Date().toUTCString()}`;
    const encrypted = this.encryptToken(tokenContent);

    $log.info("Generated token: " + tokenContent);
    $log.info("Encrypted anonymous token " + encrypted);

    return encrypted;
  }

  private encryptToken(token: string): string {
    const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(BlockReorderingController.KEY), '');
    const tokenBuffer = Buffer.from(token, 'utf8');
    let encrypted = cipher.update(tokenBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
  }


  private decryptToken(token: string): string {
    const decipher = crypto.createDecipheriv('aes-128-ecb', Buffer.from(BlockReorderingController.KEY), '');
    const encryptedText = Buffer.from(token, 'hex');
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    const t = decrypted.toString();
    $log.info("Decrypted token: " + t);

    return t;
  }

  private isAdmin(token: string): boolean {
    $log.info("Decrypting token " + token);
    const tokenObj: any = {};
    const decryptedToken = this.decryptToken(token);
    const tokenPars = decryptedToken.split(";");
    tokenPars.forEach(p => {
      const tmp = p.split("=");
      const key = tmp[0];
      const value = tmp[1];
      tokenObj[key] = value;
    });

    return tokenObj.isAdmin;

  }
}