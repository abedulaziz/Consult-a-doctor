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
                'university' => 'required|string'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $user->getDoctorSpecifics->update([
                "about" => $request->about,
                "university" => $request->university,
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

    public function checkDayAvailability(Request $req, $doctor_id) {
        $week_day = $req->week_day;

        $workPeriods = User::find($doctor_id)->getDoctorAvailabilities()->where("week_day", $week_day)->select("from", "to")->orderBy("from", "asc")->get();
        $selectedDayAppoints = User::find($doctor_id)->getDoctorAppoints()->where("date", $req->date)->select("from", "to", )->orderBy("from", "asc")->get();


        $newtimestamp = strtotime("01:00:00" .'+ 1 hours');
        echo date('H:i:s', $newtimestamp);


        getAvailableDurations($workPeriods, $selectedDayAppoints);


        return response()->json([
            "available_periods" => [$workPeriods, $selectedDayAppoints]
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


    public function getUserAppointments($user_id) {

        $userAppoinAsPatient = DB::table("users")
        ->join("appointments", "users.id", "=", "appointments.doctor_id")
        ->where("patient_id",  $user_id)
        ->select("fname", "lname" , "from", "to", "date", "title", "duration")->get();

        $userAppoinAsDoctor = DB::table("users")
        ->join("appointments", "users.id", "=", "appointments.patient_id")
        ->where("doctor_id",  $user_id)
        ->select("fname", "lname" , "from", "to", "date", "title", "duration")->get();

        return response()->json([
            "appointmentsAsPatient" => $userAppoinAsPatient,
            "appointmentsAsDoctor" => $userAppoinAsDoctor
        ]);
    }

}


function getAvailableDurations($workPeriods, $dayAppointments) {

    $availDurations = array();
    $appoinIndex = 0;


    foreach( $workPeriods as $period) {
        $start = $period->from;

        while ($start < $period->to) {
            $addedHour = date('H:i:s', strtotime($start . '+ 1 hours'));
            $crntAppoin = $dayAppointments[$appoinIndex];

            if ($start <= $crntAppoin->from) {

                if ($addedHour <= $crntAppoin->from && $addedHour < $period->to) {
                    array_push($availDurations, array($start, $addedHour));
                    $start = $addedHour;
                }
                else {
                    array_push($availDurations, array($start, $crntAppoin->from));
                    $start = $crntAppoin->to;
                    $appoinIndex++;
                }
                echo $start . " ";
            }
            else {
                $start = $crntAppoin->to;
                $appoinIndex++;
            }
        }
    }
    return $availDurations;
}
