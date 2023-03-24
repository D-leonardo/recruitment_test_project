export interface SignUpResponse {
    message: String;
    user:{
        id:number;
        name:String;
        email: String;
    }
}
