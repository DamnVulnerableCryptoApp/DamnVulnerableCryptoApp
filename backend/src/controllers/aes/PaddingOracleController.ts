import { $log, Controller, Get, HeaderParams } from "@tsed/common";
import { InternalServerError } from 'ts-httpexceptions';
import { PaddingOracleService } from '../../services/PaddingOracleService';


export interface IAdminResponse {
  isAdmin: boolean;
  flag: string;
}

export interface IAccessResponse {
  token: string;
}


@Controller("/aes/cbc/padding-oracle")
export class PaddingOracleController {

  @Get("/")
  public home(): IAccessResponse {
    const token = PaddingOracleService.getAnonymousToken();

    return { token };
  }

  @Get("/isAdmin")
  public admin(@HeaderParams("token") token: string): IAdminResponse {

    let isAdmin = false;

    try {
      isAdmin = PaddingOracleService.isAdmin(token);
    }
    catch (ex) {
      $log.error(ex.message);

      throw new InternalServerError(ex.message);
    }

    if (isAdmin)
      return { isAdmin, flag: PaddingOracleService.getFlag() };
    else
      return { isAdmin, flag: "" };

  }



}
