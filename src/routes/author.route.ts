import { Router } from "express";
import { AuthorController } from "../controllers";
import { Authentication } from "../middlewares";

const authorController = new AuthorController();

export const authorRouter = Router()
const auth = new Authentication()
authorRouter.use(auth.authenticateUser)
authorRouter.route("/static").get(authorController.getAllAuthorsStatic)
authorRouter.route("/").get(authorController.getAllAuthors).post(authorController.postAuthor)
authorRouter.route("/:id").get(authorController.getAuthorById).put(authorController.updateAuthor).delete(authorController.deleteAuthor)