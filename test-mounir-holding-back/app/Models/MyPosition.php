<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyPosition extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'longitude',
        'latitude',
        'user_id',
        'country',
        'region',
        'city',
    ];


    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
