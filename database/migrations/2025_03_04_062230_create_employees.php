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
        Schema::create('employees', function (Blueprint $table) {
            $table->id('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('id_number');
            $table->string('email');
            $table->string('address');
            $table->string('contact_number');
            $table->string('department');
            $table->string('position');
            $table->date(column:'date_hired');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
