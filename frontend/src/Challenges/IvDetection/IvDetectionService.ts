import ApiRequest from "../../Common/ApiRequest";

interface IResponse {
  data: string;
  flag: string;
}


export class IvDetectionService extends ApiRequest {

  // private static STORAGE_KEY = "";
  public static CHALLENGEPATH = `/aes/cbc/iv-detection`;


  public static async sendMessage(message: string): Promise<IResponse> {
    return new Promise((resolve, reject) => {


      const encryptPath = `${IvDetectionService.CHALLENGEPATH}/encrypt`;
      const sendPath = `${IvDetectionService.CHALLENGEPATH}/send?conversationId=5`;

      super.do(encryptPath, { method: 'post', body: JSON.stringify({ data: message }) }).then(res => {

        // second method is just to make things more "real"
        // first request asks to encrypt data
        // second sends encrypted data to destination
        super.do(sendPath, { method: 'post', body: JSON.stringify({ data: res.data }) }).then(res2 => {
          resolve(res);
        }).catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }



}