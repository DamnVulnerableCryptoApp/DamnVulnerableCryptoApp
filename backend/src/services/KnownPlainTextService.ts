import * as crypto from 'crypto';

export class KnownPlainTextService {

  public static KEY = crypto.createHash('sha256').update("supersecurekey123").digest();
  public static FLAG = "78961849-2949-4a7b-ab4a-ea951bd91d32";

  public static encrypt(data: string): string {
    const cipher = crypto.createCipheriv('rc4', KnownPlainTextService.KEY, '');

    return cipher.update(data, "binary").toString("hex");
  }
}