import { $log, Controller, Get, HeaderParams } from '@tsed/common';
import { InternalServerError } from 'ts-httpexceptions';
import { BlockReorderingService } from '../../services/BlockReorderingService';

export interface IAdminResponse {
  isAdmin: boolean;
  flag: string;
}

export interface IAccessResponse {
  token: string;
}

@Controller("aes/ecb/block-reordering/")
export class BlockReorderingController {

  @Get("/")
  public index(@HeaderParams("username") username: string): IAccessResponse {
    const token = BlockReorderingService.createToken(username);

    return { token };
  }

  @Get("/isAdmin")
  public admin(@HeaderParams("token") token: string): IAdminResponse {

    let isAdmin = false;

    try {
      isAdmin = BlockReorderingService.isAdmin(token);
    }
    catch (ex) {
      $log.error(ex.message);

      throw new InternalServerError(ex.message);
    }

    if (isAdmin)
      return { isAdmin, flag: BlockReorderingService.getFlag() };
    else
      return { isAdmin, flag: "" };

  }


}