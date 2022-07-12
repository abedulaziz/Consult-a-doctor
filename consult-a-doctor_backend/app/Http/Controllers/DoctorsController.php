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
        }

        return response()->json([
            "isAuthorized" => auth()->id() ? true:false,
            "topDoctors" => $topFive
        ], 200);
    }

}
