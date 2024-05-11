import { Router } from "express";
import { UserController } from "../controllers/controller.user";
import { Authentication } from "../middlewares/JWT_Auth.middleware";

const userController = new UserController();

export const userRouter = Router()
const auth = new Authentication()
userRouter.use(auth.authenticateAdmin)
userRouter.route("/").get(userController.getAllUsers).post(userController.postUser)
userRouter.route("/:id").get(userController.getUserById).put(userController.updateUser).delete(userController.deleteUser)