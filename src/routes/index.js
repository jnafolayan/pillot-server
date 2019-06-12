import { Router } from 'express';

import userRouter from './userRouter';
import quizRouter from './quizRouter';
import sessionRouter from './sessionRouter';

export default function routes() {
  const router = Router();
  
  router.use('/users', userRouter);
  router.use('/quizzes', quizRouter);
  router.use('/sessions', sessionRouter);

  return router;
}