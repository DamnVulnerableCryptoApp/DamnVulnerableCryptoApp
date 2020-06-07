import ApiRequest from '../../Common/ApiRequest';


interface IAdminResponse {
  isAdmin: boolean;
  flag: string;
}

interface IAccessResponse {
  token: string;
}

export class PaddingOracleService extends ApiRequest {

  public static CHALLENGEPATH = `/aes/cbc/padding-oracle`;


  public static async init() {
    return new Promise((resolve, reject) => {
      const path = `${PaddingOracleService.CHALLENGEPATH}`;

      super.do(path).then((response: IAccessResponse) => {
        localStorage.setItem("poa-token", response.token);
        resolve();
      });
    });
  }


  public static async isAdmin(): Promise<IAdminResponse> {

    const path = `${PaddingOracleService.CHALLENGEPATH}/isAdmin`;
    const token = localStorage.getItem("poa-token");
    const headers: any = { token };

    return super.do(path, { headers });



  }

}