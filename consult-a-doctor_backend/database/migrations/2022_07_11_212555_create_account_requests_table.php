<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('account_requests', function (Blueprint $table) {
            $table->id();
            $table->string('fname');
            $table->string('lname');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('gender', array("male", "female"));
            $table->date('date_of_birth');
            $table->binary('profile_pic');
            $table->enum("speciality", array("cardiology", "ear, nose, and throat", "endocrinology and metabolic disorders", "oncology", "denistry", "neurology", "nephrology", "orthopedics", "family medicine", "internal medicine", "allergy and immunology", "gastroenterology and hepatology"));
            $table->text('about');
            $table->string('university');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('account_requests');
    }
};