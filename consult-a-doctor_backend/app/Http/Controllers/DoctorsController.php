<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Doctor_specific;

class DoctorsController extends Controller
{
    public function getTopDoctors() {

        $topFive = Doctor_specific::select("doctor_id", "speciality", "rate")->orderByDesc("rate")->take(5)->get();

        foreach($topFive as $doctor) {
            $user_info = Doctor_specific::find($doctor->doctor_id)->getDoctorSpecific;

            $doctor->fname = $user_info->fname;
            $doctor->lname = $user_info->lname;
            $doctor->profile_pic = $user_info->profile_pic;
        }

        return response()->json([
            "isAuthorized" => auth()->id() ? true:false,
            "topDoctors" => $topFive
        ], 200);
    }

    public function specialityDoctors($specialization) {
        $doctors = null;

        if ($specialization == "all") {
            $doctors = Doctor_specific::select("doctor_id", "speciality", "rate", "about")->get();
        }
        else $doctors = Doctor_specific::select("doctor_id", "speciality", "rate", "about")->where("speciality", $specialization)->get();


        foreach($doctors as $doctor) {
            $user_info = Doctor_specific::find($doctor->doctor_id)->getDoctorSpecific;

            $doctor->fname = $user_info->fname;
            $doctor->lname = $user_info->lname;
            $doctor->profile_pic = $user_info->profile_pic;
        }

        return response()->json([
            "isAuthorized" => auth()->id() ? true:false,
            "doctors" => $doctors
        ], 200);
    }

}
