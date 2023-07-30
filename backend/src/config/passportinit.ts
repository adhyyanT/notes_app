import { NextFunction } from 'express';
import { PassportStatic } from 'passport';
import local from 'passport-local';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import passport from 'passport';

const LocalStrategy = local.Strategy;

const passportinit = () => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async function (
      email: string,
      password: string,
      done: any
    ) {
      try {
        const user = await User.findOne({ email })
          .select('+email')
          .select('+password');
        if (!user)
          return done(createHttpError(400, 'Invalid Credentials'), false);
        // console.log(user);
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch);
        if (!isMatch)
          return done(createHttpError(400, 'Invalid Credentials'), false);
        // console.log(user);
        return done(null, user);
      } catch (error) {
        console.log(error);
        done(createHttpError(500, 'Server Error'), false);
      }
    })
  );
  passport.serializeUser(function (user: any, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      console.log(error);
      done(createHttpError(500, 'Server Error'), false);
    }
  });
};

export { passportinit, passport };
