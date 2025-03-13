<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'id' => 1,
            'first_name' => 'Jeffrey Jr',
            'last_name' => 'Magallanes',
            'username' => 'jeffreycmagjr',
            'email' => 'jeffreycmagjr@gmail.com',
            'email_verified_at' => null,
            'password' => Hash::make('password'), // Secure hashing
            'remember_token' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
