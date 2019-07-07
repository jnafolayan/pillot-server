import { Router } from 'express';
import { check } from 'express-validator';
import UserController from '../controllers/UserController';
import { verifyAuth, checkRequestErrors } from '../util';

const userRouter = new Router();

const userSignupCheck = [
  check('username').isString(), 
  check('password').isString().isLength({ min: 5 }), 
];
const userLoginCheck = [
  check('username').isString(), 
  check('password').isString() 
];

userRouter.post('/', userSignupCheck, checkRequestErrors, UserController.signupUser);
userRouter.post('/login', userLoginCheck, checkRequestErrors, UserController.loginUser);

export default userRouter;