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
            $table->integer("speciality_id");
            $table->float('rate', 9, 1);
            $table->text('about');
            $table->string('background_img_uri')->nullable();
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
