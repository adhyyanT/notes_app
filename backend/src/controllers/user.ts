import { RequestHandler } from 'express';

import User from '../models/user';
import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';

interface RegisterReq {
  email?: string;
  username?: string;
  password?: string;
}

export const register: RequestHandler<
  unknown,
  unknown,
  RegisterReq,
  unknown
> = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    if (!email) return createHttpError(400, 'Email is required');
    if (!username) return createHttpError(400, 'username is required');
    if (!password) return createHttpError(400, 'password is required');

    let user = await User.findOne({ username });
    if (user) return res.status(400).send('Username already taken');
    user = null;
    user = await User.findOne({ email });
    if (user)
      return res.status(400).send('email already exists. Please login.');
    const newUser = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
      email,
    });
    req.session.user = username;
    return res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    return next(error);
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
