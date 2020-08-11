import { BodyParams, Controller, Post } from '@tsed/common';
import { TimingAttackService } from '../services/TimingAttackService';

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IForgotPasswordRequest {
  username: string;
}

export interface IForgotPasswordResponse {
  success: boolean;
  flag: string;
}

export interface ILoginResponse {
  success: boolean;
}

@Controller("/timing-attack")
export class TimingAttackController {

  @Post("/login")
  public async index(@BodyParams() login: ILoginRequest): Promise<ILoginResponse> {
    const success = await TimingAttackService.checkLogin(login.username, login.password);

    return { success };
  }

  @Post("/forgot-password")
  public async forgotPassword(@BodyParams() data: IForgotPasswordRequest): Promise<IForgotPasswordResponse> {
    const ver = await TimingAttackService.checkUsername(data.username);

    const response: IForgotPasswordResponse = { success: true, flag: ver ? TimingAttackService.getFlag() : "" };

    return response;
  }

}