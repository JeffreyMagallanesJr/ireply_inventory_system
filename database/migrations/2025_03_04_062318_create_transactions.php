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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('user_id')->unique();
            $table->foreignId('employee_id');
            $table->foreignId('equipment_id')->unique();
            $table->enum('status',['released', 'returned','lost']);
            $table->enum('release_mode',['on_site', 'take_home']);
            $table->enum('release_state',['good_condition', 'brand_new', 'damaged']);
            $table->date('release_date');
            $table->enum('return_state',['good_condition', 'brand_new', 'damaged']);
            $table->date('return_date');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('employee_id')->references('id')->on('employees');
            $table->foreign('equipment_id')->references('id')->on('equipments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
