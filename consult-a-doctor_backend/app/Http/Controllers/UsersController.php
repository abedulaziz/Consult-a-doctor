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
}
