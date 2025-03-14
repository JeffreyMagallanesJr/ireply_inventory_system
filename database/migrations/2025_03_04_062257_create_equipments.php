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
        Schema::create('equipments', function (Blueprint $table) {
            $table->id(); // Automatically creates an 'id' column as primary key
            $table->string('item');
            $table->text('specs');
            $table->text('description');
            $table->string('serial_number')->unique(); // Ensures serial numbers are unique
            $table->date('stored_date');
            $table->enum('status', ['available', 'unavailable'])->default('available');
            $table->integer('quantity')->default(1); // Added quantity column with a default value
            $table->timestamps(); // Adds created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipments');
    }
};
