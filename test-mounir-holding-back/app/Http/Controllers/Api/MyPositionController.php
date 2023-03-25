<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\MyPosition;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\MyPositionResource;

class MyPositionController extends Controller
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
            'data' => ['positions'=> MyPositionResource::collection(MyPosition::all())], 
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
            'latitude' => 'max:50',
            'longitude' => 'max:50',
        ]);
        
        if($validator->fails()){
            return response(['error' => $validator->errors(), 'Validation Error']);
        }
        
        $myPosition = MyPosition::create($data);

        return response([ 
            'statusCode' => 200,
            'timeStamp' => Carbon::now()->toDateTimeString(),
            'status'=>"OK", 
            'employee' => new MyPositionResource($myPosition), 
            'message' => 'Stored Successful'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MyPosition  $myPosition
     * @return \Illuminate\Http\Response
     */
    public function show(MyPosition $myPosition,$id)
    {
        $myPosition = MyPosition::find($id);
        return response([ 
            'statusCode' => 200,
            'timeStamp' => Carbon::now()->toDateTimeString(),
            'status'=>"OK", 
            'data' => ['postition'=> new MyPositionResource($myPosition)], 
            'message' => 'Fetched Successful'], 200
        );
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MyPosition  $myPosition
     * @return \Illuminate\Http\Response
     */
    public function edit(MyPosition $myPosition)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MyPosition  $myPosition
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MyPosition $myPosition,$id)
    {
        $myPosition = MyPosition::find($id);
        
        $myPosition->update($request->all());
        // dd($myPosition);

        return response(
            [ 
                'position' =>  new MyPositionResource($myPosition), 
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
     * @param  \App\Models\MyPosition  $myPosition
     * @return \Illuminate\Http\Response
     */
    public function destroy(MyPosition $myPosition)
    {
        //
    }
}
