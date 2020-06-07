import { $log, Controller, Get, HeaderParams } from '@tsed/common';
import * as crypto from 'crypto';
import { InternalServerError } from 'ts-httpexceptions';

interface IAdminResponse {
  isAdmin: boolean;
  flag: string;
}

interface IAccessResponse {
  token: string;
}

@Controller("aes/ecb/block-reordering/")
export class BlockReorderingController {

  // TODO: DO NOT LET BYTE AT A TIME HERE

  static KEY = "aneuck27sSi2m3b$";
  static FLAG = "531f6323-4643-47f7-b6e3-96d48c7274a8";

  @Get("/")
  public index(@HeaderParams("username") username: string): IAccessResponse {
    const token = this.createToken(username);

    return { token };
  }

  @Get("/isAdmin")
  public admin(@HeaderParams("token") token: string): IAdminResponse {

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