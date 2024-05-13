export class ApiResponse {
    statusCode: number;
    data: any;
    message: string;
    nbhits:number;
    success: boolean;

    constructor(statusCode: number, data: any, message: string = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
        if(!data){
            this.nbhits=0;  
        }else{
            if(Array.isArray(data)) {
                this.nbhits = data.length;
            }
            else{
                this.nbhits = 1;
            }
        }
    }
}