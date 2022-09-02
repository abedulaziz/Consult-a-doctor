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
            "profile_pic" => 'image|max:1000|nullable'
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
                "background_pic" => "image"
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $backgroundImgURI = generateURIPath($request, "background_pic");
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


    public function getWorkingWeekdays($doctor_id) {

        $doctorWorkingWeekdays = User::find($doctor_id)->getDoctorAvailabilities()->distinct()->pluck("week_day")->all();

        return response()->json([
            "working_weekdays" => $doctorWorkingWeekdays
        ]);
    }

    // check the availability of the doctor on the selected date
    public function checkDayAvailability(Request $req, $doctor_id) {
        $week_day = $req->week_day;

        $workPeriods = User::find($doctor_id)->getDoctorAvailabilities()->where("week_day", $week_day)->select("from", "to")->orderBy("from", "asc")->get();
        if (!count($workPeriods)) return response()->json(["message" => "Doctor is not available on this time."], 404);

        $scheduledPeriods = Appointment::where([["date", $req->date], ["patient_id", $doctor_id]])->orWhere([["date", $req->date], ["doctor_id", $doctor_id]])->select("from", "to", )->orderBy("from", "asc")->get();

        return response()->json([
            "available_periods" => getAvailabilities($workPeriods, $scheduledPeriods)
        ], 200);
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

}

function getAvailabilities($workPeriods, $scheduledPeriods) {

    $availabilities = array();
    $currScheduledIndex = 0;

    foreach($workPeriods as $period) {

        $from = $period['from'];
        $to = $period['to'];
        $start = $from;

        while (strtotime($start) < strtotime($to)) {
            $availableduration = array();
            $addTwentyMin = date('H:i:s', (strtotime($start) + 1200));

            if ($currScheduledIndex == count($scheduledPeriods) or $addTwentyMin <= $scheduledPeriods[$currScheduledIndex]["from"]) {

                $availableduration = [$start, $addTwentyMin];
                array_push($availabilities, $availableduration);
            }

            else if ($addTwentyMin >= $scheduledPeriods[$currScheduledIndex]["to"])

                $currScheduledIndex < count($scheduledPeriods) && $currScheduledIndex++;

            $start = $addTwentyMin;
        }
    }
    return $availabilities;
}


function generateURIPath($request, $file) {
    $imageURI = null;

    if ($request->hasFile($file)) {
        $profilePicture = $request->file($file);
        $imageName = $profilePicture->getClientOriginalName();

        $path = "/storage/user_images/";
        $profilePicture->move(public_path($path), $imageName);

        $imageURI = asset($path . $imageName);
    }

    return $imageURI;
}
