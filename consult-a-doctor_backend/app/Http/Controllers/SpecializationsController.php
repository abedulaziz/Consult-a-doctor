<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Specialization;

class specializationsController extends Controller
{
    public function getSpecializations() {

        $specializations = Specialization::withCount("specialityDoctors")->get();

        return response()->json([
            "specializations" => $specializations
        ]);
    }

    // add new specialization
    public function addNewSpecialization(Request $request) {
        Specialization::create([
            "name" => $request->name,
            "background_image" => $request->background_image
        ]);

        return response()->json([
            "messaege" => "Specialization added successfully"
        ]);
    }

    // delete existing specialization
    public function deleteSpecialization(Request $request) {
        Specialization::where([
            "id" => $request->id
        ])->delete();

        return response()->json([
            "messaege" => "Specialization deleted successfully"
        ]);
    }
}
