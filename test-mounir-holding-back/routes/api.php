<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MyPositionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    $user=Auth::user();
    
    return new UserResource($user);
});

// User Registration Route
Route::post('/register', [AuthController::class,'register']);

// User Login Route
Route::post('/login', [AuthController::class,'login']);

// User Logout Route
Route::post('/logout',[AuthController::class,'logout'])->middleware(['auth:api']);

// Users resource Route
Route::apiResource('/users', UserController::class)->middleware(['auth:api']); 

// Positions resource Route
// Route::apiResource('/positions', MyPositionController::class); 
Route::get('/position/{id}', [MyPositionController::class,'show']);

Route::apiResource('/positions', MyPositionController::class)->middleware(['auth:api']);