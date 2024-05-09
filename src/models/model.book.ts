import mongoose from "mongoose";
import { IBook } from "../interfaces/interface.book";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase:true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
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



