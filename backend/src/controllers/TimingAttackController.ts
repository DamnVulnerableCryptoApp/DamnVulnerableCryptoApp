import { TimingAttackService } from '../services/TimingAttackService'
import BaseController from './BaseController'

export interface ILoginRequest {
  username: string
  password: string
}

export interface IForgotPasswordRequest {
  username: string
}

export interface IForgotPasswordResponse {
  success: boolean
  flag: string
}

export interface ILoginResponse {
  success: boolean
}

export class TimingAttackController extends BaseController {

  public async index(): Promise<ILoginResponse> {
    const login: ILoginRequest = this.req.body
    const success = await TimingAttackService.checkLogin(login.username, login.password)

    return { success }
  }


  public async forgotPassword(): Promise<IForgotPasswordResponse> {
    const data: IForgotPasswordRequest = this.req.body
    const ver = await TimingAttackService.checkUsername(data.username)

    const response: IForgotPasswordResponse = { success: true, flag: ver ? TimingAttackService.getFlag() : "" }

    return response
  }

}