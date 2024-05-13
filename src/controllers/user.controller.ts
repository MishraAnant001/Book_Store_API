import { Request, Response } from "express";
import { UserService } from "../services";
import { userTempInterface } from "../interfaces";
import { ApiResponse } from "../utils/API_Response";
import { ApiError } from "../utils/API_Error";
import { ErrorCodes } from "../utils/Status_Code";
import { UserError } from "../utils/Messages";
const userService = new UserService();

export class UserController {
    async getAllUsers(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const data: ApiResponse = await userService.getAllUsers()
            return res.status(data.statusCode).json(data)

        } catch (error: any) {
            res.status(ErrorCodes.internalServerError).json({
                success: false,
                msg: `${UserError.multipleFetch} : ${error.message}`
            })
        }
    }

    async getUserById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data = await userService.getUserById(id)
            return res.status(data.statusCode).json(data);
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
                    msg: `${UserError.singleFetch} : ${error.message}`
                })
            }
        }
    }

    async postUser(req: Request, res: Response): Promise<any> {
        try {
            const userdata: userTempInterface = {
                username: req.body.username,
                password: req.body.password
            }
            // if (!userdata.username || !userdata.password) {
            //     return res.json({
            //         success: false,
            //         msg: `Please provide value in request body!`
            //     })
            // }
            const data = await userService.postUser(userdata)
            return res.status(data.statusCode).json(data);
        } catch (error: any) {
            if (error.code === 11000) {
                res.json({
                    success: false,
                    msg: UserError.alreadyExists
                })
            }
            else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    msg: `${UserError.register}: ${error.message}`
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
            // if (!userdata.username || !userdata.password) {
            //     return res.json({
            //         success: false,
            //         msg: `Please provide value in request body!`
            //     })
            // }
            // console.log(id)
            const data = await userService.updateUser(id, userdata)
            return res.status(data.statusCode).json(data);
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
                    msg: `${UserError.update} : ${error.message}`
                })
            }
        }

    }
    async deleteUser(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            // console.log(id)
            const data = await userService.deleteUser(id)
            return res.status(data.statusCode).json(data);

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
                    msg: `${UserError.delete} : ${error.message}`
                })
            }
        }

    }
}