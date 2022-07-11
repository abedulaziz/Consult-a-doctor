<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class Doctor_specificFactory extends Factory
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
            'speciality' => $this->faker->randomElement(["cardiology", "ear, nose, and throat", "endocrinology and metabolic disorders", "oncology", "denistry", "neurology", "nephrology", "orthopedics", "family medicine", "internal medicine", "allergy and immunology", "gastroenterology and hepatology"]),
            'rate' => $this->faker->randomFloat(1, 1, 5),
            'about' => $this->faker->text(30),
            'background_img' =>"1234213512354",
            'university' =>$this->faker->name()
        ];
    }
}
