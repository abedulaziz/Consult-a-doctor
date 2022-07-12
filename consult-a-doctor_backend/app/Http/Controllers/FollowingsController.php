<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Following;

class FollowingsController extends Controller
{
    public function followDoctor($doctor_id) {

        $followingInsertion = Following::firstOrCreate([
            "follower_id" => auth()->id(),
            "doctor_id" => $doctor_id
        ]);


        return response()->json([
            "message" => $followingInsertion
        ]);
    }


    public function unFollowDoctor($doctor_id) {

        $deletedFollowing = Following::where("follower_id", auth()->id())
        ->where("doctor_id", $doctor_id);

        $deletedFollowing->delete();

        return response()->json([
            "message" => "Following deleted successfully"
        ]);
    }
}
