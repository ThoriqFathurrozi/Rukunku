<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\House;
use App\Models\Resident;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = Category::where('type', 'payment')->get()->random();
        $house = House::all()->random();
        $resident = Resident::all()->random();

        return [
            'description' => $this->faker->sentence(),
            'payment_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'total_payment' => $this->faker->randomNumber(4, true),
            'total_month' => $this->faker->numberBetween(1, 12),
            'status' => $this->faker->randomElement(['paid', 'unpaid']),
            'foreign_category_id' => $category->category_id,
            'foreign_house_id' => $house->house_id,
            'foreign_resident_id' => $resident->resident_id,
        ];
    }
}
