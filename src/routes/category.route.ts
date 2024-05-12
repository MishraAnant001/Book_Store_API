import { CategoryController } from "../controllers";
import { Authentication } from "../middlewares";
import { Router } from "express";

const categoryController = new CategoryController();

export const categoryRouter = Router()
const auth = new Authentication()

categoryRouter.use(auth.authenticateUser)
categoryRouter.route("/static").get(categoryController.getAllCategoriesStatic)
categoryRouter.route("/").get(categoryController.getAllCategories).post(categoryController.postCategory).put(categoryController.updateCategoryByName).delete(categoryController.deleteCateogryByName)
categoryRouter.route("/specific").get(categoryController.getCategoryByName)