import { Router } from "express";

export const logoutRouter = Router();
logoutRouter.get("/",(req, res) => {
    try {
      const cookies = Object.keys(req.cookies);
      if (cookies.length == 0) {
        return res.json({
          success: false,
          msg: "You need to login first!"
        })
      }
      cookies.forEach((item) => {
        res.clearCookie(item)
      })
      // console.log(cookies)
      return res.json({
        success: true,
        msg: "logout successfull!"
      })
    } catch (error:any) {
      return res.json({
        success: false,
        msg:`Error while logging out ${ error.message}`
      })
    }
  })