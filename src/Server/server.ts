import express from "express"
import { mainRouter } from "../routes";
import { ServerError, ServerSuccess } from "../utils/Messages";

const app= express();
app.use("/",mainRouter);

export function startServer(){
    try {
        const port = process.env.PORT || 4000
        app.listen(port, () => {
            console.log(ServerSuccess.message, port)
        })
    }  catch (error:any) {
        console.log(ServerError.message,error.message)
    }
}