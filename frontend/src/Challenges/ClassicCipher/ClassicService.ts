import ApiRequest from '../../Common/ApiRequest';


interface IResponse {
  data: string;
}

interface ICheckResponse {
  success: boolean;
  flag: string;
}

export class ClassicService extends ApiRequest {

  public static CHALLENGEPATH = `/classic/substitution`;


  public static async init(): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = `${ClassicService.CHALLENGEPATH}`;

      super.do(path).then((response: IResponse) => {
        resolve(response.data);
      });
    });
  }


  public static async checkAnswer(answer: string): Promise<ICheckResponse> {

    const path = `${ClassicService.CHALLENGEPATH}/check?answer=` + answer;

    return super.do(path);
  }

}