import * as crypto from 'crypto';
import { ChallengeService } from './ChallengeService';

export class KnownPlainTextService extends ChallengeService {

  public static KEY = crypto.createHash('sha256').update("supersecurekey123").digest();

  public static encrypt(data: string): string {
    const cipher = crypto.createCipheriv('rc4', KnownPlainTextService.KEY, '');

    return cipher.update(data, "binary").toString("hex");
  }
}