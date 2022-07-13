<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// controllers
use App\Http\Controllers\JWTController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\DoctorsController;
use App\Http\Controllers\Account_requestsController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\FollowingsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => 'api'], function($router) {
    Route::post('/register', [JWTController::class, 'register']);
    Route::post('/login', [JWTController::class, 'login']);
    Route::post('/logout', [JWTController::class, 'logout']);
    Route::post('/refresh', [JWTController::class, 'refresh']);
    Route::post('/profile', [JWTController::class, 'profile']);
});


// get top 5 doctors
Route::get("/users/top-five-doctors", [DoctorsController::class, 'getTopDoctors']);

// add doctor account request on the waiting-list
Route::post("/users/doctor-account-request", [Account_requestsController::class, 'doctorSignUp']);

// get selected doctor's info
Route::get("/users/{doctor_id}", [DoctorsController::class, "getDoctorInfo"]);

// get selected specialization's doctors
Route::get("/{specialization}/doctors", [DoctorsController::class, "specialityDoctors"]);

// get doctor's blogs
Route::get("/users/{doctor_id}/blogs", [BlogsController::class, "getBlogs"]);

// routes grouped under a middleware that requires the user not to be the owner of the account when visiting a profile page
Route::group(["middleware" => "verifyAuth"], function () {
    Route::post("/users/{doctor_id}/follow", [FollowingsController::class, "followDoctor"]);
    Route::post("/users/{doctor_id}/unfollow", [FollowingsController::class, "unFollowDoctor"]);
});

Route::group(["middleware" => "verifyOwnership"], function () {
    Route::post("/users/{user_id}/update-info", [UsersController::class, "updateUserInfo"]);
});

