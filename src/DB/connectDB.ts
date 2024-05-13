import mongoose from "mongoose"
import { ApiError } from "../utils/API_Error"
import { DatabaseError, DatabaseSuccess } from "../utils/Messages";

export async function connectDB() {
    const url = process.env.MONGO_URI
    // console.log(url)
    if (!url) {
        throw new ApiError(500, "Please provide mongo url in .env file")
    } else {
        await mongoose.connect(url).catch((err) => {
            throw new ApiError(500, DatabaseError.connection)
        });
        console.log(DatabaseSuccess.message)
    }

}
