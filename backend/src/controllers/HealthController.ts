import BaseController from './BaseController'

export default class HealthController extends BaseController {
  public async index() {
    this.res.sendStatus(200)
  }
}