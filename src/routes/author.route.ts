import { Router } from "express";
import { AuthorController } from "../controllers";
import { Authentication, Validation } from "../middlewares";
const validate = new Validation();
const authorController = new AuthorController();

export const authorRouter = Router()
const auth = new Authentication()
authorRouter.use(auth.authenticateUser)
authorRouter.route("/static").get(authorController.getAllAuthorsStatic)
authorRouter.route("/").get(authorController.getAllAuthors).post(validate.validateAuthor,authorController.postAuthor)
authorRouter.route("/:id").get(authorController.getAuthorById).put(validate.validateAuthor,authorController.updateAuthor).delete(authorController.deleteAuthor)