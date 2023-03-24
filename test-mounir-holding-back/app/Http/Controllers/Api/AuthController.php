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



}
