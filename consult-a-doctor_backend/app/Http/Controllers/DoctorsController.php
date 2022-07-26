<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Doctor_specific;

class DoctorsController extends Controller
{
    public function getTopDoctors() {

        $topFour = DB::table("users")
        ->join("doctor_specifics", "users.id", "=", "doctor_specifics.doctor_id")
        ->join("specializations", "doctor_specifics.doctor_id", "=", "specializations.id")
        ->select("doctor_id", "name", "rate", "fname", "lname", "profile_pic", "date_of_birth")->orderByDesc("rate")->take(4)->get();

        return response()->json([
            "isAuthorized" => auth()->id() ? true:false,
            "topDoctors" => $topFour
        ], 200);
    }

    public function specialityDoctors($specialization_id) {
        $doctors = null;

        if ($specialization_id == "all") {
            $doctors = $doctors = DB::table("specializations")->join("doctor_specifics", "specializations.id", "doctor_specifics.speciality_id")->select("doctor_id", "rate", "about", "name")->get();

        }
        else $doctors = DB::table("specializations")->join("doctor_specifics", "specializations.id", "=", "doctor_specifics.speciality_id")->join("users", "users.id", "=", "doctor_specifics.doctor_id")->select("fname", "lname", "doctor_id", "rate", "about", "name", "profile_pic")->where("speciality_id", $specialization_id)->get();


        return response()->json([
            "isAuthorized" => auth()->id() ? true:false,
            "doctors" => $doctors
        ], 200);
    }


    public function getDoctorInfo($doctor_id) {

        $doctor_info = DB::table("users")
        ->select("fname", "lname", "email", "date_of_birth", "profile_pic", "rate", "about", "background_img", "university", "specializations.name")
        ->join("doctor_specifics", "users.id", "=", "doctor_specifics.doctor_id")
        ->join("specializations", "doctor_specifics.speciality_id", "=", "specializations.id")
        ->where("users.id", $doctor_id)
        ->get()->first();


        return response()->json([
            "isAccountOwner" => auth()->id() == $doctor_id ? true: false,
            "doctor_info" => $doctor_info,
        ], 200);

    }

}
