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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->integer("doctor_id");
            $table->integer("patient_id");
            $table->string("fir_party_meeting_id")->nullable();
            $table->string("sec_party_meeting_id")->nullable();
            $table->string("title");
            $table->date("date");
            $table->time("from");
            $table->time("to");
            $table->integer("duration");
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
        Schema::dropIfExists('appointments');
    }
};
