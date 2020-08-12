import * as crypto from 'crypto';
import { ChallengeService } from './ChallengeService';

export class WeakHashingService extends ChallengeService {

  public static ADMIN_PASSWORD = "securepassword";
  public static ADMIN_PASSWORD_HASHED = WeakHashingService.hashPassowrd(WeakHashingService.ADMIN_PASSWORD);

  public static hashPassowrd(password: string): string {
    return crypto.createHash('md5').update(password).digest("hex");
  }
}