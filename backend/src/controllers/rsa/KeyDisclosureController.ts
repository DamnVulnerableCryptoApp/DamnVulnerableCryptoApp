import { Controller, Get, QueryParams } from '@tsed/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

interface IResponse {
  success: boolean;
  flag: string;
}

interface ILicense {
  users: number;
  type: string;
  addons: string;
  expiration: string;
  projectLimit: number;
  magic: string;
  flag: string;
}

interface IEncryptedLicense {
  license: string;
}

@Controller("/rsa/key-disclosure")
export class KeyDisclosure {

  static MAGIC = "f0997a28f600ffe8d489c9fcb70a7716ff1c89a296e74c23850c32be9245907c2c37955659b98e6d701b265ec050160be865ad871b0712421361573e62c4cabf";
  static FLAG = "b9e8b602-0cbe-4300-abff-9deac3cac27d";
  static PRIVATE_KEY_PATH = path.join(__dirname, "../../config/privatekey.pem");
  static PUBLIC_KEY_PATH = path.join(__dirname, "../../config/publickey.pem");


  @Get("/")
  public index(@QueryParams("magic") magic: string): IResponse {
    if (KeyDisclosure.MAGIC === magic)
      return { flag: KeyDisclosure.FLAG, success: true };
    else
      return { flag: "", success: false };
  }

  @Get("/getLicense")
  public getLicense(): IEncryptedLicense {
    const license: ILicense = {
      users: 10,
      type: "full",
      addons: "reporting",
      expiration: "Fri, 17 Apr 2050 19:45:49 GMT",
      projectLimit: 9999999,
      magic: KeyDisclosure.MAGIC,
      flag: KeyDisclosure.FLAG,
    };

    return { license: this.encryptLicense(JSON.stringify(license)) };
  }


  private encryptLicense(license: string) {

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