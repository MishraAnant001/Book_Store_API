import mongoose from 'mongoose';
import Book from "../models/model.book";
import { BookTempInterface } from "../interfaces/interface.book";
import { IBook } from "../interfaces/interface.book";
import Author from '../models/model.author';
import { IAuthor } from '../interfaces/interface.author';
import { ICategory } from '../interfaces/interface.category';
import Category from '../models/model.category';

export class BookService {
    async getAllBooks(): Promise<any> {
        const data: IBook[] = await Book.find({}).select("title author category description price")
        if (data.length == 0) {
            return {
                success: false,
                msg: "No Book found"
            }
        }
        else {
            return {
                success: true,
                msg: `${data.length} Books found`,
                data: data
            }
        }
    }

    // async getBookByTitle(title: string): Promise<any> {
    //     const data: IBook | null = await Book.findOne({ title: title })
    //     // console.log(data)
    //     if (!data) {
    //         return {
    //             success: false,
    //             msg: "No book found"
    //         }
    //     }
    //     return {
    //         success: true,
    //         msg: "book fetched successfully",
    //         data: data
    //     }

    // }
    async getBookById(id: string): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid book id!"
            }
        }
        const data: IBook | null = await Book.findOne({ _id: id })
        // console.log(data)
        if (!data) {
            return {
                success: false,
                msg: "No book found"
            }
        }
        return {
            success: true,
            msg: "book fetched successfully",
            data: data
        }

    }

    // async postBook(bookdata: BookTempInterface): Promise<any> {
    //     const { title, author, category, ISBN, description, price } = bookdata;
    //     const userauthor: IAuthor | null = await Author.findOne({ name: author })
    //     if (!userauthor) {
    //         return {
    //             success: false,
    //             msg: "No such author found please create author!"
    //         }
    //     }
    //     const userCategory: ICategory | null = await Category.findOne({ name: category })
    //     if (!userCategory) {
    //         return {
    //             success: false,
    //             msg: "No such category found please create category!"
    //         }
    //     }
    //     const data: IBook = await Book.create({
    //         title: title,
    //         author: userauthor._id,
    //         category: userCategory._id,
    //         ISBN: ISBN,
    //         description: description,
    //         price: price
    //     })
    //     return {
    //         success: true,
    //         msg: "Book added successfully",
    //         data: data
    //     }
    // }
    async postBook(bookdata: BookTempInterface): Promise<any> {
        const { title, author, category, ISBN, description, price } = bookdata;
        const userauthor: IAuthor | null = await Author.findOne({ name: author })
        if (!userauthor) {
            return {
                success: false,
                msg: "No such author found please create author!"
            }
        }
        const userCategory: ICategory | null = await Category.findOne({ name: category })
        if (!userCategory) {
            return {
                success: false,
                msg: "No such category found please create category!"
            }
        }
        const data: IBook = await Book.create({
            title: title,
            author: author,
            category: category,
            ISBN: ISBN,
            description: description,
            price: price
        })
        return {
            success: true,
            msg: "Book added successfully",
            data: data
        }
    }
    async updateBookById(id:string,bookdata: BookTempInterface): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid book id!"
            }
        }
        const { title, author, category, ISBN, description, price } = bookdata;
        const userauthor: IAuthor | null = await Author.findOne({ name: author })
        if (!userauthor) {
            return {
                success: false,
                msg: "No such author found please create author!"
            }
        }
        const userCategory: ICategory | null = await Category.findOne({ name: category })
        if (!userCategory) {
            return {
                success: false,
                msg: "No such category found please create category!"
            }
        }
        const data: IBook | null = await Book.findByIdAndUpdate(id, {
            title: title,
            author: author,
            category: category,
            ISBN: ISBN,
            description: description,
            price: price
        })
        if (!data) {
            return {
                success: false,
                msg: "No book found"
            }
        }
        return {
            success: true,
            msg: "book updated successfully",
            data: data
        }
    }

    async deleteBook(id: string): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid book id!"
            }
        }
        const data: IBook | null = await Book.findByIdAndDelete({ _id: id })
        // console.log(data)
        if (!data) {
            return {
                success: false,
                msg: "No book found"
            }
        }
        return {
            success: true,
            msg: "book deleted successfully",
            data: data
        }

    }

}