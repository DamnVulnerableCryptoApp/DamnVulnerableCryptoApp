import { $log, Controller, Get, HeaderParams } from "@tsed/common";
import * as crypto from 'crypto';
import { InternalServerError } from 'ts-httpexceptions';

@Controller("/aes/cbc/padding-oracle")
export class PaddingOracleController {

  static KEY = "SUP3RS3CUR3K3Y123456789012345678";
  static IV = "super_secure_iv1";
  static FLAG = "ab194c44-b2f7-4c3e-a2e8-d2601cafe73f";

  @Get("/")
  public async home() {
    const token = this.getAnonymousToken();

    return { token };
  }


  // example token: 2ad2afbf7109c87618213051e2d1f9b89d4582bda719bf4f607a9181a20e7ea1cd0e2bea953a1050bb4475be9c6cd49d139fe8f2bfe3498b75569613d8244c37afaf5449bdaa59e9d39edf60873d61a3
  // original: 20-04-13T21:28:54.871Z;isAdmin=false;username=Anonymous
  // trying admin:
  // 20-04-13T21:28:54.871Z;isAdmin=true;username=Anonymous:
  // 32302d30342d31335432313a32383a35342e3837315a3b697341646d696e3d747275653b757365726e616d653d416e6f6e796d6f7573
  // generated encrypted content: 81f245448344e8fd081a6d6e60f70665923441af8858cdd07a7389e9e4386356bab4bcaea20d763521c23814d11707ad283b2b8a0a3c62ea34db6d5ec096a49e00000000000000000000000000000000

  // poattack "decrypt" "http://localhost:4000" "hex:2ad2afbf7109c87618213051e2d1f9b89d4582bda719bf4f607a9181a20e7ea1cd0e2bea953a1050bb4475be9c6cd49d139fe8f2bfe3498b75569613d8244c37afaf5449bdaa59e9d39edf60873d61a3" "16" "bad decrypt" "/tmp/a.txt" "hex"
  // // poattack "encrypt" "http://localhost:4000" "hex:32302d30342d31335432313a32383a35342e3837315a3b697341646d696e3d747275653b757365726e616d653d416e6f6e796d6f7573" "16" "bad decrypt" "/tmp/a.txt" "hex"
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
      return { isAdmin, flag: PaddingOracleController.FLAG };
    else
      return { isAdmin, flag: "" };

  }

  private getAnonymousToken(): string {
    const tokenContent = `lastRequestAt=${new Date().toISOString()};isAdmin=false;username=Anonymous`;
    const encrypted = this.encryptToken(tokenContent);
    $log.info("Encrypted anonymous token " + encrypted);

    return encrypted;
  }

  private encryptToken(token: string): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(PaddingOracleController.KEY), PaddingOracleController.IV);
    const tokenBuffer = Buffer.from(token, 'utf8');
    let encrypted = cipher.update(tokenBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
  }


  private decryptToken(token: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(PaddingOracleController.KEY), PaddingOracleController.IV);
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

    return tokenObj.isAdmin === true;

  }

}
