import { Document, Schema } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: Schema.Types.ObjectId;
    category: Schema.Types.ObjectId;
    ISBN: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface BookTempInterface{
    title: string;
    author: string;
    category: string;
    ISBN: string;
    description: string;
    price: number;
}