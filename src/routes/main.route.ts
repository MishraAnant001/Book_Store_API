import express,{ Router } from "express";
import cookieParser from "cookie-parser";
import { userRouter,loginRouter,signupRouter,bookRouter,authorRouter,categoryRouter, logoutRouter} from "./index";

export const mainRouter = Router();

mainRouter.use(express.json());
mainRouter.use(cookieParser());

mainRouter.use("/api/v1/users",userRouter)
mainRouter.use("/api/v1/login",loginRouter)
mainRouter.use("/api/v1/signup",signupRouter)
mainRouter.use("/api/v1/books",bookRouter)
mainRouter.use("/api/v1/author",authorRouter)
mainRouter.use("/api/v1/category",categoryRouter)
mainRouter.use("/api/v1/logout", logoutRouter)
mainRouter.get("/",(req,res)=>{
  res.send('Welcome to Book store!')
})