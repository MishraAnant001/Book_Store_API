export class ApiError extends Error {
    statusCode: number;
    data: any;
    message:string;
    constructor(
        statusCode: number,
        message: string = "Something went wrong"
    ){
        super(message);
        this.message=message
        this.statusCode = statusCode;
    }
}