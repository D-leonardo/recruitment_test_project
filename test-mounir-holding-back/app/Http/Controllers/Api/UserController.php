<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response([ 
            'statusCode' => 200,
            'timeStamp' => Carbon::now()->toDateTimeString(),
            'status'=>"OK", 
            'data' => ['users'=> UserResource::collection(User::all())], 
            'message' => 'Fetched Successful'], 200
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $data = $request->all();
        
        
        $validator = Validator::make($data, [
            'email' => 'required|max:50',
            'name' => 'required',
            'created_at' => '',
            'updated_at' => '',
        ]);
        
        if($validator->fails()){
            return response(['error' => $validator->errors(), 'Validation Error']);
        }
        $data['password'] = $request->password = bcrypt('motdepasse');
        
        $user = User::create($data);

        return response([ 
            'statusCode' => 200,
            'timeStamp' => Carbon::now()->toDateTimeString(),
            'status'=>"OK", 
            'employee' => new UserResource($user), 
            'message' => 'Stored Successful'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response([ 
            'statusCode' => 200,
            'timeStamp' => Carbon::now()->toDateTimeString(),
            'status'=>"OK", 
            'data' => ['user'=> new UserResource($user)], 
            'message' => 'Fetched Successful'], 200
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {

        $user->update($request->all());

        return response(
            [ 
                'user' =>  new UserResource($user), 
                'statusCode' => 200,
                'timeStamp' => Carbon::now()->toDateTimeString(),
                'status'=>"OK", 
                'message' => 'Product Update Successful'
            ], 

            200
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response([ 
            'statusCode' => 200,
            'timeStamp' => Carbon::now()->toDateTimeString(),
            'status'=>"OK", 
            'data' => [], 
            'message' => 'User deleted Successful'], 200
        );
    }
}

