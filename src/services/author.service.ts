import mongoose from 'mongoose';
import { ParsedQs } from 'qs';
import { IAuthor,authorTempInterface } from '../interfaces';
import { Author } from '../models';
import { ApiResponse } from '../utils/API_Response';
import { ErrorCodes, SuccessCodes } from '../utils/Status_Code';
import { AuthorError, AuthorSuccess } from '../utils/Messages';
import { ApiError } from '../utils/API_Error';

export class AuthorService {
    async getAllAuthorsStatic(): Promise<any> {
        const data: IAuthor[] = await Author.find({}).select("name biography nationality")
        return new ApiResponse(SuccessCodes.ok, data, AuthorSuccess.multipleFetch);
    }
    async getAllAuthors(filters: ParsedQs): Promise<any> {
        const {name,nationality,sort,fields}=filters
        const queryObject: any = {};
        if (name) {
            queryObject.name = {$regex:name,$options:"i"} as object;
        }
        if (nationality) {
            queryObject.nationality = {$regex:nationality,$options:"i"} as object;
        }
        let result: any = Author.find(queryObject)

        if(sort){
            if (typeof sort === 'string') {
                let sortlist = sort.split(",").join(" ");
                result = result.sort(sortlist);
            }
        }
        if(fields){
            if (typeof fields === 'string') {
                let fieldlist = fields.split(",").join(" ");
                result = result.select(fieldlist);
            }
        }else{
            result = result.select("name biography nationality");
        }
        const page = Number(filters.page) || 1
        const limit = Number(filters.limit) || 5
        const skip = (page - 1) * limit
        result = result.skip(skip).limit(limit)
        const data: IAuthor[] = await result
        if (data.length == 0) {
            throw new ApiError(ErrorCodes.notFound, AuthorError.notFound)
        }
        else {
            return new ApiResponse(SuccessCodes.ok, data, AuthorSuccess.multipleFetch);
        }
    }

    async getAuthorById(id: string): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, AuthorError.idNotValid)
        }
        const data: IAuthor | null = await Author.findOne({ _id: id })
        // console.log(data)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, AuthorError.notFound)
        }
        return new ApiResponse(SuccessCodes.ok, data, AuthorSuccess.singleFetch);

    }

    async postAuthor(authordata: authorTempInterface): Promise<any> {
        const { name, biography, nationality } = authordata;
        const data: IAuthor = await Author.create({
            name: name,
            biography: biography,
            nationality: nationality
        })
        return new ApiResponse(SuccessCodes.created, data, AuthorSuccess.create);
    }
    async updateAuthorById(id: string, authordata: authorTempInterface): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, AuthorError.idNotValid)
        }
        const { name, biography, nationality } = authordata;
        const data: IAuthor | null = await Author.findByIdAndUpdate(id, {
            name: name,
            biography: biography,
            nationality: nationality
        })
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, AuthorError.notFound)
        }
        return new ApiResponse(SuccessCodes.ok, data, AuthorSuccess.update);
    }

    async deleteAuthor(id: string): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, AuthorError.idNotValid)
        }
        const data: IAuthor | null = await Author.findByIdAndDelete({ _id: id })
        // console.log(data)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, AuthorError.notFound)
        }
        return new ApiResponse(SuccessCodes.ok, data, AuthorSuccess.delete);

    }

}