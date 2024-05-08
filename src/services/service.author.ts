import mongoose from 'mongoose';
import { authorTempInterface } from '../interfaces/interface.author';
import Author from '../models/model.author';
import { IAuthor } from '../interfaces/interface.author';

export class AuthorService {
    async getAllAuthors(): Promise<any> {
        const data: IAuthor[] = await Author.find({})
        if (data.length == 0) {
            return {
                success: false,
                msg: "No Author found"
            }
        }
        else {
            return {
                success: true,
                msg: `${data.length} Authors found`,
                data: data
            }
        }
    }

    async getAuthorById(id: string): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid author id!"
            }
        }
        const data: IAuthor | null = await Author.findOne({ _id: id })
        // console.log(data)
        if (!data) {
            return {
                success: false,
                msg: "No author found"
            }
        }
        return {
            success: true,
            msg: "author fetched successfully",
            data: data
        }

    }

    async postAuthor(authordata: authorTempInterface): Promise<any> {
        const { name, biography, nationality } = authordata;
        const data: IAuthor = await Author.create({
            name: name,
            biography: biography,
            nationality: nationality
        })
        return {
            success: true,
            msg: "author added successfully",
            data: data
        }
    }
    async updateAuthorById(id: string, authordata: authorTempInterface): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid author id!"
            }
        }
        const { name, biography, nationality } = authordata;
        const data: IAuthor | null = await Author.findByIdAndUpdate(id, {
            name: name,
            biography: biography,
            nationality: nationality
        })
        if (!data) {
            return {
                success: false,
                msg: "No author found"
            }
        }
        return {
            success: true,
            msg: "author updated successfully",
            data: data
        }
    }

    async deleteAuthor(id: string): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid author id!"
            }
        }
        const data: IAuthor | null = await Author.findByIdAndDelete({ _id: id })
        // console.log(data)
        if (!data) {
            return {
                success: false,
                msg: "No author found"
            }
        }
        return {
            success: true,
            msg: "author deleted successfully",
            data: data
        }

    }

}