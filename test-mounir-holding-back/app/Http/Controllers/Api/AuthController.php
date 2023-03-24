<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    
    // user Registration Logic
    public function register(Request $request)
    {
        // Validating user Input
        $data = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        // Password encryption
        $data['password'] = bcrypt($request->password);

        // Create User callin User Model Class
        $user = User::create($data);

        // returning Response 
        return response(
            [ 
                'user' => $user, 
                'message' => 'User Registered Successfully !!!'
            ]
        );
    }

    // User Logn Logic
    public function login(Request $request)
    {
        // Validating user Input
        $data = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);


        // Returning Response if an error occured
        if (!auth()->attempt($data)) {
            return response()->json([
                'message'=>'Incorrect Details. Please try again'
            ],401);
        }

        // Creating AUth User Token
        $token = auth()->user()->createToken(auth()->user()->name);
        // dd($token);

        // getting the Authenticated User
        $user = auth()->user();

        // Returning Response
        return response(
            [
                'user' => auth()->user(),
                'message' => 'User Logged In Succesfully',
                'token_type'=>'Bearer',
                'access_token' => $token->accessToken,
                'token_expires_at'=>Carbon::parse($token->token->expires_at)->toDateTimestring(),
                'token_scopes'=>$token->token->scopes,
            ]
        );

        

    }


    public function logout(Request $request){

        // Get authenticated user
        $user = Auth::user();

        // Delete user Token
        $userToken = $user->tokens();
        $userToken->delete();
        return response()->json(['message' => 'Logged Out Successfully !!!'], 200);
        

    }



}
