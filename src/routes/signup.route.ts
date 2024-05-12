import { SignupController } from "../controllers";
import { Router } from "express";
const signupController = new SignupController();
export const signupRouter =  Router()
signupRouter.route("/").post(signupController.postUser)