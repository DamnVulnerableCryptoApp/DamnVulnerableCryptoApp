import ApiRequest from "../Common/ApiRequest";

export class KeyDisclosureService {

  public static CHALLENGEPATH = `/rsa/key-disclosure`;

  public static async getLicense(): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = `${KeyDisclosureService.CHALLENGEPATH}/getLicense`;


      ApiRequest.do(path).then(response => {
        resolve(response.license);
      }).catch(ex => reject(ex));
    });
  }



}