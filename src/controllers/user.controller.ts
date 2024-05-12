import { Request, Response } from "express";
import { UserService } from "../services";
import { userTempInterface } from "../interfaces";
const userService = new UserService();

export class UserController{
    async getAllUsers(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const data:Object = await userService.getAllUsers()
            return res.json(data)
            
        } catch (error: any) {
            res.json({
                success:false,
                msg: `Error while getting all users, ${error.message}`
            })
        }
    }

    async getUserById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data :Object = await userService.getUserById(id)
            return res.json(data);
        } catch (error: any) {
            res.json({
                success:false,
                msg: `Error while getting the user, ${error.message}`
            })
        }

    }

    async postUser(req: Request, res: Response): Promise<any> {
        try {
            const userdata: userTempInterface = {
                username: req.body.username,
                password: req.body.password
            }
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

    async updateUser(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const userdata: userTempInterface = {
                username: req.body.username,
                password: req.body.password
            }
            if(!userdata.username || !userdata.password){
                return res.json({
                    success: false,
                    msg: `Please provide value in request body!`
                })
            }
            // console.log(id)
            const data = await userService.updateUser(id,userdata)
            return res.json(data)
        } catch (error:any) {
            res.json({
                success:false,
                msg: `Error while updating the user, ${error.message}`
            })
        }
       
    }
    async deleteUser(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data = await userService.deleteUser(id)
            return res.json(data)

        } catch (error: any) {
            res.json({
                success:false,
                msg: `Error while deleting the user, ${error.message}`
            })
        }

    }
}