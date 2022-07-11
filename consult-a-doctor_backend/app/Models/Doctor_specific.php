<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Doctor_specific extends Model
{
    use HasFactory;

    public function getDoctorSpecific() {
        return $this->hasOne(User::class, "id");
    }
}
