import { NextFunction, Request, Response } from 'express';
import { isHttpError } from 'http-errors';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  let msg = 'Unkown error';
  let status = 500;
  if (isHttpError(err)) {
    msg = err.message;
    status = err.status;
  }
  res.status(status).json({ error: msg });
};
