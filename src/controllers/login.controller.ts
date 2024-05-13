import { userTempInterface } from "../interfaces";
import { LoginService } from "../services";
import { Request, Response } from "express";
import { ErrorCodes } from "../utils/Status_Code";
import { ApiError } from "../utils/API_Error";
import { LoginError } from "../utils/Messages";
const loginService = new LoginService();

export class LoginController {
    async loginUser(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            // console.log(req)
            const userdata:userTempInterface = req.body;
            // if(!userdata){
            //     return res.json({
            //         success: false,
            //         msg: `Please provide value in request body!`
            //     })
            // }
            const data = await loginService.login(userdata);
                const token = data.data
                // console.log(userdata)
                if(userdata.username=="admin"){
                    // console.log("creating admin token")
                    res.cookie("admintoken",token)
                }else{
                    // console.log("creating user token")
                    res.cookie("usertoken",token)
                }
                return res.json(data)
        } catch (error: any) {
            if(error instanceof ApiError){
                res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                });
            }
            else{
                res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    msg:`${LoginError.message} : ${error.message}`
                })
            }
        }
    }
}