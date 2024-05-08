import { ICategory } from "../interfaces/interface.category";
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    }
}, { timestamps: true });

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
