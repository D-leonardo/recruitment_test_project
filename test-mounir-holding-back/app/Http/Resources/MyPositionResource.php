<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class MyPositionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'available' => $this->available,
            'longitude' => $this->longitude,
            'latitude' => $this->latitude,
            'country' => $this->country,
            'city' => $this->city,
            'region' => $this->region,
            'user_id' => $this->user_id,     
            'user_name' => $this->user->name,     
            'created_at' => Carbon::parse($this->created_at,'UTC')->locale('fr')->isoFormat('LLLL'),
            'updated_at' => Carbon::parse($this->updated_at ,'UTC')->locale('fr')->isoFormat('LLLL'),
        ];
    }
}
