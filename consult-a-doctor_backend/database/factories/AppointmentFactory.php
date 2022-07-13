<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AppointmentFactory extends Factory
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
            'patient_id' => $this->faker->numberBetween(1, 20),
            'title' => $this->faker->words(3, true),
            'date' => $this->faker->date(),
            'from' => $this->faker->time(),
            'to' => $this->faker->time(),
            'duration' => 5
        ];
    }
}
