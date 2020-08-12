import ApiRequest from "../../Common/ApiRequest";


export interface IPaste {
  content: string;
  author: string;
  public: boolean;
}

export class AlgorithmNegotiationService extends ApiRequest {

  // private static STORAGE_KEY = "";
  public static CHALLENGEPATH = `/jwt/negotiation`;
  public static STORAGE_KEY = "alg-down-token";




  public static async initAsAnonymous(): Promise<string> {
    return new Promise((resolve, reject) => {

      if (localStorage.getItem(AlgorithmNegotiationService.STORAGE_KEY)) {
        resolve(); // not need to create a new session

        return;
      }

      const path = `${AlgorithmNegotiationService.CHALLENGEPATH}/anonymousAccess`;

      super.do(path, { method: 'post' }).then((res) => {
        localStorage.setItem(AlgorithmNegotiationService.STORAGE_KEY, res.token);
        resolve();
      }).catch(() => reject());

    });
  }

  public static async getPastes(): Promise<IPaste[]> {
    const path = `${AlgorithmNegotiationService.CHALLENGEPATH}/`;

    const token = localStorage.getItem(AlgorithmNegotiationService.STORAGE_KEY);
    const headers = { 'Authorization': token } as any;

    return super.do(path, { headers });
  }



}