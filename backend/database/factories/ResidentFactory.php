<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resident>
 */
class ResidentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => $this->faker->name(),
            'identification_card_img' => "https://picsum.photos/800/600",
            'maritial_status' => $this->faker->randomElement(['single', 'married', 'divorced', 'widowed']),
            'phone_number' => $this->faker->phoneNumber(),
            'resident_status' => $this->faker->randomElement(['contract', 'permanent']),
        ];
    }
}
