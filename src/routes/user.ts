import express from "express";
import { getUserInfo } from "../controllers";

const userRouter = express.Router();

userRouter.get("/", getUserInfo);

export {
    userRouter
}