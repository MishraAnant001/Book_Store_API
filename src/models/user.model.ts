import mongoose,{Schema} from 'mongoose'
import { UserInterface } from '../interfaces';

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Username is required!"],
        unique:[true,"Username must be unique!"]
    },
    password:{
        type:String,
        required:[true,"Password is required!"]
    }
},{
    timestamps:true
})
const User = mongoose.model<UserInterface>("User",userSchema)
export default User;


