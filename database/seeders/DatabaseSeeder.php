<?php

namespace Database\Seeders;

use App\Models\JobTitle;
use App\Models\Role;
use App\Models\Staff;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([RoleSeeder::class, JobTitleSeeder::class]);

        $this->call([AdminUserSeeder::class, UserSeeder::class]);
    }
}
