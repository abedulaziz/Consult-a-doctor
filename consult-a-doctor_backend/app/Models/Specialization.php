<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Doctor_specific;

class Specialization extends Model
{
    use HasFactory;

    public function specialityDoctors() {

    return $this->hasMany(Doctor_specific::class, "speciality_id");
    }
}
