<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Specialization;
use Validator;

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

        $validator = Validator::make($request->all(), [
            'specialization' => 'string|min:2|max:50',
            "specialization_image" => 'image|max:1000|nullable'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $imageURI = null;

        if ($request->hasFile("specialization_image")) {
            $specBackground = $request->file("specialization_image");
            $imageName = $specBackground->getClientOriginalName();
            // $path = "storage/specialization_backgrounds/";
            $path = "/storage/specialization_backgrounds/";
            $specBackground->move(public_path($path), $imageName);

            $imageURI = asset($path . $imageName);
        }

        Specialization::create([
            "name" => $request->specialization,
            "background_image" => $imageURI
        ]);

        return response()->json([
            "message" => "Specialization added successfully"
        ]);
    }

    // delete existing specialization
    public function deleteSpecialization($specialization_id) {
        Specialization::where([
            "id" => $specialization_id
        ])->delete();

        return response()->json([
            "message" => "Specialization deleted successfully"
        ]);
    }
}
