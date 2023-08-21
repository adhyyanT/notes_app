import local from 'passport-local';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import passport from 'passport';
import { findUserByEmail, findUserById } from './database';

const LocalStrategy = local.Strategy;

const passportinit = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async function (email: string, password: string, done: any) {
        try {
          //   console.log(email);
          //   console.log(password);
          const user = await findUserByEmail(email);
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
      }
    )
  );
  passport.serializeUser(function (user: any, done) {
    // console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(async function (id: string, done) {
    try {
      const user = await findUserById(id);
      done(null, user);
    } catch (error) {
      console.log(error);
      done(createHttpError(500, 'Server Error'), false);
    }
  });
};

export { passport, passportinit };
