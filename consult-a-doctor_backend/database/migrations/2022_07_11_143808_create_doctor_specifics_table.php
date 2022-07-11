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
        Schema::create('doctor_specifics', function (Blueprint $table) {
            $table->id();
            $table->integer("doctor_id");
            $table->enum("speciality", array("cardiology", "ear, nose, and throat", "endocrinology and metabolic disorders", "oncology", "denistry", "neurology", "nephrology", "orthopedics", "family medicine", "internal medicine", "allergy and immunology", "gastroenterology and hepatology"));
            $table->float('rate', 9, 1);
            $table->text('about');
            $table->binary('background_img');
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
        Schema::dropIfExists('doctor_specifics');
    }
};
