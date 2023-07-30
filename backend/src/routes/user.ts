import express from 'express';
import createHttpError from 'http-errors';

import { passport } from '../config/passportinit';
import { register, logout } from '../controllers/user';
import user from '../models/user';

const router = express.Router();
router
  .route('/login')
  .post(passport.authenticate('local'), async (req, res, next) => {
    try {
      const op = await user.findOne({ email: req.body.email });
      if (!op) throw createHttpError(400, 'User not found');
      req.session.user = op.username;
      res.status(201).json({ sigin: true });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

router.route('/register').post(register);
router.route('/logout').post(logout);
export default router;
