import { UserInterface } from "../interfaces/interface.user";
import User from "../models/model.user";
import bcrypt from "bcrypt"
import mongoose from 'mongoose';
import { userTempInterface } from "../interfaces/interface.user";

export class UserService {
    async getAllUsers(): Promise<any> {
        const data: UserInterface[] = await User.find({}).select("username password");
        if (data.length == 0) {
            return {
                success: false,
                msg: "No user found"
            }
        }
        else {
            return {
                success: true,
                msg: `${data.length} Users found`,
                data: data
            }
        }
    }

    async getUserById(id: string): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid user id!"
            }
        }
        const data: UserInterface | null = await User.findOne({ _id: id })
        // console.log(data)
        if (!data) {
            return {
                success: false,
                msg: "No user found"
            }
        }
        return {
            success: true,
            msg: "user fetched successfully",
            data: data
        }

    }

    async postUser(userdata: userTempInterface): Promise<any> {

        const password: string = await bcrypt.hash(userdata.password, 10);
        const data: UserInterface = await User.create({
            username: userdata.username,
            password: password
        })
        return {
            success: true,
            msg: "User Registered Successfully",
            data: data
        }

    }

    async updateUser(id: string, userdata: userTempInterface): Promise<any> {
        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid user id!"
            }
        }
        const password: string = await bcrypt.hash(userdata.password, 10);
        const data: UserInterface | null = await User.findByIdAndUpdate(id, {
            username: userdata.username,
            password: password
        })
        if (!data) {
            return {
                success: false,
                msg: "No user found"
            }
        }
        return {
            success: true,
            msg: "user updated successfully",
            data: data
        }
    }

    async deleteUser(id: string): Promise<any> {

        if (!mongoose.isValidObjectId(id)) {
            return {
                success: false,
                msg: "Please provide valid user id!"
            }
        }
        const data: UserInterface | null = await User.findByIdAndDelete({ _id: id })
        // console.log(data)
        if (!data) {
            return {
                success: false,
                msg: "No user found"
            }
        }
        return {
            success: true,
            msg:"user deleted successfully",
            data: data
        }
    }


}