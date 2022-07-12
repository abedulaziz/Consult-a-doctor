<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Account_request;
use Validator;

use Illuminate\Validation\Rules\Enum;

enum Gender: string {
    case MALE = "male";
    case FEMALE = "female";
}

class Account_requestsController extends Controller
{

    public function doctorSignUp(Request $request ) {

        $validator = Validator::make($request->all(), [
            'fname' => 'required|string|min:2|max:50',
            'lname' => 'required|string|min:2|max:50',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'date_of_birth' => 'required|date',
            'gender' => ["required", new Enum(Gender::class)],
            'profile_pic' => 'required|string',
            'speciality' => 'required|string',
            'about' => 'required|string',
            'university' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        Account_request::create([
            "fname" => $request->fname,
            "lname" => $request->lname,
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "gender" => $request->gender,
            "date_of_birth" => $request->date_of_birth,
            "profile_pic" => $request->profile_pic,
            "speciality" => $request->speciality,
            "about" => $request->about,
            "university" => $request->university,
        ]);

        return response()->json([
            "message" => "Request sent successfuly"
        ]);
    }
}
