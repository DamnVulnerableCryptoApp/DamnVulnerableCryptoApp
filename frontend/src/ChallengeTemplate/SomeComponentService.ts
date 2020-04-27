import ApiRequest from "../Common/ApiRequest";

export class SomeComponentService {

  // private static STORAGE_KEY = "";
  public static CHALLENGEPATh = ``;


  public static async doSomething(): Promise<string> {
    const path = `${SomeComponentService.CHALLENGEPATh}/`;

    return ApiRequest.do(path);
  }



}