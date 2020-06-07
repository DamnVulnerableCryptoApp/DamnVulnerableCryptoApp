import { BodyParams, Controller, Post } from "@tsed/common";
import * as crypto from 'crypto';

interface ILogin {
  username: string;
  password: string;
}

interface ICheckResponse {
  success: boolean;
  flag: string;
}


@Controller("/md5")
export class HashesController {
  @Post("/login")
  public login(@BodyParams() body: ILogin): ICheckResponse {
    // https://crackstation.net/ - securepassword = b0439fae31f8cbba6294af86234d5a28
    if (body.username === "admin" && this.hashPassword(body.password) === "b0439fae31f8cbba6294af86234d5a28")
      return { success: true, flag: "c9d0ebbe-ced2-4a32-8e51-c1220a492cc0" };
    else
      return { success: false, flag: "" };
  }


  private hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest("hex");
  }
}
