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

            $secPartyMeetingID = null;
            if (!$meetingInfo->fir_party_meeting_id) {

                $meetingInfo->update(["fir_party_meeting_id" => $request->user_meeting_id]);
            }

            else {
                $secPartyMeetingID = $meetingInfo->fir_party_meeting_id;
                $meetingInfo->update(["sec_party_meeting_id" => $request->user_meeting_id]);

            }

            $users = User::select("id", "fname", "lname", "profile_pic")->findMany([$meetingInfo->patient_id, $meetingInfo->doctor_id]);

            return response()->json([
                "meeting_info" => $users,
                "second_party_meeting_id" => $secPartyMeetingID
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
