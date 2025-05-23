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
        Schema::create('house_residents', function (Blueprint $table) {
            $table->id("house_resident_id")->autoIncrement();
            $table->timestamp("start_date");
            $table->timestamp("end_date")->nullable();
            $table->foreignId("foreign_house_id")->constrained("houses", "house_id")->onDelete("cascade");
            $table->foreignId("foreign_resident_id")->constrained("residents", "resident_id")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('house_residents');
    }
};
