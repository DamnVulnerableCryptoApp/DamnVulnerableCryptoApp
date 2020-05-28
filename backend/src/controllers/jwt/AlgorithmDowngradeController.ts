
import { Controller, Get, HeaderParams, Post } from '@tsed/common';
import * as crypto from 'crypto';


interface JWT {
  header: Record<string, string | number | boolean>;
  payload: Record<string, string | number | boolean>;
  signature: string;
}


interface IPaste {
  content: string;
  author: string;
  public: boolean;
}

@Controller("/jwt/downgrade")
export class AlgorithmDowngradeController {


  private static JWT_SIGNING_KEY = "kd8ehais9)i3n!na";
  private static FLAG = "1adc2fea-ed42-4e70-808e-c201cae5d17b";


  private static PUBLIC_PASTES: IPaste[] = [
    { public: true, author: "FakeG0s7", content: 'Irure dolore deserunt in aliqua ex sunt qui proident sit ut incididunt culpa anim eiusmod ea eiusmod eiusmod enim excepteur aute quis pariatur consequat ad ea ad non aute aute consequat culpa est qui ullamco fugiat est culpa.' },
    { public: true, author: "Anon7!92", content: 'Aute sint culpa irure laboris id ea in qui dolor laboris commodo ullamco ullamco in sunt velit cupidatat consectetur sunt dolor ad fugiat ut cillum tempor proident.' }
  ];

  private static ADMIN_PASTE: IPaste = { public: false, author: "Anon7!92", content: AlgorithmDowngradeController.FLAG };



  @Get("/")
  public getPastes(@HeaderParams("Authorization") jwt: string): IPaste[] {
    const pastes = AlgorithmDowngradeController.PUBLIC_PASTES;

    try {
      const parsedJwt = AlgorithmDowngradeController.parseToken(jwt);
      const isAdmin = parsedJwt.payload.isAdmin as boolean;

      if (isAdmin)
        pastes.push(AlgorithmDowngradeController.ADMIN_PASTE);

      return pastes;

    }
    catch (ex) {
      console.error(ex);

      return pastes;
    }
  }



  @Post("/anonymousAccess")
  public requestAccess() {

    const jwt = AlgorithmDowngradeController.generateJWT("ANONYMOUSUSER");

    return { token: AlgorithmDowngradeController.JWTToString(jwt) };

  }

  public static generateJWT(username: string): JWT {
    const oneYearFromNow = new Date();
    const timestamp = oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    const jwt: JWT = {
      header: { alg: "HS256", typ: "JWT" },
      payload: {
        sub: username,
        isAdmin: false,
        iat: Math.round(timestamp / 1000)
      },
      signature: ""
    };

    jwt.signature = this.signJwt(jwt, AlgorithmDowngradeController.JWT_SIGNING_KEY);

    return jwt;
  }




  // https://medium.com/101-writeups/hacking-json-web-token-jwt-233fe6c862e6
  public static parseToken(jwt: string): JWT {
    let parts: any = jwt.split(".");

    parts = parts.map((p: string, i: number) => {
      return i === 2 ? p : JSON.parse(AlgorithmDowngradeController.fromBase64Url(p));
    });

    const parsedJWT: JWT = { header: parts[0], payload: parts[1], signature: parts[2] };

    switch (parsedJWT.header.alg) {
      case 'HS256':
        if (AlgorithmDowngradeController.signJwt(parsedJWT, AlgorithmDowngradeController.JWT_SIGNING_KEY) !== parsedJWT.signature)
          throw new Error("Invalid Signature");
        break;
      case 'none':
        break;
      default: throw new Error(`JWT PARSING: ${parts[0].alg} algorithm not supported yet`);

    }

    return parsedJWT;

  }

  private static JWTToString(jwt: JWT): string {
    const header = AlgorithmDowngradeController.toBase64URL(JSON.stringify(jwt.header));
    const payload = AlgorithmDowngradeController.toBase64URL(JSON.stringify(jwt.payload));
    // const signature = AlgorithmDowngradeController.toBase64URL(JSON.stringify(jwt.signature));

    // jwt.signature is already in base64
    return `${header}.${payload}.${jwt.signature}`;
  }

  private static signJwt(jwt: JWT, signingKey: string): string {
    const header = AlgorithmDowngradeController.toBase64URL(JSON.stringify(jwt.header));
    const payload = AlgorithmDowngradeController.toBase64URL(JSON.stringify(jwt.payload));
    const toSign = `${header}.${payload}`;

    const signedBase64 = crypto.createHmac('sha256', signingKey).update(toSign).digest("base64");
    const signedbase64Url = AlgorithmDowngradeController.base64ToBase64Url(signedBase64);

    return signedbase64Url;
  }



  private static base64ToBase64Url(content: string): string {
    return content.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

  }

  private static toBase64URL(content: string): string {
    content = this.toBase64(content);

    return this.base64ToBase64Url(content);
  }


  private static fromBase64Url(content: string): string {

    content = content.replace(/-/g, "+").replace(/_/g, "/");

    const r = content.length % 4;
    content += "=".repeat((4 - r) % 4);

    content = this.fromBase64(content);

    return content;
  }

  private static toBase64(content: string) {
    return Buffer.from(content).toString('base64');
  }

  private static fromBase64(content: string) {
    return Buffer.from(content, 'base64').toString();
  }
}