<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Equipment;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipment>
 */
class EquipmentFactory extends Factory
{
    protected $model = Equipment::class;

    public function definition(): array
    {
        return [
            'item' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'serial_number' => $this->faker->unique()->bothify('SN-#####'),
            'stored_date' => $this->faker->date(),
            'status' => $this->faker->randomElement(['Available', 'Unavailable']),
            'quantity' => $this->faker->numberBetween(1, 50),
        ];
    }
}
