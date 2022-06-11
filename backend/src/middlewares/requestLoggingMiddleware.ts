import { NextFunction, Request, Response } from "express"

export const requestLoggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['content-type'] === 'application/json')
    console.log('\x1b[31m%s\x1b[0m', `${new Date().toISOString()}@${req.ip} ${req.method.toUpperCase()} ${req.url}`)
  next()
}
