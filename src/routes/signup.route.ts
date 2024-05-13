import { SignupController } from "../controllers";
import { Router } from "express";
import { Validation } from "../middlewares";
const validate = new Validation();
const signupController = new SignupController();
export const signupRouter =  Router()
signupRouter.route("/").post(validate.validateUser,signupController.postUser)