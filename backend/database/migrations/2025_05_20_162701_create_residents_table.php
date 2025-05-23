<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('residents', function (Blueprint $table) {
            $table->id("resident_id")->autoIncrement();
            $table->string("full_name");
            $table->string("identification_card_img");
            $table->enum("maritial_status", ["single", "married", "divorced", "widowed"])->default("single");
            $table->string("phone_number");
            $table->enum("resident_status", ["contract", "permanent"])->default("contract");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
