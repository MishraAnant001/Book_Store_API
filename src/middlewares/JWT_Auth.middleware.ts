import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";

export class Authentication {
    async authenticateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        // console.log("user middleware")
        try {
            const { usertoken } = req.cookies
            // console.log(tokens)
            if (usertoken != null) {
                // console.log(token)
                if (!process.env.SECRET_KEY) {
                    return res.json({
                        success: false,
                        msg: "secret key is missing in .env file!"
                    })
                }
                const decode = jwt.verify(usertoken, process.env.SECRET_KEY);
                next()
            }
            else {
                return res.json({
                    success: false,
                    msg: "Unauthorized access"
                })

            }
        } catch (error: any) {
            return res.json({
                success: false,
                msg: `Error while authentication ${error.message}`
            })
        }
    }
    async authenticateAdmin(req: Request, res: Response, next: NextFunction): Promise<any> {
        // console.log("user middleware")
        try {
            const { admintoken } = req.cookies
            // console.log(tokens)
            if (admintoken != null) {
                // console.log(token)
                if (!process.env.SECRET_KEY) {
                    return res.json({
                        success: false,
                        msg: "secret key is missing in .env file!"
                    })
                }
                const decode = jwt.verify(admintoken, process.env.SECRET_KEY);
                next()
            }
            else {
                return res.json({
                    success: false,
                    msg: "Unauthorized access"
                })

            }
        } catch (error: any) {
            return res.json({
                success: false,
                msg: `Error while authentication ${error.message}`
            })
        }
    }



}