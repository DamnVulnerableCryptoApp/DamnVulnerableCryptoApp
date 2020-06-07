import { BodyParams, Controller, Post } from '@tsed/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

interface IDecryptInbox {
  privateKey: string;
}

interface IEmail {
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
}

interface IDecryptInboxResponse {
  emails: IEmail[];
  success: boolean;
  flag: string;
}


@Controller("/rsa/key-disclosure")
export class KeyDisclosure {


  static FLAG = "b9e8b602-0cbe-4300-abff-9deac3cac27d";
  static PRIVATE_KEY_PATH = path.join(__dirname, "../../config/privatekey.pem");
  static PUBLIC_KEY_PATH = path.join(__dirname, "../../config/publickey.pem");

  static MAILBOX_CHECK_STRING = "pleasefindme";
  static MAILBOX_CHECK = KeyDisclosure.encrypt(KeyDisclosure.MAILBOX_CHECK_STRING);

  static EMAILS: IEmail[] = [{
    body: `Hi mate,\n has you requested: ${KeyDisclosure.FLAG}`,
    date: new Date().toISOString(),
    from: "Fake Reporter <fake.reporter@fakecryptomail.com>",
    subject: "Got a flag for you",
    to: "Fake expert <fake.expert@fakecryptomail.com>"
  },
  {
    body: `Hey fake,\n Have you heard about DamnVulnerableCryptoApp? Seems really cool, take a look at it:)`,
    date: new Date().toISOString(),
    from: "Gh0st1337 <gh0st.1337@fakecryptomail.com>",
    subject: "Nice Tool",
    to: "Fake expert <fake.expert@fakecryptomail.com>"
  }
  ];


  @Post("/decrypt-mailbox")
  public decrypt(@BodyParams() body: IDecryptInbox): IDecryptInboxResponse {
    const key = body.privateKey;
    console.log(KeyDisclosure.decrypt(key, KeyDisclosure.MAILBOX_CHECK));
    let decryptionSuccess = false;

    try {
      if (KeyDisclosure.decrypt(key, KeyDisclosure.MAILBOX_CHECK) === KeyDisclosure.MAILBOX_CHECK_STRING)
        decryptionSuccess = true;
    } catch (ex) { }


    if (decryptionSuccess)
      return { emails: KeyDisclosure.EMAILS, success: true, flag: KeyDisclosure.FLAG };
    else
      return { emails: [], success: false, flag: "" };

  }


  private static encrypt(content: string) {

    const publicKey = fs.readFileSync(KeyDisclosure.PUBLIC_KEY_PATH, "utf8");
    const buffer = Buffer.from(content);

    return crypto.publicEncrypt(publicKey, buffer).toString("hex");
  }

  private static decrypt(privatekey: string, content: string) {

    const buffer = Buffer.from(content, "hex");

    return crypto.privateDecrypt(privatekey, buffer).toString();
  }


}