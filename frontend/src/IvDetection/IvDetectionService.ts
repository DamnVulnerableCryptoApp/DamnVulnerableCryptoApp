import ApiRequest from "../Common/ApiRequest";

export class IvDetectionService extends ApiRequest {

  // private static STORAGE_KEY = "";
  public static CHALLENGEPATH = `/aes/cbc/iv-detection`;


  public static async doSomething(): Promise<string> {
    const path = `${IvDetectionService.CHALLENGEPATH}/`;

    return super.do(path);
  }



}