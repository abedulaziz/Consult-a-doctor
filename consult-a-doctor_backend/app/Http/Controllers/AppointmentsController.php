<?php

namespace App\Http\Controllers;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

use App\Models\Appointment;
use App\Models\User;
use Validator;

class AppointmentsController extends Controller
{
    public function meetingData(Request $request, $meeting_id) {

        $user_id = auth()->id();

        $meetingInfo = Appointment::find($meeting_id);

        if ($meetingInfo->doctor_id == $user_id or $meetingInfo->patient_id == $user_id) {

            $isDoctor =$meetingInfo->doctor_id == $user_id ? true : false;

            $meetingInfo->update([$isDoctor ? "fir_party_meeting_id" : "sec_party_meeting_id" => $request->user_meeting_id]);

            $users = User::select("id", "fname", "lname", "profile_pic_uri")->findMany([$meetingInfo->doctor_id, $meetingInfo->patient_id]);

            return response()->json([
                "my_info" => $users[$isDoctor ? 1:0],
                "sec_party_info" => $users[$isDoctor ? 0:1],
                "second_party_meeting_id" => $meetingInfo->doctor_id == $user_id ? $meetingInfo->sec_party_meeting_id : $meetingInfo->fir_party_meeting_id
            ], 200);
        }
        else {
            return response()->json([
                "message" => "You're unauthorized"
            ], 403);
        }
    }


    public function setAppointment(Request $request) {

        $validator = Validator::make($request->all(), [
            'date' => 'required|date|after_or_equal:today',
            'title' => 'required|string|min:5|max:50',
            "duration" => ['required', Rule::in(['5', '10', '20'])]
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $newAppointment = new Appointment;
        $newAppointment->doctor_id = $request->doctor_id;
        $newAppointment->patient_id = $request->patient_id;
        $newAppointment->title = $request->title;
        $newAppointment->date = $request->date;
        $newAppointment->from = $request->from;
        $newAppointment->to = $request->to;
        $newAppointment->duration = $request->duration;

        $newAppointment->save();

        return response()->json([
            "message" => "Appointment booked successfuly"
        ], 200);
    }
}
