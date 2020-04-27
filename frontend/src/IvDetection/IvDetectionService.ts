import ApiRequest from "../Common/ApiRequest";

export class IvDetectionService {

  // private static STORAGE_KEY = "";
  public static CHALLENGEPATh = ``;


  public static async doSomething(): Promise<string> {
    const path = `${IvDetectionService.CHALLENGEPATh}/`;

    return ApiRequest.do(path);
  }



}