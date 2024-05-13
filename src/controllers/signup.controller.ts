import { Request, Response } from "express";
import { UserService } from "../services";
import { userTempInterface } from "../interfaces";
import { UserError } from "../utils/Messages";
const userService = new UserService();

export class SignupController {
    async postUser(req: Request, res: Response): Promise<any> {
        try {
            const userdata: userTempInterface = {
                username: req.body.username,
                password: req.body.password
            }
            // console.log(userdata)
            // if(!userdata.username || !userdata.password){
            //     return res.json({
            //         success: false,
            //         msg: `Please provide value in request body!`
            //     })
            // }
            const data = await userService.postUser(userdata)
            return res.status(data.statusCode).json(data);
        } catch (error:any){
            if(error.code ===11000){
                res.json({
                    success:false,
                    msg: UserError.alreadyExists
                }) 
            }
            else{
                res.json({
                    success:false,
                    msg: `${UserError.register}, ${error.message}`
                })
            }
        }
       
    }
}