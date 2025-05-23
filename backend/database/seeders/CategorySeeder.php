<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Iuran Bulanan',
                'description' => 'Iuran rutin yang dibayarkan warga setiap bulan',
                'type' => 'payment',
            ],
            [
                'name' => 'Iuran Keamanan',
                'description' => 'Iuran untuk kebutuhan keamanan lingkungan',
                'type' => 'payment',
            ],
            [
                'name' => 'Iuran Kebersihan',
                'description' => 'Iuran untuk petugas kebersihan dan peralatan kebersihan',
                'type' => 'payment',
            ],
            [
                'name' => 'Pengeluaran Kegiatan RW',
                'description' => 'Dana yang digunakan untuk kegiatan warga RW',
                'type' => 'expense',
            ],
            [
                'name' => 'Dana Darurat',
                'description' => 'Kategori untuk pengeluaran tak terduga',
                'type' => 'expense',
            ],
        ];


        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
