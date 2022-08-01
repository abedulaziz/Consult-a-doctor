<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\User;

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

            $users = User::select("fname", "lname", "profile_pic")->findMany([$meetingInfo->patient_id, $meetingInfo->doctor_id]);

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
}
