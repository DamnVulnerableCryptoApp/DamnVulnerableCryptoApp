import ApiRequest from '../Common/ApiRequest';

export class ClassicService {

  public static CHALLENGEPATH = `/classic/substitution`;


  public static async init(): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = `${ClassicService.CHALLENGEPATH}`;

      ApiRequest.do(path).then((response) => {
        resolve(response.data);
      });
    });
  }


  public static async checkAnswer(answer: string): Promise<any> {

    const path = `${ClassicService.CHALLENGEPATH}/check?answer=` + answer;

    return ApiRequest.do(path);
  }

}