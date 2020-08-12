import ApiRequest from '../../Common/ApiRequest';


interface ILogin {
  username: string;
  password: string;
}

interface ICheckResponse {
  success: boolean;
  flag: string;
}


export class WeakHashingService extends ApiRequest {

  public static CHALLENGEPATH = `/md5`;

  public static async login(username: string, password: string): Promise<ICheckResponse> {
    const path = `${WeakHashingService.CHALLENGEPATH}/login`;
    const payload: ILogin = { username, password };

    const params = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    return super.do(path, params);
  }
}