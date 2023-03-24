import { Observable } from "rxjs";
import { LoginResponse } from "../auth/login/login-response.payload";
import { SignUpResponse } from "../auth/sign-up/sign-up-response-payload";
import { PositionResponse } from "./position/position-response-payload";
import { UserResponse } from "./users/user-response-payload";


export interface CustomResponse {
    timeStamp : Date;
    statusCode : number;
    status : String;
    reason? : String;
    message : String;
    developperMessage? : String;
    data : {
        login ?: LoginResponse,
        signup ?: SignUpResponse,
        users : UserResponse[],
        user : UserResponse,
        positions : PositionResponse[],
        position : PositionResponse,
    };
}