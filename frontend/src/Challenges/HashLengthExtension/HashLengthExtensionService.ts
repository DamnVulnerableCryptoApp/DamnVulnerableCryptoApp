import ApiRequest from "../../Common/ApiRequest"

export interface IData {
  data: string
  signature: string
}

interface IResponse {
  flag: string
  tampered: boolean
}

export class HashLengthExtensionService extends ApiRequest {

  // private static STORAGE_KEY = "";
  public static CHALLENGEPATH = `/hash-length-extension`
  public static DATA_KEY = "hle-auth-data"
  public static SIGN_KEY = "hle-auth-signature"

  public static async getData(): Promise<IData> {
    return new Promise((resolve, reject) => {

      const path = `${HashLengthExtensionService.CHALLENGEPATH}/data`

      const data = localStorage.getItem(HashLengthExtensionService.DATA_KEY)
      const signature = localStorage.getItem(HashLengthExtensionService.SIGN_KEY)

      if (!data || !signature) {
        super.do(path, { method: 'post' }).then((r: IData) => {
          localStorage.setItem(HashLengthExtensionService.DATA_KEY, r.data)
          localStorage.setItem(HashLengthExtensionService.SIGN_KEY, r.signature)

          resolve(r)
        }).catch(r => reject(r))
      }
      else
        resolve({ data, signature })
    })
  }

  public static async check(data: IData): Promise<IResponse> {
    const path = `${HashLengthExtensionService.CHALLENGEPATH}/`

    return super.do(path, { method: 'POST', body: JSON.stringify({ data: data.data, signature: data.signature }) })
  }



}