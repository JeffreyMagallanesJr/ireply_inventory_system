<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Employee;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            'id_number' => $this->faker->unique()->numerify('EMP###'), // Generates EMP123, EMP456, etc.
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'contact_number' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'department' => $this->faker->randomElement(['HR', 'IT', 'Finance', 'Marketing', 'Sales']),
            'position' => $this->faker->jobTitle(),
            'date_hired' => $this->faker->date(),
        ];
    }
}
