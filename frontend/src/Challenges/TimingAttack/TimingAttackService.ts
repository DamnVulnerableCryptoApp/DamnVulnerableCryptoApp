import ApiRequest from "../../Common/ApiRequest";

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
}

export interface IForgotPasswordResponse {
  success: boolean;
  flag: string;
}

export class TimingAttackService extends ApiRequest {

  // private static STORAGE_KEY = "";
  public static CHALLENGEPATH = `/timing-attack`;


  public static async login(loginData: ILogin): Promise<ILoginResponse> {
    const path = `${TimingAttackService.CHALLENGEPATH}/login`;

    return super.do(path, { method: 'post', body: JSON.stringify(loginData) });
  }

  public static async forgotPassword(username: string): Promise<IForgotPasswordResponse> {
    const path = `${TimingAttackService.CHALLENGEPATH}/forgot-password`;

    return super.do(path, { method: 'post', body: JSON.stringify({ username }) });
  }



}