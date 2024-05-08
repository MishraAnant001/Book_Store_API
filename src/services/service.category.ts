import mongoose from 'mongoose';
import Category from '../models/model.category';
import { ICategory } from '../interfaces/interface.category';

export class CategoryService {
    async getAllCategories(): Promise<any> {
        const data: ICategory[] = await Category.find({})
        if (data.length == 0) {
            return {
                success: false,
                msg: "No Category found"
            }
        }
        else {
            return {
                success: true,
                msg: `${data.length} Categories found`,
                data: data
            }
        }
    }

    async getCategoryByName(name: string): Promise<any> {
        const data: ICategory | null = await Category.findOne({ name:name.toLowerCase() })
        // console.log(data)
        if (!data) {
            return {
                success: false,
                msg: "No category found"
            }
        }
        return {
            success: true,
            msg: "category fetched successfully",
            data: data
        }

    }

    async postCategory(name:string): Promise<any> {
        
        const data: ICategory = await Category.create({
            name: name.toLowerCase()
        })
        return {
            success: true,
            msg: "category added successfully",
            data: data
        }
    }
    async updateCategoryByName(oldname:string,newname:string): Promise<any> {

        const verify: ICategory | null = await Category.findOne({ name:oldname.toLowerCase() })
        // console.log(data)
        if (!verify) {
            return {
                success: false,
                msg: "No category found"
            }
        }
        const data = await Category.findByIdAndUpdate(verify._id,{
            name:newname.toLowerCase()
        })
        return {
            success: true,
            msg: "category updated successfully",
            data: data
        }
    }

    async deleteCateogryByName(name: string): Promise<any> {
        const verify: ICategory | null = await Category.findOne({ name:name.toLowerCase() })
        // console.log(data)
        if (!verify) {
            return {
                success: false,
                msg: "No category found"
            }
        }
        const data = await Category.findByIdAndDelete(verify._id)
        return {
            success: true,
            msg: "category deleted successfully",
            data: data
        }

    }

}