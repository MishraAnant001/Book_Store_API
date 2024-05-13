import { Router } from "express";
import { LoginController } from "../controllers";
import { Validation } from "../middlewares";
const loginContoller = new LoginController();
const validate = new Validation();
export const loginRouter = Router();
loginRouter.route("/").post(validate.validateUser,loginContoller.loginUser);