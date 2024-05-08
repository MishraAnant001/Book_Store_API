import mongoose,{Document} from 'mongoose'

export interface UserInterface extends Document {
    username:string;
    password:string;
}

export interface userTempInterface{
    username:string;
    password:string; 
}