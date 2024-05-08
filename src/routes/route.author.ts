import { Router } from "express";
import { AuthorController } from "../controllers/controller.author";
import { Authentication } from "../middlewares/JWT_Auth.middleware";

const authorController = new AuthorController();

export const authorRouter = Router()
const auth = new Authentication()
authorRouter.use(auth.authenticateUser)
authorRouter.route("/").get(authorController.getAllAuthors).post(authorController.postAuthor)
authorRouter.route("/:id").get(authorController.getAuthorById).put(authorController.updateAuthor).delete(authorController.deleteAuthor)