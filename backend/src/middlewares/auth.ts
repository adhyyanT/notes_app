import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

const auth: RequestHandler = (req, res, next) => {
  if (req.user !== null && req.user !== undefined) next();
  else {
    // console.log('req.user');
    throw createHttpError(401, 'User not authorized');
    // res.redirect('http://localhost:5173');
  }
};
export default auth;
