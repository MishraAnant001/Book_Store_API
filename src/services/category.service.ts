import { Category } from '../models';
import { ICategory } from '../interfaces';
import { ParsedQs } from 'qs';
import { ApiResponse } from '../utils/API_Response';
import { ErrorCodes, SuccessCodes } from '../utils/Status_Code';
import { CategoryError, CategorySuccess } from '../utils/Messages';
import { ApiError } from '../utils/API_Error';

export class CategoryService {
    async getAllCategoriesStatic(): Promise<any> {
        const data: ICategory[] = await Category.find({}).select("name")
        return new ApiResponse(SuccessCodes.ok, data, CategorySuccess.message);
    }
    async getAllCategories(filters: ParsedQs): Promise<any> {
        const {name,sort} = filters;
        const queryObject: any = {};
        if (name) {
            queryObject.name = {$regex:name,$options:"i"} as object;
        }
        let result = Category.find(queryObject)
        if(sort){
            if (typeof sort === 'string') {
                let sortlist = sort.split(",").join(" ");
                result = result.sort(sortlist);
            }
        }
        const page = Number(filters.page) || 1
        const limit = Number(filters.limit) || 5
        const skip = (page - 1) * limit
        result = result.skip(skip).limit(limit)
        const data: ICategory[] = await result.select("name")
        if (data.length == 0) {
            throw new ApiError(ErrorCodes.notFound,CategoryError.notFound)
        }
        else {
            return new ApiResponse(SuccessCodes.ok, data, CategorySuccess.message);
        }
    }

    // async getCategoryByName(name: string): Promise<any> {
    //     const data: ICategory | null = await Category.findOne({ name:name.toLowerCase() })
    //     // console.log(data)
    //     if (!data) {
    //         return {
    //             success: false,
    //             msg: "No category found"
    //         }
    //     }
    //     return {
    //         success: true,
    //         msg: "category fetched successfully",
    //         data: data
    //     }

    // }

    // async postCategory(name:string): Promise<any> {
        
    //     const data: ICategory = await Category.create({
    //         name: name.toLowerCase()
    //     })
    //     return {
    //         success: true,
    //         msg: "category added successfully",
    //         data: data
    //     }
    // }
    // async updateCategoryByName(oldname:string,newname:string): Promise<any> {

    //     const verify: ICategory | null = await Category.findOne({ name:oldname.toLowerCase() })
    //     // console.log(data)
    //     if (!verify) {
    //         return {
    //             success: false,
    //             msg: "No category found"
    //         }
    //     }
    //     const data = await Category.findByIdAndUpdate(verify._id,{
    //         name:newname.toLowerCase()
    //     })
    //     return {
    //         success: true,
    //         msg: "category updated successfully",
    //         data: data
    //     }
    // }

    // async deleteCateogryByName(name: string): Promise<any> {
    //     const verify: ICategory | null = await Category.findOne({ name:name.toLowerCase() })
    //     // console.log(data)
    //     if (!verify) {
    //         return {
    //             success: false,
    //             msg: "No category found"
    //         }
    //     }
    //     const data = await Category.findByIdAndDelete(verify._id)
    //     return {
    //         success: true,
    //         msg: "category deleted successfully",
    //         data: data
    //     }

    // }

}