import ApiRequest from "../Common/ApiRequest";

export class BlockReorderingService extends ApiRequest {

  private static STORAGE_KEY = "ecb-br-token";
  public static CHALLENGEPATH = `/aes/ecb/block-reordering`;

  public static async createAnonymousSessionIfNeded(): Promise<string> {

    const token = localStorage.getItem(BlockReorderingService.STORAGE_KEY);
    if (token) return token;
    else
      return BlockReorderingService.createSession();
  }


  public static async isAdmin(): Promise<any> {
    return new Promise((resolve, reject) => {
      const path = `${BlockReorderingService.CHALLENGEPATH}/isAdmin`;
      const token = localStorage.getItem(BlockReorderingService.STORAGE_KEY);
      const headers: any = { token };

      super.do(path, { headers }).then(res => resolve(res)).catch(err => reject(err));

    });
  }


  private static async createSession(): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = `${BlockReorderingService.CHALLENGEPATH}/`;
      const headers: any = { username: 'anonymous' };

      super.do(path, { headers }).then((response) => {
        localStorage.setItem(BlockReorderingService.STORAGE_KEY, response.token); // Don't do this, it is insecure :)
        resolve(response.token);
      }).catch(ex => reject(ex));



    });
  }



}