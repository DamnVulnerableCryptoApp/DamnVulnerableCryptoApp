import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { ChallengeService } from './ChallengeService';

export class KeyDisclosureService extends ChallengeService {
  static PRIVATE_KEY_PATH = path.join(__dirname, "../config/privatekey.pem");
  static PUBLIC_KEY_PATH = path.join(__dirname, "../config/publickey.pem");

  public static encrypt(content: string) {

    const publicKey = this.readPublicKey();
    const buffer = Buffer.from(content);

    return crypto.publicEncrypt(publicKey, buffer).toString("hex");
  }

  public static decrypt(content: string, key: string) {

    const buffer = Buffer.from(content, "hex");

    return crypto.privateDecrypt(key, buffer).toString();
  }

  public static readPrivateKey(): string {
    return fs.readFileSync(KeyDisclosureService.PRIVATE_KEY_PATH, "utf8");
  }

  public static readPublicKey(): string {
    return fs.readFileSync(KeyDisclosureService.PUBLIC_KEY_PATH, "utf8");
  }

}