import { Router } from "express";
import { BookController } from "../controllers/controller.book";
import { Authentication } from "../middlewares/JWT_Auth.middleware";

const bookController = new BookController();

export const bookRouter = Router()
const auth = new Authentication()
bookRouter.use(auth.authenticateUser)
bookRouter.route("/static").get(bookController.getAllBooksStatic)
bookRouter.route("/").get(bookController.getAllBooks).post(bookController.postbook)
bookRouter.route("/:id").get(bookController.getBookById).put(bookController.updateBook).delete(bookController.deleteBook)