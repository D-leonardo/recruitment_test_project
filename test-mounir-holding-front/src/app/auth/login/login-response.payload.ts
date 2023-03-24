export interface LoginResponse {
    access_token: String;
    message?: String;
    token_expires_at?: Date;
    token_scopes?: String[];
    token_type?: String;
    refresh_token?: String;
    user:{
        id:number;
        name:String;
        email: String;
    }
}
