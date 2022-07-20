<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AvailabilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'doctor_id' => $this->faker->numberBetween(1, 20),
            "week_day" => $this->faker->randomElement(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]),
            "from" => $this->faker->time,
            "to" => $this->faker->time,
        ];
    }
}
