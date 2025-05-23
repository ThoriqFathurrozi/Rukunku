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
        Schema::create('payments', function (Blueprint $table) {
            $table->id("payment_id")->autoIncrement();
            $table->text("description")->nullable();
            $table->timestamp("payment_date");
            $table->bigInteger("total_payment");
            $table->integer("total_month")->default(1);
            $table->enum("status", ["paid", "unpaid"])->default("unpaid");
            $table->foreignId("foreign_resident_id")->constrained("residents", "resident_id")->onDelete("cascade");
            $table->foreignId("foreign_house_id")->constrained("houses", "house_id")->onDelete("cascade");
            $table->foreignId("foreign_category_id")->constrained("categories", "category_id")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
