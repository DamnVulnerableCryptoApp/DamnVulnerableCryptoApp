import { NextFunction, Request, Response } from 'express'

export const errorHandlingMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.debug(err.stack)
  res.status(500).send('Something broke!')
}
