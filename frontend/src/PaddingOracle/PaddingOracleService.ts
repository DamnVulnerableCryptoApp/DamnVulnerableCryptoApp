import ApiRequest from '../Common/ApiRequest';

export class PaddingOracleService {

  public static CHALLENGEPATH = `/aes/cbc/padding-oracle`;


  public static async init() {
    return new Promise((resolve, reject) => {
      const path = `${PaddingOracleService.CHALLENGEPATH}`;

      ApiRequest.do(path).then((response) => {
        localStorage.setItem("poa-token", response.token);
        resolve();
      });
    });
  }


  public static async isAdmin(): Promise<any> {

    const path = `${PaddingOracleService.CHALLENGEPATH}/isAdmin`;
    const token = localStorage.getItem("poa-token");
    const headers: any = { token };

    return ApiRequest.do(path, { headers });



  }

}