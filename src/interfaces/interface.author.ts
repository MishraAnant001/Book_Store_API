import { Document } from "mongoose";
export interface IAuthor extends Document {
    name: string;
    biography: string;
    nationality: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface authorTempInterface {
    name: string;
    biography: string;
    nationality: string;
}