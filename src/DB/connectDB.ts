import mongoose from "mongoose"
import { ApiError } from "../utils/API_Error"
export class ConnectDB {
    async connect() {
        const url = process.env.MONGO_URI
        // console.log(url)
        if (!url) {
            throw new ApiError(500, "Please provide mongo url in .env file")
        } else {
            await mongoose.connect(url).catch((err) => {
                throw new ApiError(500, "URL incorrect or Mongo DB error! Please check URL and try again")
            });
            console.log("Database connected!")
        }
    }
}