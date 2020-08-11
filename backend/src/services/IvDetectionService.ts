import * as crypto from 'crypto';
import { ChallengeService } from './ChallengeService';

export class IvDetectionService extends ChallengeService {
  public static KEY = "123321123321asdx";
  public static IV = "super_secure_iv2";


  public static encryptData(data: string): string {
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(IvDetectionService.KEY), IvDetectionService.IV);
    const buff = Buffer.from(data, 'utf8');
    let encrypted = cipher.update(buff);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
  }

  public static decryptData(data: string): string {
    const cipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(IvDetectionService.KEY), IvDetectionService.IV);
    cipher.setAutoPadding(false);
    const buff = Buffer.from(data, 'hex');
    let decrypted = cipher.update(buff);
    decrypted = Buffer.concat([decrypted, cipher.final()]);

    return decrypted.toString();
  }
}