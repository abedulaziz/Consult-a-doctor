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
        ->join("specializations", "doctor_specifics.speciality_id", "=", "specializations.id")
        ->select("doctor_id", "name", "rate", "fname", "lname", "profile_pic_uri", "date_of_birth")->orderByDesc("rate")->take(4)->get();

        return response()->json([
            "isAuthorized" => auth()->id() ? true:false,
            "topDoctors" => $topFour
        ], 200);
    }

    public function specialityDoctors($specialization_id) {

        $doctors = DB::table("specializations")->join("doctor_specifics", "specializations.id", "=", "doctor_specifics.speciality_id")->join("users", "users.id", "=", "doctor_specifics.doctor_id")->select("fname", "lname", "doctor_id", "rate", "about", "name", "profile_pic_uri");

        $specialization_id == "*" ? $doctors = $doctors->get() : $doctors = $doctors->where("speciality_id", $specialization_id)->get();

        return response()->json([
            "doctors" => $doctors
        ], 200);
    }


    public function getDoctorInfo($doctor_id) {

        $doctorInfo = DB::table("users")
        ->select("users.id", "fname", "lname", "email", "date_of_birth", "profile_pic_uri", "rate", "about", "background_img_uri", "university", "specializations.name")
        ->join("doctor_specifics", "users.id", "=", "doctor_specifics.doctor_id")
        ->join("specializations", "doctor_specifics.speciality_id", "=", "specializations.id")
        ->where("users.id", $doctor_id)
        ->get()->first();

        $doctorBlogs = DB::table("blogs")
        ->select("content", "created_at")
        ->where("doctor_id", $doctor_id)->get();

        $followers = DB::table("followings")
        ->select("follower_id")->where("doctor_id", $doctor_id)->count();

        $following = DB::table("followings")
        ->select("doctor_id")->where("follower_id", $doctor_id)->count();

        $isFollowingTheDoctor = DB::table("followings")->where("follower_id", auth()->id())->where("doctor_id", $doctor_id)->exists();

        return response()->json([
            "isAccountOwner" => auth()->id() == $doctor_id ? true: false,
            "doctor_info" => $doctorInfo,
            "doctor_blogs" => $doctorBlogs,
            "followers" => $followers,
            "followings" => $following,
            "isFollowingTheDoctor" => $isFollowingTheDoctor
        ], 200);

    }

}
