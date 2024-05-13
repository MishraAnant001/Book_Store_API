import { UserInterface, userTempInterface } from "../interfaces";
import { User } from "../models";
import bcrypt from "bcrypt"
import mongoose from 'mongoose';
import { ApiResponse } from "../utils/API_Response";
import { ErrorCodes, SuccessCodes } from "../utils/Status_Code";
import { UserError, UserSuccess } from "../utils/Messages";
import { ApiError } from "../utils/API_Error";

export class UserService {
    async getAllUsers(): Promise<any> {
        const data: UserInterface[] = await User.find({}).select("username");
        return new ApiResponse(SuccessCodes.ok, data, UserSuccess.multipleFetch);
    }

    async getUserById(id: string): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, UserError.idNotValid)
        }
        const data: UserInterface | null = await User.findOne({ _id: id })
        // console.log(data)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound,UserError.notFound)
        }
        return new ApiResponse(SuccessCodes.ok, data, UserSuccess.singleFetch)
    }

    async postUser(userdata: userTempInterface): Promise<any> {

        const password: string = await bcrypt.hash(userdata.password, 10);
        const data: UserInterface = await User.create({
            username: userdata.username,
            password: password
        })
        return new ApiResponse(SuccessCodes.created, data, UserSuccess.register)
    }

    async updateUser(id: string, userdata: userTempInterface): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, UserError.idNotValid)
        }
        const password: string = await bcrypt.hash(userdata.password, 10);
        const data: UserInterface | null = await User.findByIdAndUpdate(id, {
            username: userdata.username,
            password: password
        })
        if (!data) {
            throw new ApiError(ErrorCodes.notFound,UserError.notFound)
        }
        return new ApiResponse(SuccessCodes.ok, data, UserSuccess.update)
    }

    async deleteUser(id: string): Promise<any> {

        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, UserError.idNotValid)
        }
        const data: UserInterface | null = await User.findByIdAndDelete({ _id: id })
        // console.log(data)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound,UserError.notFound)
        }
        return new ApiResponse(SuccessCodes.ok, data, UserSuccess.delete)
    }


}