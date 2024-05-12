import express from "express"
import cookieParser from "cookie-parser";
import { userRouter,loginRouter,signupRouter,bookRouter,authorRouter,categoryRouter } from "./routes";

export const app= express();

//middlware
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/login",loginRouter)
app.use("/api/v1/signup",signupRouter)
app.use("/api/v1/books",bookRouter)
app.use("/api/v1/author",authorRouter)
app.use("/api/v1/category",categoryRouter)

app.get("/",(req,res)=>{
  res.send('Welcome to Book store!')
})
app.get("/api/v1/logout", (req, res) => {
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