
import { $log, Controller, Get, HeaderParams, Post } from '@tsed/common';
import { AlgorithmNegotiationService } from '../../services/AlgorithmNegotiationService';


export interface IPaste {
  content: string;
  author: string;
  public: boolean;
}

export interface IAccessRequest {
  token: string;
}

@Controller("/jwt/negotiation")
export class AlgorithmNegotiationController {



  public static PUBLIC_PASTES: IPaste[] = [
    { public: true, author: "FakeG0s7", content: 'Irure dolore deserunt in aliqua ex sunt qui proident sit ut incididunt culpa anim eiusmod ea eiusmod eiusmod enim excepteur aute quis pariatur consequat ad ea ad non aute aute consequat culpa est qui ullamco fugiat est culpa.' },
    { public: true, author: "Anon7!92", content: 'Aute sint culpa irure laboris id ea in qui dolor laboris commodo ullamco ullamco in sunt velit cupidatat consectetur sunt dolor ad fugiat ut cillum tempor proident.' }
  ];

  public static ADMIN_PASTE: IPaste = { public: false, author: "Admin", content: AlgorithmNegotiationService.getFlag() };



  @Get("/")
  public getPastes(@HeaderParams("Authorization") jwt: string): IPaste[] {
    let pastes = AlgorithmNegotiationController.PUBLIC_PASTES;

    try {
      const parsedJwt = AlgorithmNegotiationService.parseToken(jwt);
      const isAdmin = parsedJwt.payload.isAdmin as boolean;

      if (isAdmin)
        pastes = pastes.concat(AlgorithmNegotiationController.ADMIN_PASTE);

      return pastes;

    }
    catch (ex) {
      $log.error(ex);

      return pastes;
    }
  }



  @Post("/anonymousAccess")
  public requestAccess(): IAccessRequest {

    const jwt = AlgorithmNegotiationService.generateJWT("ANONYMOUSUSER");

    return { token: AlgorithmNegotiationService.JWTToString(jwt) };

  }


}