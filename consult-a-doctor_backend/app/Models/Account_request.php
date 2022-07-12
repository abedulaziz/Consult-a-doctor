<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account_request extends Model
{
    use HasFactory;

    protected $fillable = [
        'fname',
        'lname',
        'email',
        'password',
        'date_of_birth',
        'gender',
        "profile_pic",
        "speciality",
        "about",
        "university"
    ];
}
