<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Account_request;
use App\Models\User;
use App\Models\Doctor_specific;
use App\Models\Availability;
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
            'speciality_id' => 'required|integer',
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

        $accountReq = Account_request::get();


        return response()->json([
            "account_requests" => $accountReq
        ]);
    }


    public function denyRequest($account_req_id) {
        Account_request::where([
            "id" => $account_req_id
        ])->delete();

        return response()->json([
            "message" => "Account request deleted successfully"
        ]);
    }
    public function acceptRequest(Request $request, $account_req_id) {

        $doctor = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            "date_of_birth" => $request->date_of_birth,
            "gender" => $request->gender
        ]);


        $availOptions = $request->only("availabilities");

        foreach($availOptions as $value) {
            $availData[] = $value;
            $value = json_decode($value);

            foreach ($value as $key => $val) {
                foreach ($val as $timeInterval) {
                    Availability::create([
                        "doctor_id" => $doctor->id,
                        "week_day" => $key,
                        "from" => $timeInterval[0],
                        "to" => $timeInterval[1]
                    ]);
                }
            }
        }

        Doctor_specific::create([
            'speciality_id' => $request->speciality_id,
            'about' => $request->about,
            'university' => $request->university,
            'doctor_id' => $doctor->id,
            'rate'=> 0
        ]);

        Account_request::where([
            "id" => $account_req_id
        ])->delete();

        return response()->json([
            "message" => "Account request accepted successfully"
        ]);
    }
}
