import ApiRequest from "../../Common/ApiRequest";


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

export class KeyDisclosureService extends ApiRequest {

  public static CHALLENGEPATH = `/rsa/key-disclosure`;

  public static async getLicense(): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = `${KeyDisclosureService.CHALLENGEPATH}/getLicense`;


      super.do(path).then((response: IEncryptedLicense) => {
        resolve(response.license);
      }).catch(ex => reject(ex));
    });
  }



}