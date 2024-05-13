import { Router } from "express";
import { BookController } from "../controllers";
import { Authentication, Validation } from "../middlewares";

const bookController = new BookController();
const validate = new Validation();
export const bookRouter = Router()
const auth = new Authentication()
bookRouter.use(auth.authenticateUser)
bookRouter.route("/static").get(bookController.getAllBooksStatic)
bookRouter.route("/").get(bookController.getAllBooks).post(validate.validateBook,bookController.postbook)
bookRouter.route("/:id").get(bookController.getBookById).put(validate.validateBook,bookController.updateBook).delete(bookController.deleteBook)