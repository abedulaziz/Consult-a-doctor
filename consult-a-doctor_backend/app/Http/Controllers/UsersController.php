<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    public function updateUserInfo(Request $request, $user_id) {

        if ($request->type == "patient") {
            User::find($user_id)->update([
                "fname" => $request->fname,
                "lname" => $request->lname,
                "date_of_birth" => $request->date_of_birth,
                "phone_num" => $request->fname,
                "fname" => $request->fname,
            ]);
        }
    }
}
