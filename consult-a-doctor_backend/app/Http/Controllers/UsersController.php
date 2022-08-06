<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Appointment;

class UsersController extends Controller
{
    public function updateUserInfo(Request $request, $user_id) {

        $validator = Validator::make($request->all(), [
            'fname' => 'string|min:2|max:50',
            'lname' => 'string|min:2|max:50',
            "profile_pic" => 'image'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::find($user_id);
        $imageURI = generateURIPath($request, "profile_pic");

        if ($user->type == "patient") {
            $user->update([
                "fname" => $request->fname,
                "lname" => $request->lname,
                "profile_pic_uri" => $imageURI,
            ]);
        }

        if ($user->type == "doctor") {

            $validator = Validator::make($request->all(), [
                'about' => 'string|min:10|max:100',
                'university' => 'string',
                "background_image" => "image"
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $backgroundImgURI = generateURIPath($request, "background_img");
            $user->update([
                "fname" => $request->fname,
                "lname" => $request->lname,
                "profile_pic_uri" => $imageURI,
            ]);
            $user->getDoctorSpecifics->update([
                "about" => $request->about,
                "university" => $request->university,
                "background_img_uri" => $backgroundImgURI
            ]);
        }

        return response()->json([
            "message" => "Information updated successfully",
        ]);
    }


    public function getWorkPeriods($doctor_id) {

        $doctorWorkPeriods = User::find($doctor_id)->getDoctorAvailabilities->select("week_day", "from", "to")->where("doctor_id", $doctor_id)->get();

        return response()->json([
            "work_periods" => $doctorWorkPeriods
        ]);
    }

    // check the availability of the doctor on the selected date
    public function checkDayAvailability(Request $req, $doctor_id) {
        $week_day = $req->week_day;

        $workPeriods = User::find($doctor_id)->getDoctorAvailabilities()->where("week_day", $week_day)->select("from", "to")->orderBy("from", "asc")->get();
        $selectedDayAppoints = Appointment::where([["date", $req->date], ["patient_id", $doctor_id]])->orWhere([["date", $req->date], ["doctor_id", $doctor_id]])->select("from", "to", )->orderBy("from", "asc")->get();

        if (count($workPeriods)) return response()->json(["message" => "Doctor is not available on this time."], 404);


        return response()->json([
            "available_periods" => getHourlyWorkPeriods($workPeriods),
            "other_appointments" => $selectedDayAppoints
        ], 200);
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

        return response()->json([
            "available_periods" => $selectedDayAppoints
        ]);
    }


    public function getUserAppointments($user_id) {

        $userAppoinAsPatient = DB::table("users")
        ->join("appointments", "users.id", "=", "appointments.doctor_id")
        ->where("patient_id",  $user_id)
        ->select("appointments.id", "fname", "lname" , "from", "to", "date", "title", "duration")->get();

        $userAppoinAsDoctor = DB::table("users")
        ->join("appointments", "users.id", "=", "appointments.patient_id")
        ->where("doctor_id",  $user_id)
        ->select("appointments.id", "fname", "lname" , "from", "to", "date", "title", "duration")->get();

        return response()->json([
            "appointmentsAsPatient" => $userAppoinAsPatient,
            "appointmentsAsDoctor" => $userAppoinAsDoctor
        ]);
    }

    public function getUserInfo($user_id) {
        $userInfo = User::select("fname", "lname", "email", "date_of_birth", "type")->find($user_id);

        return response()->json([
            "user_info" => $userInfo
        ]);
    }

}


function getHourlyWorkPeriods($workPeriods) {

    $finalArray = array();

    foreach($workPeriods as $period) {

      $from = $period['from'];
      $to = $period['to'];
      $start = $from;

      while (strtotime($start) < strtotime($to)) {
        $object;

        $addOneHour = date('H:i:s', (strtotime($start) + 3600));
        if ($addOneHour >= $to) $object = (object) ['from' => $start, 'to' => $to];

        else $object = (object) ['from' => $start, 'to' => $addOneHour];

        array_push($finalArray, $object);
        $start = $addOneHour;
      }
    }
    return $finalArray;
}


function generateURIPath($request, $file) {
    $imageURI;

    if ($request->hasFile($file)) {
        $profilePicture = $request->file($file);
        $imageName = $profilePicture->getClientOriginalName();
        $path = "public/user_images/";

        $profilePicture->storeAs($path, $imageName);

        $imageURI = asset($path . $imageName);
    }

    return $imageURI;
}
