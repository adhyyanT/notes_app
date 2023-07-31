import 'dotenv/config';
import express, { Request, Response } from 'express';
import { connectDB } from './config/connectdb';
import noteRoute from './routes/note';
import { errorHandler } from './middlewares/errorHandler';
import morgan from 'morgan';
import createHttpError from 'http-errors';
import cors from 'cors';
import session from 'express-session';

import cookieParser from 'cookie-parser';
import { passportinit, passport } from './config/passportinit';
import userRoute from './routes/user';
import MongoStore from 'connect-mongo';
import auth from './middlewares/auth';
import path from 'path';
const app = express();

/*
 * Middle wares goes here
 */
app.use(
  cors({
    origin: process.env.frontend,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
    allowedHeaders: 'Content-type',
    // methods:'*',
  })
);
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.use(express.json());
app.use(morgan('combined'));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.secret!,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: false,
      // sameSite: 'none',
      secure: true,
      sameSite: 'none',
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.mongo_uri,
    }),
  })
);
passportinit();
app.use(cookieParser(process.env.secret!));
app.use(passport.initialize());
app.use(passport.session());

/*
 * All Routes goes here
 */
app.use('/users', userRoute);
app.use(auth);
app.use('/notes', noteRoute);
app.get('/*', function (req, res) {
  res.sendFile(
    path.join(__dirname.replace('backend', 'client/'), 'index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
/*
 ** Error Handler
 */
app.use((req, res, next) => {
  next(createHttpError(404, 'Page not found'));
});
app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.port, () => {
    console.log(`Server started on ${process.env.port}`);
  });
});
