import { Request, Response } from "express";
import { CategoryService } from "../services";
const categoryService = new CategoryService();
import {ParsedQs} from "qs"
export class CategoryController{
    async getAllCategoriesStatic(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const data:Object = await categoryService.getAllCategoriesStatic()
            return res.json(data)
            
        } catch (error: any) {
            return res.json({
                success:false,
                msg: `Error while getting all categories, ${error.message}`
            })
        }
    }
    async getAllCategories(req: Request, res: Response): Promise<any> {
        // console.log("get")
        try {
            const filters:ParsedQs = req.query;
            const data:Object = await categoryService.getAllCategories(filters)
            return res.json(data)
            
        } catch (error: any) {
            return res.json({
                success:false,
                msg: `Error while getting all categories, ${error.message}`
            })
        }
    }

    async getCategoryByName(req: Request, res: Response): Promise<any> {
        try {
            const { name } = req.body;
            if(!name){
                return res.json({
                    success:false,
                    msg:"please provide name in request body"
                })
            }
            // console.log(id)
            const data :Object = await categoryService.getCategoryByName(name)
            return res.json(data);
        } catch (error: any) {
            return res.json({
                success:false,
                msg: `Error while getting the category, ${error.message}`
            })
        }

    }

    async postCategory(req: Request, res: Response): Promise<any> {
        try {
            const { name } = req.body;
            if(!name){
                return res.json({
                    success:false,
                    msg:"please provide name in request body"
                })
            }
            const data = await categoryService.postCategory(name)
            return res.json(data);
        } catch (error:any){
            if(error.code ===11000){
                return res.json({
                    success:false,
                    msg: `category already exists!`
                }) 
            }
            else{

                return res.json({
                    success:false,
                    msg: `Error while adding category, ${error.message}`
                })
            }
        }
       
    }

    async updateCategoryByName(req: Request, res: Response): Promise<any> {
        try {
            const { oldname,newname } = req.body;
            if(!oldname || !newname){
                return res.json({
                    success:false,
                    msg:"please provide old and new names in request body"
                })
            }
            // console.log(id)
            const data = await categoryService.updateCategoryByName(oldname,newname)
            return res.json(data)
        } catch (error:any) {
            return res.json({
                success:false,
                msg: `Error while updating the category, ${error.message}`
            })
        }
       
    }
    async deleteCateogryByName(req: Request, res: Response): Promise<any> {
        try {
            const { name } = req.body;
            if(!name){
                return res.json({
                    success:false,
                    msg:"please provide name in request body"
                })
            }
            // console.log(id)
            const data = await categoryService.deleteCateogryByName(name)
            return res.json(data)

        } catch (error: any) {
            return res.json({
                success:false,
                msg: `Error while deleting the category, ${error.message}`
            })
        }

    }
}