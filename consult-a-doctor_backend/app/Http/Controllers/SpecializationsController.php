<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Specializations;

class specializationsController extends Controller
{
    public function getSpecializations() {

        $specializations = Specializations::select("id", "name", "background_image")->get();
        
        return response()->json([
            "specializations" => $specializations
        ]);
    }
}
