<?php

namespace Database\Seeders;

use App\Models\JobTitle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobTitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        JobTitle::firstOrCreate(['title' => 'Receptionist']);
        JobTitle::firstOrCreate(['title' => 'Doctor']);
        JobTitle::firstOrCreate(['title' => 'Manager']);
    }
}
