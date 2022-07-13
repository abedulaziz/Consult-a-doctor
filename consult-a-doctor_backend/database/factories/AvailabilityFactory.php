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
            'monday' => json_encode([
                "period" => [
                    "from" => $this->faker->randomElement(["08:30:00", "09:28:00", "10:30:00"]),
                    "to" => $this->faker->randomElement(["18:30:00", "19:03:00", "20:00:00"])
                ]
            ]),
            'tuesday' => json_encode([
                "period" => [
                    "from" => $this->faker->randomElement(["08:30:00", "09:28:00", "10:30:00"]),
                    "to" => $this->faker->randomElement(["18:30:00", "19:03:00", "20:00:00"])
                ]
            ]),
            'wednesday' => json_encode([
                "period" => [
                    "from" => $this->faker->randomElement(["08:30:00", "09:28:00", "10:30:00"]),
                    "to" => $this->faker->randomElement(["18:30:00", "19:03:00", "20:00:00"])
                ]
            ]),
            'thursday' => json_encode([
                "period" => [
                    "from" => $this->faker->randomElement(["08:30:00", "09:28:00", "10:30:00"]),
                    "to" => $this->faker->randomElement(["18:30:00", "19:03:00", "20:00:00"])
                ]
            ]),
            'friday' => json_encode([
                "period" => [
                    "from" => $this->faker->randomElement(["08:30:00", "09:28:00", "10:30:00"]),
                    "to" => $this->faker->randomElement(["18:30:00", "19:03:00", "20:00:00"])
                ]
            ]),
            'date' => $this->faker->date(),
        ];
    }
}
