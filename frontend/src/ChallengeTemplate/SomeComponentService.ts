import ApiRequest from "../Common/ApiRequest";

export class SomeComponentService extends ApiRequest {

  // private static STORAGE_KEY = "";
  public static CHALLENGEPATH = ``;


  public static async doSomething(): Promise<string> {
    const path = `${SomeComponentService.CHALLENGEPATH}/`;

    return super.do(path);
  }



}