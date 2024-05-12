import { Request, Response } from "express";
import { UserService } from "../services";
import { userTempInterface } from "../interfaces";
const userService = new UserService();

export class SignupController {
    async postUser(req: Request, res: Response): Promise<any> {
        try {
            const userdata: userTempInterface = {
                username: req.body.username,
                password: req.body.password
            }
            // console.log(userdata)
            if(!userdata.username || !userdata.password){
                return res.json({
                    success: false,
                    msg: `Please provide value in request body!`
                })
            }
            const data = await userService.postUser(userdata)
            return res.json(data);
        } catch (error:any){
            if(error.code ===11000){
                res.json({
                    success:false,
                    msg: `User already exists!`
                }) 
            }
            else{

                res.json({
                    success:false,
                    msg: `Error while registering the user, ${error.message}`
                })
            }
        }
       
    }
}