import { ErrorCodes } from "../utils/Status_Code";
import { authorSchema, bookSchema, userSchema } from "../Validators/data.validation";
import { Request,Response,NextFunction } from "express";

export class Validation{
    async validateUser(req:Request,res:Response,next:NextFunction):Promise<any>{
        try {
            await userSchema.validate(req.body)
            next()
        } catch (error:any) {
            res.status(ErrorCodes.badRequest).json({
                success:false,
                message:error.message
            })
        }
    }
    async validateBook(req:Request,res:Response,next:NextFunction):Promise<any>{
        try {
            await bookSchema.validate(req.body)
            next()
        } catch (error:any) {
            res.status(ErrorCodes.badRequest).json({
                success:false,
                message:error.message
            })
        }
    }
    async validateAuthor(req:Request,res:Response,next:NextFunction):Promise<any>{
        try {
            await authorSchema.validate(req.body)
            next()
        } catch (error:any) {
            res.status(ErrorCodes.badRequest).json({
                success:false,
                message:error.message
            })
        }
    }
}