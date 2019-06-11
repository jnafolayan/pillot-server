import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = new Router();

userRouter.post('/', UserController.signupUser);
userRouter.post('/login', UserController.loginUser);

export default userRouter;