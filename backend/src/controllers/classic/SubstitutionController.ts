import { Controller, Get, QueryParams } from "@tsed/common";
import { SubstitutionService } from '../../services/SubstitutionService';


export interface IResponse {
  data: string;
}

export interface ICheckResponse {
  success: boolean;
  flag: string;
}

@Controller("/classic/substitution")
export class SubstitutionController {

  @Get("/")
  public index(): IResponse {
    const enc = SubstitutionService.encrypt("It was an ambush. Five or our men died. We got the goods. We leave at dawn");

    return { data: enc };
  }


  @Get("/check")
  public check(@QueryParams("answer") answer: string): ICheckResponse {
    if (answer === "iwbodteld")
      return { flag: SubstitutionService.getFlag(), success: true };
    else
      return { flag: "", success: false };
  }

}
