import { Controller, Get, Post, BodyParams } from "@tsed/common";
import * as crypto from 'crypto';

interface LoginInterface {
  username: string;
  password: string;
}


@Controller("/md5")
export class HashesController {
  @Post("/login")
  public login(@BodyParams() body: any) {
    // https://crackstation.net/ - securepassword = b0439fae31f8cbba6294af86234d5a28
    if (body.username === "admin" && this.hashPassowrd(body.password) === "b0439fae31f8cbba6294af86234d5a28")
      return { success: true, flag: "c9d0ebbe-ced2-4a32-8e51-c1220a492cc0" };
    else
      return { success: false };
  }


  private hashPassowrd(password: string): string {
    return crypto.createHash('md5').update(password).digest("hex");
  }
}
