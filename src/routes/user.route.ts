import express from "express";
import { getUserInfo } from "../controllers";
import { authenticateToken } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/", authenticateToken, getUserInfo);

export { userRouter };
