import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

const auth: RequestHandler = (req, res, next) => {
  try {
    if (!req.session.user)
      return next(createHttpError(401, 'User not authorized'));
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export default auth;
