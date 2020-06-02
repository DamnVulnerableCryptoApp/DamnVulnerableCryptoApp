
import { $log, Controller, Get, HeaderParams, Post } from '@tsed/common';
import { AlgorithmDowngradeService } from '../../services/AlgorithmDowngradeService';


export interface IPaste {
  content: string;
  author: string;
  public: boolean;
}

export interface IAccessRequest {
  token: string;
}

@Controller("/jwt/downgrade")
export class AlgorithmDowngradeController {



  public static PUBLIC_PASTES: IPaste[] = [
    { public: true, author: "FakeG0s7", content: 'Irure dolore deserunt in aliqua ex sunt qui proident sit ut incididunt culpa anim eiusmod ea eiusmod eiusmod enim excepteur aute quis pariatur consequat ad ea ad non aute aute consequat culpa est qui ullamco fugiat est culpa.' },
    { public: true, author: "Anon7!92", content: 'Aute sint culpa irure laboris id ea in qui dolor laboris commodo ullamco ullamco in sunt velit cupidatat consectetur sunt dolor ad fugiat ut cillum tempor proident.' }
  ];

  public static ADMIN_PASTE: IPaste = { public: false, author: "Admin", content: AlgorithmDowngradeService.FLAG };



  @Get("/")
  public getPastes(@HeaderParams("Authorization") jwt: string): IPaste[] {
    let pastes = AlgorithmDowngradeController.PUBLIC_PASTES;

    try {
      const parsedJwt = AlgorithmDowngradeService.parseToken(jwt);
      const isAdmin = parsedJwt.payload.isAdmin as boolean;

      if (isAdmin)
        pastes = pastes.concat(AlgorithmDowngradeController.ADMIN_PASTE);

      return pastes;

    }
    catch (ex) {
      $log.error(ex);

      return pastes;
    }
  }



  @Post("/anonymousAccess")
  public requestAccess(): IAccessRequest {

    const jwt = AlgorithmDowngradeService.generateJWT("ANONYMOUSUSER");

    return { token: AlgorithmDowngradeService.JWTToString(jwt) };

  }


}