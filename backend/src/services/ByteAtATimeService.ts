import { $log } from '@tsed/common';
import * as crypto from 'crypto';

export class ByteAtATimeService {
  public static KEY = "3jc^aijs/jzn%nai";
  public static FLAG = "362eea88-8868-11ea-bc55-0242ac130003";

  public static encrypt(data: string): string {
    const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(this.KEY), '');
    const tokenBuffer = Buffer.from(data, 'utf8');
    let encrypted = cipher.update(tokenBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
  }

  public static decrypt(data: string): string {
    const decipher = crypto.createDecipheriv('aes-128-ecb', Buffer.from(this.KEY), '');
    const encryptedText = Buffer.from(data, 'hex');
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    const t = decrypted.toString();
    $log.info("Decrypted token: " + t);

    return t;
  }
}