import mongoose from "mongoose";
import { IBook } from "../interfaces/interface.book";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type:String,
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });
bookSchema.index({ title: 1, author: 1 }, { unique: true })

const Book = mongoose.model<IBook>('Book', bookSchema);
export default Book



