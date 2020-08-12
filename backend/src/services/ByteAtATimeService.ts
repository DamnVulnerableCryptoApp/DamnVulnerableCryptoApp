import { $log } from '@tsed/common';
import * as crypto from 'crypto';
import { ChallengeService } from './ChallengeService';

export class ByteAtATimeService extends ChallengeService {
  public static KEY = "3jc^aijs/jzn%nai";

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