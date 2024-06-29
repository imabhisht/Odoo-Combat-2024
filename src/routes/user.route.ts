// User Route

import { Router } from 'express';
import { getUserInfo, createUser } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares';

const userRouter = Router();

userRouter.get('/',  authenticateToken, getUserInfo);
userRouter.post('/', authenticateToken, createUser);

export default userRouter;