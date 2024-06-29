import express from "express";
import { getUserInfo, createUser } from "../controllers";
import { authenticateToken } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/", authenticateToken ,getUserInfo);

userRouter.post("/", authenticateToken ,createUser);

export {
    userRouter,
}