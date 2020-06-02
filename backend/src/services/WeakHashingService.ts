import * as crypto from 'crypto';

export class WeakHashingService {

  public static ADMIN_PASSWORD = "securepassword";
  public static ADMIN_PASSWORD_HASHED = WeakHashingService.hashPassowrd(WeakHashingService.ADMIN_PASSWORD);
  public static FLAG = "c9d0ebbe-ced2-4a32-8e51-c1220a492cc0";

  public static hashPassowrd(password: string): string {
    return crypto.createHash('md5').update(password).digest("hex");
  }
}