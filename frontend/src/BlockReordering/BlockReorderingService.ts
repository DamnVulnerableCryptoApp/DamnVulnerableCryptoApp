import ApiRequest from "../Common/ApiRequest";

export class BlockReorderingService {

  private static STORAGE_KEY = "ecb-br-token";
  public static CHALLENGEPATh = `/aes/ecb/block-reordering`;

  public static async createAnonymousSessionIfNeded(): Promise<string> {

    const token = localStorage.getItem(BlockReorderingService.STORAGE_KEY);
    if (token) return token;
    else
      return BlockReorderingService.createSession();
  }


  public static async isAdmin(): Promise<any> {
    return new Promise((resolve, reject) => {
      const path = `${BlockReorderingService.CHALLENGEPATh}/isAdmin`;
      const token = localStorage.getItem(BlockReorderingService.STORAGE_KEY);
      const headers: any = { token };

      return ApiRequest.do(path, { headers });

    });
  }


  private static async createSession(): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = `${BlockReorderingService.CHALLENGEPATh}/`;
      const headers: any = { username: 'anonymous' };

      ApiRequest.do(path, headers).then((response) => {
        localStorage.setItem(BlockReorderingService.STORAGE_KEY, response.token); // Don't do this, it is insecure :)
        resolve(response.token);
      }).catch(ex => reject(ex));



    });
  }



}