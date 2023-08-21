import express from 'express';
import { login, logout, register } from '../controllers/userController';
import { passport } from '../config/passport';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(passport.authenticate('local'), login);
router.route('/logout').post(logout);
export default router;
