import { ErrorRequestHandler } from 'express';
import { isHttpError } from 'http-errors';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('middleware->' + err);
  let msg = 'Unknow Server Error';
  let status = 500;
  if (isHttpError(err)) {
    msg = err.message;
    status = err.status;
  }
  return res.status(status).json({ error: msg });
};
