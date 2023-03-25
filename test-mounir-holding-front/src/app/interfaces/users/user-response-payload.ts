import { PositionResponse } from "../position/position-response-payload";

export interface UserResponse{
    id:number,
    name: string,
    email: string,
    position : PositionResponse,
    created_at: String,
    updated_at: String,
}