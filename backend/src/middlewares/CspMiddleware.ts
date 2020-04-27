import { IMiddleware, Middleware, Req, Res } from "@tsed/common";

@Middleware()
export class CspMiddleware implements IMiddleware {
  use(@Req() request: Req, @Res() response: Res) {
    response.setHeader("Content-Security-Policy", "default-src 'self'");

  }
}