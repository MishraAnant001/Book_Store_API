import { Request, Response } from "express";
import { BookService } from "../services/service.book";
import { BookTempInterface } from "../interfaces/interface.book";
const bookService = new BookService();
import {ParsedQs} from "qs"

export class BookController {
    async getAllBooksStatic(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const data: Object = await bookService.getAllBooksStatic();
            return res.json(data)

        } catch (error: any) {
            res.json({
                success: false,
                msg: `Error while getting all books, ${error.message}`
            })
        }
    }
    async getAllBooks(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const filters:ParsedQs = req.query;
            const data: Object = await bookService.getAllBooks(filters);
            return res.json(data)

        } catch (error: any) {
            res.json({
                success: false,
                msg: `Error while getting all books, ${error.message}`
            })
        }
    }

    async getBookById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data: Object = await bookService.getBookById(id);
            return res.json(data);
        } catch (error: any) {
            res.json({
                success: false,
                msg: `Error while getting the book, ${error.message}`
            })
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
            return res.json(data);
        } catch (error: any) {
            if (error.code === 11000) {
                res.json({
                    success: false,
                    msg: `ISBN already exists or title with author already exists!`
                })
            }
            else {

                res.json({
                    success: false,
                    msg: `Error while adding the book, ${error.message}`
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
            const data = await bookService.updateBookById(id,bookdata)
            return res.json(data)
        } catch (error: any) {
            if (error.code === 11000) {
                res.json({
                    success: false,
                    msg: `ISBN already exists or title with author already exists!`
                })
            }
            else {

                res.json({
                    success: false,
                    msg: `Error while updating the book, ${error.message}`
                })
            }
        }

    }
    async deleteBook(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data = await bookService.deleteBook(id)
            return res.json(data)

        } catch (error: any) {
            res.json({
                success: false,
                msg: `Error while deleting the book, ${error.message}`
            })
        }

    }
}