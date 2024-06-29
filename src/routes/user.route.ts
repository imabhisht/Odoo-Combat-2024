// User Route

import { Router } from 'express';
import { getUserInfo, createUser } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares';

const userRouter = Router();

userRouter.get('/user/:id',  authenticateToken, getUserInfo);
userRouter.post('/user', authenticateToken, createUser);

export default userRouter;