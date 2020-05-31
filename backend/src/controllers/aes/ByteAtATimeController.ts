import { $log, Controller, Get, HeaderParams, Post } from '@tsed/common';
import * as crypto from 'crypto';

interface IAccessResponse {
  granted: boolean;
  token: string;
}

interface IAdminResponse {
  success: boolean;
  flag: string;
}




@Controller("aes/ecb/byte-at-a-time/")
export class ByteAtATimeController {

  private KEY = "3jc^aijs/jzn%nai";
  private FLAG = "362eea88-8868-11ea-bc55-0242ac130003";
  private ADMIN_PASSWORD = "THISISTHEADMINPASSWORD!!!";

  // go for the extra mile: you can detect this is ECB by sending two blocks with the same data
  // if in the output you have the same content two times, that this is ECB
  // Assuming each block as 4 bytes: AAAAAAAA AAAAAAAA and that the output encrypted is: XXXX XXXX
  // since the first and second block are the same, means they were encrypted separately, this is a feature of ECB
  //
  // this vulnerability assumes that you can control part of the content being encrypted, preferably in the beginning of the data
  // Again, lets assume each block has 4bytes and that after your input it will be concatenated the word "test"
  // you start by sending a 3 byte block with the text AAA.
  // Since one byte is missing to complete the block, the 't' from 'test' will be used in the first block
  // So you have AAAt, and lets assume this returns something like: 1234 XXXX XXXX X...
  // now, you generate a request for every single character for the 4th position: AAAA, AAAB... AAAz, etc
  // whenever you get the same output as when you only sent AAA, you know which character generated that encypted content. the 't'
  // And from here on you repeat the same process for all other characters. First you send an AA. then AAAt AABt AAzt, etc
  // and compare the results, untill you have the same result. when you have it you found another char.
  // You can use https://github.com/everping/ECB-Byte-at-a-Time to test this.
  // YOu just need to do a small modification to use http requests, instead of raw tcp socket requests
  @Post("/request-access")
  public requestAccess(@HeaderParams("username") username: string): IAccessResponse {
    const token = this.encrypt(username + this.ADMIN_PASSWORD);

    return { granted: true, token };
  }

  @Get("/hasAccess")
  public hasAccess(@HeaderParams("Authorization") token: string): boolean {
    const data = this.decrypt(token);

    return data === this.ADMIN_PASSWORD;
  }

  @Post("/admin")
  public admin(@HeaderParams("Authorization") auth: string): IAdminResponse {
    const b64auth = (auth || '').split(' ')[1] || '';
    const [user, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    let flag = "", success = false;
    if (user === "admin" && password === this.ADMIN_PASSWORD) {
      flag = this.FLAG;
      success = true;
    }

    return { flag, success };
  }



  private encrypt(data: string): string {
    const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(this.KEY), '');
    const tokenBuffer = Buffer.from(data, 'utf8');
    let encrypted = cipher.update(tokenBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
  }

  private decrypt(data: string): string {
    const decipher = crypto.createDecipheriv('aes-128-ecb', Buffer.from(this.KEY), '');
    const encryptedText = Buffer.from(data, 'hex');
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    const t = decrypted.toString();
    $log.info("Decrypted token: " + t);

    return t;
  }


}