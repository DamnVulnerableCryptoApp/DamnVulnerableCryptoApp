import { Request, Response } from "express"

export default class BaseController {

  protected req: Request
  protected res: Response
  protected action: string

  public constructor(req: Request, res: Response, action: string) {
    this.req = req
    this.res = res
    this.action = action
  }

  protected getHeader(header: string): string {
    const h = this.req.header(header)

    return Array.isArray(h) ? h[0] : h || ""
  }

  protected getQueryParam(param: string): string {
    const p = this.req.query[param]

    return p as string
  }

  // this can be overridden by extended controllers to use async after a constructor
  // if returns false, the endpoint function doesn't get called, but the return message should be handled in the method
  // you can also implement logic here
  protected async beforeAction(): Promise<boolean> {
    return true
  }
}