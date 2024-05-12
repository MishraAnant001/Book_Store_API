import { Request, Response } from "express";
import { AuthorService } from "../services";
import { authorTempInterface } from "../interfaces";
import {ParsedQs} from "qs"
const authorService = new AuthorService();

export class AuthorController{
    async getAllAuthorsStatic(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const data:Object = await authorService.getAllAuthorsStatic()
            return res.json(data)
            
        } catch (error: any) {
            res.json({
                success:false,
                msg: `Error while getting all authors, ${error.message}`
            })
        }
    }
    async getAllAuthors(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const filters:ParsedQs = req.query;
            const data:Object = await authorService.getAllAuthors(filters)
            return res.json(data)
            
        } catch (error: any) {
            res.json({
                success:false,
                msg: `Error while getting all authors, ${error.message}`
            })
        }
    }

    async getAuthorById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data :Object = await authorService.getAuthorById(id)
            return res.json(data);
        } catch (error: any) {
            res.json({
                success:false,
                msg: `Error while getting the authors, ${error.message}`
            })
        }

    }

    async postAuthor(req: Request, res: Response): Promise<any> {
        try {
            const { name, biography, nationality } = req.body;
            if(!name || !biography || !nationality){
                return res.json({
                    success: false,
                    msg: `Please provide value in request body!`
                })
            }
            const authordata : authorTempInterface ={
                name:name,
                biography:biography,
                nationality:nationality
            }
            const data = await authorService.postAuthor(authordata)
            return res.json(data);
        } catch (error:any){
            if(error.code ===11000){
                res.json({
                    success:false,
                    msg: `Author already exists!`
                }) 
            }
            else{

                res.json({
                    success:false,
                    msg: `Error while adding the author, ${error.message}`
                })
            }
        }
       
    }

    async updateAuthor(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { name, biography, nationality } = req.body;
            if(!name || !biography || !nationality){
                return res.json({
                    success: false,
                    msg: `Please provide value in request body!`
                })
            }
            const authordata : authorTempInterface ={
                name:name,
                biography:biography,
                nationality:nationality
            }
            // console.log(id)
            const data = await authorService.updateAuthorById(id, authordata)
            return res.json(data)
        } catch (error:any) {
            res.json({
                success:false,
                msg: `Error while updating the author, ${error.message}`
            })
        }
       
    }
    async deleteAuthor(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data = await authorService.deleteAuthor(id);
            return res.json(data)

        } catch (error: any) {
            res.json({
                success:false,
                msg: `Error while deleting the author, ${error.message}`
            })
        }

    }
}