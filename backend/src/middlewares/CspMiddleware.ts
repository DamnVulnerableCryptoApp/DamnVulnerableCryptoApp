import { NextFunction, Request, Response } from 'express'

export const cspMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.setHeader("Content-Security-Policy", "default-src 'self'")
}
