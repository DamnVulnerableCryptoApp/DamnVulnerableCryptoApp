import { Err, IMiddlewareError, MiddlewareError, Next, Response } from "@tsed/common";
import { NextFunction as ExpressNext, Response as ExpressResponse } from "express";
import { $log } from "ts-log-debug";

@MiddlewareError()
export class ErrorHandlerMiddleware implements IMiddlewareError {

  use(@Err() error: any, @Response() response: ExpressResponse, @Next() next: ExpressNext): any {

    if (response.headersSent) {
      return next(error);
    }

    $log.error("" + error);
    response.status(error.status || 500).send({ data: "Internal Error. Check the application logs for more info" });

    return next();
  }
}