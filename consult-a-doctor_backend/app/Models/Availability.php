<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    use HasFactory;

    protected $casts = [
        "monday" => "array",
        "tuesday" => "array",
        "wednesday" => "array",
        "thursday" => "array",
        "friday" => "array"
    ];
}
