import { Request, Response } from "express";
import { BookService } from "../services";
import { BookTempInterface } from "../interfaces";
const bookService = new BookService();
import { ParsedQs } from "qs"
import { ErrorCodes } from "../utils/Status_Code";
import { BookError } from "../utils/Messages";
import { ApiError } from "../utils/API_Error";

export class BookController {
    async getAllBooksStatic(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const data = await bookService.getAllBooksStatic();
            return res.status(data.statusCode).json(data)

        } catch (error: any) {
            res.status(ErrorCodes.internalServerError).json({
                success: false,
                msg: `${BookError.multipleFetch} : ${error.message}`
            })
        }
    }
    async getAllBooks(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const filters: ParsedQs = req.query;
            const data = await bookService.getAllBooks(filters);
            return res.status(data.statusCode).json(data)

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
            }
            else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    msg: `${BookError.multipleFetch} : ${error.message}`
                })
            }
        }
    }

    async getBookById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data = await bookService.getBookById(id);
            return res.status(data.statusCode).json(data)
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
            }
            else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    msg: `${BookError.singleFetch} : ${error.message}`
                })
            }
        }

    }

    async postbook(req: Request, res: Response): Promise<any> {
        try {
            const { title, author, category, ISBN, description, price } = req.body;
            if (!title || !author || !category || !ISBN || !description || !price) {
                return res.json({
                    success: false,
                    msg: `Please provide value in request body!`
                })
            }

            const bookdata: BookTempInterface = {
                title: title,
                author: author,
                category: category,
                ISBN: ISBN,
                description: description,
                price: price
            }
            const data = await bookService.postBook(bookdata)
            return res.status(data.statusCode).json(data)
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
            }
            else if (error.code === 11000) {
                res.json({
                    success: false,
                    msg: BookError.isbnExists
                })
            }
            else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    msg: `${BookError.create} : ${error.message}`
                })
            }
        }

    }

    async updateBook(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { title, author, category, ISBN, description, price } = req.body;
            if (!title || !author || !category || !ISBN || !description || !price) {
                return res.json({
                    success: false,
                    msg: `Please provide value in request body!`
                })
            }

            const bookdata: BookTempInterface = {
                title: title,
                author: author,
                category: category,
                ISBN: ISBN,
                description: description,
                price: price
            }
            // console.log(id)
            const data = await bookService.updateBookById(id, bookdata)
            return res.status(data.statusCode).json(data)
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
            }
            else if (error.code === 11000) {
                res.json({
                    success: false,
                    msg: BookError.isbnExists
                })
            }
            else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    msg: `${BookError.update} : ${error.message}`
                })
            }
        }

    }
    async deleteBook(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data = await bookService.deleteBook(id)
            return res.status(data.statusCode).json(data)

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
            }
            else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    msg: `${BookError.delete} : ${error.message}`
                })
            }
        }

    }
}