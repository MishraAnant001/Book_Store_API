import { config } from "dotenv";
import { connectDB } from "./DB/connectDB";
import { startServer } from "./Server/server";
import { DatabaseError } from "./utils/Messages";
config()

async function start(){
    try {
        await connectDB();
        startServer()
    } catch (error:any) {
        console.log(DatabaseError.process,error.message)
    }
}
start();
