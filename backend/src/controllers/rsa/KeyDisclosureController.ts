import { Controller, QueryParams, Get } from '@tsed/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Controller("/rsa/key-disclosure")
export class KeyDisclosure {

  static MAGIC = "f0997a28f600ffe8d489c9fcb70a7716ff1c89a296e74c23850c32be9245907c2c37955659b98e6d701b265ec050160be865ad871b0712421361573e62c4cabf";
  static FLAG = "b9e8b602-0cbe-4300-abff-9deac3cac27d";
  static PRIVATE_KEY_PATH = path.join(__dirname, "../../config/privatekey.pem");
  static PUBLIC_KEY_PATH = path.join(__dirname, "../../config/publickey.pem");


  @Get("/")
  public async index(@QueryParams("magic") magic: string) {
    if (KeyDisclosure.MAGIC === magic)
      return { flag: KeyDisclosure.FLAG };
    else
      return { flag: "" };
  }

  @Get("/getLicense")
  public async getLicense() {
    const license = JSON.stringify({
      users: 10,
      type: "full",
      addons: "reporting",
      expiration: "Fri, 17 Apr 2050 19:45:49 GMT",
      projectLimit: 9999999,
      magic: KeyDisclosure.MAGIC,
      flag: KeyDisclosure.FLAG,
    });

    return { license: this.encryptLicense(license) };
  }


  public encryptLicense(license: string) {

    const publicKey = fs.readFileSync(KeyDisclosure.PUBLIC_KEY_PATH, "utf8");
    const buffer = Buffer.from(license);

    return crypto.publicEncrypt(publicKey, buffer).toString("hex");
  }

  private generateKeys() {
    crypto.generateKeyPair('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'top secret'
      }
    }, (err, publicKey, privateKey) => {
      fs.writeFileSync(KeyDisclosure.PUBLIC_KEY_PATH, publicKey);
      fs.writeFileSync(KeyDisclosure.PRIVATE_KEY_PATH, privateKey);
    });
  }
}