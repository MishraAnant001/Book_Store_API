import { Router } from "express";
import { UserController } from "../controllers";
import { Authentication, Validation } from "../middlewares";
const validate = new Validation();
const userController = new UserController();

export const userRouter = Router()
const auth = new Authentication()
userRouter.use(auth.authenticateAdmin)
userRouter.route("/").get(userController.getAllUsers).post(validate.validateUser,userController.postUser)
userRouter.route("/:id").get(userController.getUserById).put(validate.validateUser,userController.updateUser).delete(userController.deleteUser)