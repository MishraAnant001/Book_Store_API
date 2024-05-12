import { Router } from "express";
import { LoginController } from "../controllers";
const loginContoller = new LoginController();
export const loginRouter = Router();
loginRouter.route("/").post(loginContoller.loginUser);