import express, { urlencoded } from 'express';
import { createPool, createUser, findUserByEmail } from './config/database';
import session from 'express-session';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { passportinit, passport } from './config/passport';
import pgSimple from 'connect-pg-simple';
import { Pool } from 'pg';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';
import createHttpError from 'http-errors';
import notesRoute from './routes/notesRoute';
import auth from './middleware/auth';
const pgSession = pgSimple(session);

const app = express();
const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  user: process.env.PGUSER,
  port: parseInt(process.env.PGPORT!),
  ssl: true,
});

app.use(
  cors({
    origin: [process.env.frontend!, process.env.backend!],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: 'Content-type',
  })
);
app.use(morgan('combined'));
app.use(express.json());

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.secret!,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: false, //to work on localhost disable this
      secure: true, // this too
      sameSite: 'none', // this as well
    },
    rolling: true,
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
  })
);
app.use(cookieParser(process.env.secret!));
app.set('trust proxy', 1);

passportinit();
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);
app.use(auth);
app.use('/notes', notesRoute);

app.use((req, res, next) => {
  next(createHttpError(404, 'Page not found'));
});
app.use(errorHandler);

createPool().then(() => {
  app.listen(5000, () => {
    console.log(`server started on ${process.env.backend}`);
  });
});
