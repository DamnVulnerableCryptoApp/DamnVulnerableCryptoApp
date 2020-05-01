import ApiRequest from '../Common/ApiRequest';

export class Md5Service extends ApiRequest {

  public static CHALLENGEPATH = `/md5`;

  public static async login(username: string, password: string): Promise<any> {
    const path = `${Md5Service.CHALLENGEPATH}/login`;

    const params = {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    };

    return super.do(path, params);
  }
}