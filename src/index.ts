import {app} from "./app";
import { config } from "dotenv";
import { ConnectDB } from "./DB/connectDB";
config()

const connection = new ConnectDB();

connection.connect().then(() => {
    try {
        const port = process.env.PORT || 4000
        app.listen(port, () => {
            console.log("Server is listening on port :", port)
        })
    } catch (error) {
        console.log(error)
    }
}).catch((err)=>{
    console.log("Error connecting to DB :",err.message)
})
