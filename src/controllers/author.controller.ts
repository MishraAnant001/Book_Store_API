import { Request, Response } from "express";
import { AuthorService } from "../services";
import { authorTempInterface } from "../interfaces";
import {ParsedQs} from "qs"
import { ErrorCodes } from "../utils/Status_Code";
import { AuthorError } from "../utils/Messages";
import { ApiError } from "../utils/API_Error";
const authorService = new AuthorService();

export class AuthorController{
    async getAllAuthorsStatic(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const data = await authorService.getAllAuthorsStatic()
            return res.status(data.statusCode).json(data)
            
        } catch (error: any) {
            res.status(ErrorCodes.internalServerError).json({
                success: false,
                msg: `${AuthorError.multipleFetch} : ${error.message}`
            })
        }
    }
    async getAllAuthors(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const filters:ParsedQs = req.query;
            const data = await authorService.getAllAuthors(filters)
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
                    msg: `${AuthorError.multipleFetch} : ${error.message}`
                })
            }
        }
    }

    async getAuthorById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data  = await authorService.getAuthorById(id)
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
                    msg: `${AuthorError.singleFetch} : ${error.message}`
                })
            }
        }

    }

    async postAuthor(req: Request, res: Response): Promise<any> {
        try {
            const { name, biography, nationality } = req.body;
            // if(!name || !biography || !nationality){
            //     return res.json({
            //         success: false,
            //         msg: `Please provide value in request body!`
            //     })
            // }
            const authordata : authorTempInterface ={
                name:name,
                biography:biography,
                nationality:nationality
            }
            const data = await authorService.postAuthor(authordata)
            return res.status(data.statusCode).json(data)
        } catch (error:any){
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
            }
            else if (error.code === 11000) {
                res.json({
                    success: false,
                    msg: AuthorError.alreadyExists
                })
            }
            else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    msg: `${AuthorError.create} : ${error.message}`
                })
            }
        }
       
    }

    async updateAuthor(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { name, biography, nationality } = req.body;
            // if(!name || !biography || !nationality){
            //     return res.json({
            //         success: false,
            //         msg: `Please provide value in request body!`
            //     })
            // }
            const authordata : authorTempInterface ={
                name:name,
                biography:biography,
                nationality:nationality
            }
            // console.log(id)
            const data = await authorService.updateAuthorById(id, authordata)
            return res.status(data.statusCode).json(data)
        } catch (error:any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
            }
            else if (error.code === 11000) {
                res.json({
                    success: false,
                    msg: AuthorError.alreadyExists
                })
            }
            else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    msg: `${AuthorError.update} : ${error.message}`
                })
            }
        }
       
    }
    async deleteAuthor(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data = await authorService.deleteAuthor(id);
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
                    msg: `${AuthorError.delete} : ${error.message}`
                })
            }
        }

    }
}