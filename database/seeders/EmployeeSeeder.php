<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Insert multiple fake employee records
        foreach (range(1, 10) as $index) { // Change 10 to whatever number of records you need
            DB::table('employees')->insert([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'id_number' => $faker->unique()->numberBetween(100000, 999999),
                'email' => $faker->unique()->safeEmail,
                'address' => $faker->address,
                'contact_number' => $faker->phoneNumber,
                'department' => $faker->word,
                'position' => $faker->word,
                'date_hired' => $faker->date(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
