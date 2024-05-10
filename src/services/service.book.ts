import mongoose from 'mongoose';
import Book from "../models/model.book";
import { BookTempInterface } from "../interfaces/interface.book";
import { IBook } from "../interfaces/interface.book";
import Author from '../models/model.author';
import { IAuthor } from '../interfaces/interface.author';
import { ICategory } from '../interfaces/interface.category';
import Category from '../models/model.category';
import { ParsedQs } from 'qs';

export class BookService {
    async getAllBooksStatic(): Promise<any> {
        const data: IBook[] = await Book.find({}).select("title author category description price")
        if (data.length == 0) {
            return {
                success: false,
                msg: "No Book found"
            }
        }
        else {
            return {
                success: true,
                msg: `${data.length} Books found`,
                data: data
            }
        }
    }
    async getAllBooks(filters: ParsedQs): Promise<any> {
        // console.log(filters);
        let { search, sort, fields, numericFilters } = filters;
        let data: IBook[] | null = null;
        const searchfields = ["title", "description", "author.name", "category.name"]
        let searchQueryArray: object[] = [];
        const page = Number(filters.page) || 1
        const limit = Number(filters.limit) || 5
        // console.log(filters?.page,filters?.limit)
        const skip = (page - 1) * limit
        let matchObject :any= {}
        let sortObject: any = {
            createdAt: -1
        }
        let projectObject: any = {
        }
        if (fields) {
            if (typeof fields == "string") {
                const fieldList = fields.split(",");
                fieldList.forEach((field)=>{
                    console.log(field)
                    if(field=="author"){
                        projectObject[field] = { $arrayElemAt: ["$author.name", 0] }
                    }else if(field=="category"){
                        projectObject[field] = { $arrayElemAt: ["$category.name", 0] }
                    }
                    else{
                        projectObject[field] = 1
                    }
                })
                // console.log(projectObject)
            }
        } else {
            projectObject = {
                title: 1,
                author: { $arrayElemAt: ["$author.name", 0] },
                description: 1,
                category: { $arrayElemAt: ["$category.name", 0] },
                price: 1
            }
        }
        // console.log(skip)
        if (search) {
            searchQueryArray = searchfields.map((field) => {
                return {
                    [field]: {
                        $regex: search,
                        $options: "i"
                    }
                }
            })
            matchObject = {
                $or: searchQueryArray
            }
            console.log(matchObject)
            // console.log(searchQueryArray)
        }
        if (sort) {
            if (typeof sort === 'string') {
                sort = sort.trim();
                let sortlist = sort.split(",");
                // console.log(sortlist)
                sortlist.forEach((item) => {
                    // console.log(item)
                    const flag = item[0] == "-" ? -1 : 1;
                    // console.log(flag)
                    if (flag == -1) {
                        item = item.replace("-", "");
                    }
                    sortObject[item] = flag;
                })
                // console.log(sortObject)
            }
        }
        if(numericFilters){
            if(typeof numericFilters === "string"){
                const operatorMap ={
                    ">": "$gt",
                    "<": "$lt",
                    ">=": "$gte",
                    "<=": "$lte",
                    "==": "$eq",
                    "!=": "$ne"
                }
                const regEx = /\b(<|>|<=|>=|==|!=)/g
                let numfilter = numericFilters.replace(regEx, (match) => {
                    const key = match as keyof typeof operatorMap;
                    return `-${operatorMap[key]}-`;
                });
                // console.log(numfilter);
                const options = ["price"]
                let numfilterupdated = numfilter.split(",").forEach((item)=>{
                    const[field,operator,value]= item.split("-");
                    if(options.includes(field)){
                        matchObject[field]={[operator]:Number(value)}
                    }
                })
            }
            console.log(matchObject)
        }

        data = await Book.aggregate([
            {
                $lookup: {
                    from: "authors",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $match: matchObject
            }, {
                $project: projectObject
            },
            {
                $sort: sortObject
            },
            {
                $skip: Number(skip)
            },
            {
                $limit: Number(limit)
            },
        ])
        // if (search) {
        //     if (typeof search === 'string') {
        //         const regEx = new RegExp(search, 'i');
        //         data = await Book.aggregate([

        //             {
        //                 $lookup:{
        //                     from: "authors",
        //                     localField: "author",
        //                     foreignField: "_id",
        //                     as: "author"
        //                 }
        //             },
        //             {
        //                 $lookup:{
        //                     from: "categories",
        //                     localField: "category",
        //                     foreignField: "_id",
        //                     as: "category"
        //                 }
        //             },
        //             {
        //                 $match: {
        //                     $or: [
        //                         { "title": regEx },
        //                         { "author.name": regEx },
        //                         { "category.name": regEx },
        //                         {"description": regEx}
        //                     ]
        //                 }
        //             },{
        //                 $project: {
        //                     title: 1,
        //                     description: 1,
        //                     price: 1,
        //                     author :{$arrayElemAt :["$author.name",0]},
        //                     category:{$arrayElemAt :["$category.name",0]}
        //                 }
        //             },
        //             {
        //                 $skip:Number(skip)
        //             },
        //             {
        //                 $limit:Number(limit)
        //             }

        //         ])
        //     }
        // } else {
        //     data = await Book.aggregate([
        //         {
        //             $lookup:{
        //                 from: "authors",
        //                 localField: "author",
        //                 foreignField: "_id",
        //                 as: "author"
        //             }
        //         },
        //         {
        //             $lookup:{
        //                 from: "categories",
        //                 localField: "category",
        //                 foreignField: "_id",
        //                 as: "category"
        //             }
        //         },
        //         {
        //             $project: {
        //                 title: 1,
        //                 description: 1,
        //                 price: 1,
        //                 author :{$arrayElemAt :["$author.name",0]},
        //                 category:{$arrayElemAt :["$category.name",0]}
        //             }
        //         },
        //         {
        //             $skip:Number(skip)
        //         },
        //         {
        //             $limit:Number(limit)
        //         }
        //     ])
        // }
        if (data && data.length == 0) {
            return {
                success: false,
                msg: "No Book found"
            }
        } else {
            return {
                success: true,
                msg: `${data.length} Books found`,
                data: data
            }
        }
    }

    // async getBookByTitle(title: string): Promise<any> {
    //     const data: IBook | null = await Book.findOne({ title: title })
    //     // console.log(data)
    //     if (!data) {
    //         return {
    //             success: false,
    //             msg: "No book found"
    //         }
    //     }
    //     return {
    //         success: true,
    //         msg: "book fetched successfully",
    //         data: data
    //     }

    // }

    // async getAllBooks(filters: ParsedQs): Promise<any> {
    //     // console.log(filters);
    //     const { title, author, category,sort,fields,numericFilters } = filters;
    //     const queryObject: any = {};
    //     if (title) {
    //         queryObject.title = {$regex:title,$options:"i"} as object;
    //     }
    //     if (author) {
    //         queryObject.author = {$regex:author,$options:"i"} as object;
    //     }
    //     if (category) {
    //         queryObject.category = {$regex:category,$options:"i"} as object;
    //     }
    //     // console.log(queryObject);
        // if(numericFilters){
        //     if(typeof numericFilters === "string"){
        //         const operatorMap ={
        //             ">": "$gt",
        //             "<": "$lt",
        //             ">=": "$gte",
        //             "<=": "$lte",
        //             "==": "$eq",
        //             "!=": "$ne"
        //         }
        //         const regEx = /\b(<|>|<=|>=|==|!=)/g
        //         let numfilter = numericFilters.replace(regEx, (match) => {
        //             const key = match as keyof typeof operatorMap;
        //             return `-${operatorMap[key]}-`;
        //         });
        //         // console.log(numfilter);
        //         const options = ["price"]
        //         let numfilterupdated = numfilter.split(",").forEach((item)=>{
        //             const[field,operator,value]= item.split("-");
        //             if(options.includes(field)){
        //                 queryObject[field]={[operator]:Number(value)}
        //             }
        //         })
        //     }
        // }
    //     let result: any = Book.find(queryObject)
    //     if(sort){
    //         if (typeof sort === 'string') {
    //             let sortlist = sort.split(",").join(" ");
    //             result = result.sort(sortlist);
    //         }
    //     }
    //     if(fields){
    //         if (typeof fields === 'string') {
    //             let fieldlist = fields.split(",").join(" ");
    //             result = result.select(fieldlist);
    //         }
    //     }else{
    //         result = result.select("title author category description price");
    //     }

    //     const page = Number(filters.page) || 1
    //     const limit = Number(filters.limit) || 5
    //     const skip = (page - 1) * limit
    //     result = result.skip(skip).limit(limit)

    //     const data : IBook[] = await result
    //     if (data.length == 0) {
    //         return {
    //             success: false,
    //             msg: "No Book found"
    //         }
    //     }
    //     else {
    //         return {
    //             success: true,
    //             msg: `${data.length} Books found`,
    //             data: data
    //         }
    //     }
    // }

    // async getBookByTitle(title: string): Promise<any> {
    //     const data: IBook | null = await Book.findOne({ title: title })
    //     // console.log(data)
    //     if (!data) {
    //         return {
    //             success: false,
    //             msg: "No book found"
    //         }
    //     }
    //     return {
    //         success: true,
    //         msg: "book fetched successfully",
    //         data: data
    //     }

    // }
    async getBookById(id: string): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid book id!"
            }
        }
        const data: IBook | null = await Book.findOne({ _id: id })
        // console.log(data)
        if (!data) {
            return {
                success: false,
                msg: "No book found"
            }
        }
        return {
            success: true,
            msg: "book fetched successfully",
            data: data
        }

    }

    async postBook(bookdata: BookTempInterface): Promise<any> {
        const { title, author, category, ISBN, description, price } = bookdata;
        const userauthor: IAuthor | null = await Author.findOne({ name: author })
        if (!userauthor) {
            return {
                success: false,
                msg: "No such author found please create author!"
            }
        }
        const userCategory: ICategory | null = await Category.findOne({ name: category })
        if (!userCategory) {
            return {
                success: false,
                msg: "No such category found please create category!"
            }
        }
        const data: IBook = await Book.create({
            title: title,
            author: userauthor._id,
            category: userCategory._id,
            ISBN: ISBN,
            description: description,
            price: price
        })
        return {
            success: true,
            msg: "Book added successfully",
            data: data
        }
    }
    // async postBook(bookdata: BookTempInterface): Promise<any> {
    //     const { title, author, category, ISBN, description, price } = bookdata;
    //     const userauthor: IAuthor | null = await Author.findOne({ name: author })
    //     if (!userauthor) {
    //         return {
    //             success: false,
    //             msg: "No such author found please create author!"
    //         }
    //     }
    //     const userCategory: ICategory | null = await Category.findOne({ name: category })
    //     if (!userCategory) {
    //         return {
    //             success: false,
    //             msg: "No such category found please create category!"
    //         }
    //     }
    //     const data: IBook = await Book.create({
    //         title: title,
    //         author: author,
    //         category: category,
    //         ISBN: ISBN,
    //         description: description,
    //         price: price
    //     })
    //     return {
    //         success: true,
    //         msg: "Book added successfully",
    //         data: data
    //     }
    // }
    async updateBookById(id: string, bookdata: BookTempInterface): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid book id!"
            }
        }
        const { title, author, category, ISBN, description, price } = bookdata;
        const userauthor: IAuthor | null = await Author.findOne({ name: author })
        if (!userauthor) {
            return {
                success: false,
                msg: "No such author found please create author!"
            }
        }
        const userCategory: ICategory | null = await Category.findOne({ name: category })
        if (!userCategory) {
            return {
                success: false,
                msg: "No such category found please create category!"
            }
        }
        const data: IBook | null = await Book.findByIdAndUpdate(id, {
            title: title,
            author: author,
            category: category,
            ISBN: ISBN,
            description: description,
            price: price
        })
        if (!data) {
            return {
                success: false,
                msg: "No book found"
            }
        }
        return {
            success: true,
            msg: "book updated successfully",
            data: data
        }
    }

    async deleteBook(id: string): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid book id!"
            }
        }
        const data: IBook | null = await Book.findByIdAndDelete({ _id: id })
        // console.log(data)
        if (!data) {
            return {
                success: false,
                msg: "No book found"
            }
        }
        return {
            success: true,
            msg: "book deleted successfully",
            data: data
        }

    }

}