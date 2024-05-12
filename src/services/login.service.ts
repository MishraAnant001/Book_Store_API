import { User } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { userTempInterface } from "../interfaces";

export class LoginService {
    async login(userdata: userTempInterface) {
        const data = await User.findOne({
            username: userdata.username
        })
        // console.log(data);
        if (!data) {
            return {
                success: false,
                msg: "No such user exists!"
            }
        }
        let userCorrectPassword = data.password;
        // console.log(userCorrectPassword)
        const verify = await bcrypt.compare(userdata.password, userCorrectPassword)
        if (!verify) {
            return {
                success: false,
                msg: "Invalid password!"
            }
        } else {
            if (!process.env.SECRET_KEY) {
                return {
                    success: false,
                    msg: "secret key is missing in .env file!"
                }
            } else {
                const token = jwt.sign({
                    id: data._id
                }, process.env.SECRET_KEY, {
                    expiresIn: "24h"
                });
                return {
                    success: true,
                    msg: "login successfull",
                    token: token
                }
            }
        }
    }
}