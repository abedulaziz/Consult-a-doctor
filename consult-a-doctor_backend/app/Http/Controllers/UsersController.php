<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    public function updateUserInfo(Request $request, $user_id) {

        $validator = Validator::make($request->all(), [
            'fname' => 'required|string|min:2|max:50',
            'lname' => 'required|string|min:2|max:50',
            'password' => 'required|string|min:6',
            'date_of_birth' => 'required|date',
            "profile_pic" => 'required|image'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::find($user_id);

        $user->update([
            "fname" => $request->fname,
            "lname" => $request->lname,
            "password" => $request->password,
            "date_of_birth" => $request->date_of_birth,
            "profile_pic" => $request->profile_pic,
        ]);

        if ($user->type == "doctor") {

            $validator = Validator::make($request->all(), [
                'about' => 'required|string|min:10|max:100',
                'background_img' => 'required|image',
                'university' => 'required|string'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $user->getDoctorSpecifics->update([
                "about" => $request->about,
                "background_img" => $request->background_img,
                "university" => $request->university,
            ]);
        }

        return response()->json([
            "message" => "Information updated successfully",
        ]);
    }


    public function getWorkPeriods($doctor_id) {

        $doctorWorkPeriods = User::find($doctor_id)->getDoctorAvailabilities->select("monday", "tuesday", "wednesday", "thursday", "friday")->where("doctor_id", $doctor_id)->limit(1)->get();

        return response()->json([
            "work_periods" => $doctorWorkPeriods
        ]);
    }

    public function checkAvailability(Request $req, $doctor_id) {
        $day = $req->day;

        $workPeriods = User::find($doctor_id)->getDoctorAvailabilities->$day;
        $selectedDayAppoints = User::find($doctor_id)->getDoctorAppoints->where("doctor_id", $doctor_id)->where("date", $req->date);

        $availablePeriods = array();
        foreach($workPeriods as $period) {
            
        }

        return response()->json([
            "available_periods" => $selectedDayAppoints
        ]);
    }





    public function getAvailablePeriods($doctor_id, Request $req) {
        $day = $req->day;

        $workPeriods = User::find($doctor_id)->getDoctorAvailabilities->$day;

        $selectedDayAppoints = User::find($doctor_id)->getDoctorAppoints->where("doctor_id", $doctor_id)->where("date", $req->date);

        function isTimeValid($workPeriods, $req) {

            foreach($workPeriods as $period) {

                if($period["from"] < $req->time and $period["to"] > $req->time) {
                    return true;
                }
            }
            return false;
        }
        if(!isTimeValid($workPeriods, $req)) {
            return response()->json([
                "message" => "Unvalid time"
            ]);
        }







        $newtimestamp = strtotime('05:05:03 + 160 minutes');
        echo date('H:i:s', $newtimestamp);

        return response()->json([
            "available_periods" => $selectedDayAppoints
        ]);
    }
}
