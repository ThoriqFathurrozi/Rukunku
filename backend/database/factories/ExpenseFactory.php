<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = Category::where('type', 'expense')->get()->random();

        return [
            'date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'total' => $this->faker->randomFloat(2, 1, 1000),
            'description' => $this->faker->sentence(),
            'foreign_category_id' => $category->category_id,
        ];
    }
}
