import ApiRequest from "../../Common/ApiRequest";

export interface IAccessResponse {
  granted: boolean;
  token: string;
}

export interface IAdminResponse {
  success: boolean;
  flag: string;
}

export class ByteAtATimeService extends ApiRequest {

  public static CHALLENGEPATH = `/aes/ecb/byte-at-a-time`;


  public static async askPermission(): Promise<IAccessResponse> {

    const path = `${ByteAtATimeService.CHALLENGEPATH}/request-access`;
    const params: any = { method: 'post', headers: { 'username': 'KeepingitFake' } };

    return super.do(path, params);
  }

  public static async adminLogin(password: string): Promise<IAdminResponse> {

    const path = `${ByteAtATimeService.CHALLENGEPATH}/admin`;
    const params: any = { method: 'post', headers: { "Authorization": `Basic ${btoa(`admin:${password}`)}` } };

    return super.do(path, params);
  }



}