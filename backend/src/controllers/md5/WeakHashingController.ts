import { BodyParams, Controller, Post } from "@tsed/common";
import { WeakHashingService } from '../../services/WeakHashingService';


export interface ILogin {
  username: string;
  password: string;
}

export interface ICheckResponse {
  success: boolean;
  flag: string;
}


@Controller("/md5")
export class WeakHashingController {

  @Post("/login")
  public login(@BodyParams() body: ILogin): ICheckResponse {
    // https://crackstation.net/ - securepassword = b0439fae31f8cbba6294af86234d5a28

    if (body.username === "admin" && WeakHashingService.hashPassowrd(body.password) === WeakHashingService.ADMIN_PASSWORD_HASHED)
      return { success: true, flag: WeakHashingService.FLAG };
    else
      return { success: false, flag: "" };
  }



}
