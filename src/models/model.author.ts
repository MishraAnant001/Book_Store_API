import mongoose from "mongoose";
import { IAuthor } from "../interfaces/interface.author";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    }
}, { timestamps: true });

authorSchema.index({name:1,biography:1,nationality:1},{unique:true})
const Author = mongoose.model<IAuthor>('Author', authorSchema);

export default Author;
