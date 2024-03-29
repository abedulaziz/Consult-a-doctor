<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// controllers
use App\Http\Controllers\JWTController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\SpecializationsController;
use App\Http\Controllers\DoctorsController;
use App\Http\Controllers\Account_requestsController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\FollowingsController;
use App\Http\Controllers\AppointmentsController;


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
Route::get("/users/top-four-doctors", [DoctorsController::class, 'getTopDoctors']);

// add doctor account request on the waiting-list
Route::post("/users/doctor-account-request", [Account_requestsController::class, 'doctorSignUp']);

// get doctor account requests
Route::get("/users/get-doctor-account-requests", [Account_requestsController::class, 'getAccountRequests']);

// get selected specialization's doctors
Route::get("/{specialization_id}/doctors", [DoctorsController::class, "specialityDoctors"]);

//get specializations
Route::get("/specializations", [SpecializationsController::class, "getSpecializations"]);

// get doctor's blogs
Route::get("/users/{doctor_id}/blogs", [BlogsController::class, "getBlogs"]);


// routes grouped under a middleware that requires the user not to be the owner of the account when visiting a profile page
Route::group(["middleware" => "verifyAuth"], function () {
    Route::get("/users/{doctor_id}/follow", [FollowingsController::class, "followDoctor"]);
    Route::get("/users/{doctor_id}/unfollow", [FollowingsController::class, "unFollowDoctor"]);
    Route::get("/users/{doctor_id}/working-weekdays", [UsersController::class, "getWorkingWeekdays"]);
    Route::post("/users/{doctor_id}/check-availability", [UsersController::class, "checkDayAvailability"]);
    Route::post("/users/{doctor_id}/available-periods", [UsersController::class, "getAvailablePeriods"]);
    Route::post("/meetings/{meeting_id}", [AppointmentsController::class, "meetingData"]);
    Route::post("/meetings/appointments/set-appointment", [AppointmentsController::class, "setAppointment"]);
    // get selected doctor's info
    Route::get("/users/{doctor_id}/doctor-info", [DoctorsController::class, "getDoctorInfo"]);
    Route::get("/isAuthenticated", function() {return response()->json(["message" => "Authenticated"], 200);});
});

Route::group(["middleware" => "verifyOwnership"], function () {
    Route::post("/users/{user_id}/update-info", [UsersController::class, "updateUserInfo"]);
    Route::get("/users/{user_id}/appointments", [UsersController::class, "getUserAppointments"]);
    Route::post("/users/{user_id}/add-blog", [BlogsController::class, "addBlog"]);
    Route::post("/users/{user_id}/upload-profile-picture", [UsersController::class, "uploadProfilePic"]);
});

Route::group(["middleware" => "authAdmin"], function() {
    Route::post("/admins/new-specialization", [SpecializationsController::class, "addNewSpecialization"]);
    Route::delete("/admins/delete-specialization/{specialization_id}", [SpecializationsController::class, "deleteSpecialization"]);
    Route::delete("/users/{account_req_id}/deny", [Account_requestsController::class, 'denyRequest']);
    Route::post("/users/{account_req_id}/accept", [Account_requestsController::class, 'acceptRequest']);
});
