import { Router } from 'express';

import userRouter from './userRouter';
import quizRouter from './quizRouter';

export default function routes(app) {
  const router = Router();
  
  app.use('/users', userRouter);
  app.use('/quiz', quizRouter);

  return router;
}