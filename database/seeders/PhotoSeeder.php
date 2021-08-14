<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Photo;

class PhotoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 16; $i++) {
            $path = $i < 10 ? "img-0$i.jpg" : "img-$i.jpg";
            Photo::create(['name' => "Photo $i", 'path' => $path, 'category_id' => rand(1, 5)]);
        }
    }
}
