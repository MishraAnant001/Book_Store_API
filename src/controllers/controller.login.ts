import { userTempInterface } from "../interfaces/interface.user";
import { LoginService } from "../services/service.login";
import { Request, Response } from "express";
const loginService = new LoginService();

export class LoginController {
    async loginUser(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const userdata:userTempInterface = req.body;
            if(!userdata){
                return res.json({
                    success: false,
                    msg: `Please provide value in request body!`
                })
            }
            const data = await loginService.login(userdata);
            if(data.success==false){
                return res.json(data)
            }else{
                const token = data.token
                // console.log(userdata)
                if(userdata.username=="admin"){
                    // console.log("creating admin token")
                    res.cookie("admintoken",token)
                }else{
                    // console.log("creating user token")
                    res.cookie("usertoken",token)
                }
                return res.json(data)
            }
        } catch (error: any) {
            res.json({
                success:false,
                msg: `Error while logging in..., ${error.message}`
            })
        }
    }
}