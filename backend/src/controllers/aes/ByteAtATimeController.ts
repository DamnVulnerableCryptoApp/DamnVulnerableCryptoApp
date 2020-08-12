import { Controller, HeaderParams, Post } from '@tsed/common';
import { ByteAtATimeService } from '../../services/ByteAtATimeService';


export interface IAccessResponse {
  granted: boolean;
  token: string;
}

export interface IAdminResponse {
  success: boolean;
  flag: string;
}




@Controller("aes/ecb/byte-at-a-time/")
export class ByteAtATimeController {

  public static ADMIN_PASSWORD = "THISISTHEADMINPASSWORD!!!";


  @Post("/request-access")
  public requestAccess(@HeaderParams("username") username: string): IAccessResponse {
    const token = ByteAtATimeService.encrypt(username + ByteAtATimeController.ADMIN_PASSWORD);

    return { granted: true, token };
  }


  @Post("/admin")
  public admin(@HeaderParams("Authorization") auth: string): IAdminResponse {

    const b64auth = (auth || '').split(' ')[1] || '';
    const [user, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    let flag = "", success = false;
    if (user === "admin" && password === ByteAtATimeController.ADMIN_PASSWORD) {
      flag = ByteAtATimeService.getFlag();
      success = true;
    }

    return { flag, success };
  }






}