import * as crypto from 'crypto';
import { ChallengeService } from './ChallengeService';

export interface JWT {
  header: Record<string, string | number | boolean>;
  payload: Record<string, string | number | boolean>;
  signature: string;
}

export class AlgorithmNegotiationService extends ChallengeService {

  private static JWT_SIGNING_KEY = "kd8ehais9)i3n!na";

  public static generateJWT(username: string, admin = false, timestamp = -1): JWT {

    if (timestamp === -1) {
      const oneYearFromNow = new Date();
      timestamp = oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    }

    const jwt: JWT = {
      header: { alg: "HS256", typ: "JWT" },
      payload: {
        sub: username,
        isAdmin: admin,
        iat: Math.round(timestamp / 1000)
      },
      signature: ""
    };

    jwt.signature = this.signJwt(jwt, AlgorithmNegotiationService.JWT_SIGNING_KEY);

    return jwt;
  }




  // https://medium.com/101-writeups/hacking-json-web-token-jwt-233fe6c862e6
  public static parseToken(jwt: string): JWT {
    let parts: any = jwt.split(".");

    parts = parts.map((p: string, i: number) => {
      return i === 2 ? p : JSON.parse(AlgorithmNegotiationService.fromBase64Url(p));
    });

    const parsedJWT: JWT = { header: parts[0], payload: parts[1], signature: parts[2] };

    switch (parsedJWT.header.alg) {
      case 'HS256':
        if (AlgorithmNegotiationService.signJwt(parsedJWT, AlgorithmNegotiationService.JWT_SIGNING_KEY) !== parsedJWT.signature)
          throw new Error("Invalid Signature");
        break;
      case 'none':
        break;
      default: throw new Error(`JWT PARSING: ${parts[0].alg} algorithm not supported yet`);

    }

    return parsedJWT;

  }

  public static JWTToString(jwt: JWT): string {
    const header = AlgorithmNegotiationService.toBase64URL(JSON.stringify(jwt.header));
    const payload = AlgorithmNegotiationService.toBase64URL(JSON.stringify(jwt.payload));
    // const signature = AlgorithmNegociationController.toBase64URL(JSON.stringify(jwt.signature));

    // jwt.signature is already in base64
    return `${header}.${payload}.${jwt.signature}`;
  }

  public static signJwt(jwt: JWT, signingKey: string): string {
    const header = AlgorithmNegotiationService.toBase64URL(JSON.stringify(jwt.header));
    const payload = AlgorithmNegotiationService.toBase64URL(JSON.stringify(jwt.payload));
    const toSign = `${header}.${payload}`;

    const signedBase64 = crypto.createHmac('sha256', signingKey).update(toSign).digest("base64");
    const signedbase64Url = AlgorithmNegotiationService.base64ToBase64Url(signedBase64);

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