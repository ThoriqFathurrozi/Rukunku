<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Expense;
use App\Models\House;
use App\Models\HouseResident;
use App\Models\Payment;
use App\Models\Resident;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            CategorySeeder::class,
        ]);

        // Category::factory(10)->create();
        // Resident::factory(10)->create();
        // House::factory(count: 10)->create();
        // HouseResident::factory(20)->create();
        // Payment::factory(30)->create();
        // Expense::factory(20)->create();
    }
}
