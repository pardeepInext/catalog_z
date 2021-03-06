<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = ['nature', 'sports', 'architectural', 'wedding', 'fashion'];
        foreach ($names as $name) {
            Category::create(['name' => $name]);
        }
    }
}
