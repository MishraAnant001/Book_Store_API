import { ICategory } from "../interfaces";
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        enum: {
            values: ["horror", "fantasy", "science fiction", "mystery", "romance", "thriller", "historical fiction", "young adult", "non-fiction", "biography", "self-help", "cooking", "travel", "poetry", "graphic novel", "crime", "dystopian", "memoir", "business", "art","novel"],
            message: '{VALUE} is not a valid category.'
        },
        unique: true
    }
}, { timestamps: true });

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
