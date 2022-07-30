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
            'email' => 'required|string|email|max:100|unique:users|unique:account_requests',
            'password' => 'required|string|confirmed|min:6',
            'date_of_birth' => 'required|date',
            'gender' => ["required", new Enum(Gender::class)],
            'speciality' => 'required|string',
            'about' => 'required|string',
            'university' => 'required|string',
            'availabilities' => 'required|json'
        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $request->password = Hash::make($request->password);
        Account_request::create(request()->all());

        // $account->save();

        return response()->json([
            "message" => "Request sent successfuly"
        ]);
    }

    public function getAccountRequests() {

        $accountReq = Account_request::select("id", "fname", "lname", "email", "gender", "date_of_birth", "speciality", "about", "university", "created_at")->get();


        return response()->json([
            "account_requests" => $accountReq
        ]);
    }
}
