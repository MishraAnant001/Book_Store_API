import { User } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { userTempInterface } from "../interfaces";
import { ApiResponse } from "../utils/API_Response";
import { ErrorCodes, SuccessCodes } from "../utils/Status_Code";
import { EnvError, LoginError, LoginSuccess, UserError } from "../utils/Messages";
import { ApiError } from "../utils/API_Error";

export class LoginService {
    async login(userdata: userTempInterface) {
        const data = await User.findOne({
            username: userdata.username
        })
        // console.log(data);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound,UserError.notFound)
        }
        let userCorrectPassword = data.password;
        // console.log(userCorrectPassword)
        const verify = await bcrypt.compare(userdata.password, userCorrectPassword)
        if (!verify) {
            throw new ApiError(ErrorCodes.unauthorized,LoginError.invalidPassword)
        } else {
            if (!process.env.SECRET_KEY) {
                throw new ApiError(ErrorCodes.internalServerError,EnvError.secretkey)
            } else {
                const token = jwt.sign({
                    id: data._id
                }, process.env.SECRET_KEY, {
                    expiresIn: "24h"
                });
                return new ApiResponse(SuccessCodes.ok,token,LoginSuccess.message)
            }
        }
    }
}