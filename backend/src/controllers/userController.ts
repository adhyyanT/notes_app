import { RequestHandler } from 'express';
import { createUser, findUserByEmail } from '../config/database';
import bcrypt from 'bcrypt';
import { LoginReq, RegisterReq } from '../types';
import createHttpError from 'http-errors';

export const register: RequestHandler<
  unknown,
  unknown,
  RegisterReq,
  unknown
> = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!email) return next(createHttpError(400, 'Email is required'));
    if (!username) return next(createHttpError(400, 'username is required'));
    if (!password) return next(createHttpError(400, 'password is required'));
    const ans = await findUserByEmail(email);
    if (ans) return res.status(400).send('email already exists. Please login.');
    const user = await createUser(username, email, password);
    if (!user) return;
    req.login(user, (err) => {
      if (err) console.log(err);
    });
    req.session.user = user.id;
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  LoginReq,
  unknown
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return next(createHttpError(400, 'User not found'));
    // const isMatch = bcrypt.compare(password, user.password);
    // if (!isMatch) return;
    req.session.user = user.id;
    return res.status(200).json({ sigin: true });
  } catch (error) {
    console.log(error);
  }
};
export const logout: RequestHandler = async (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    req.session.user = undefined;
    return res.sendStatus(200);
  });
};
