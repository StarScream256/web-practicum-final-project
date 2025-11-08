<?php

namespace Database\Seeders;

use App\Models\Role;
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
        // User::factory(10)->create();

        // User::firstOrCreate(
        //     ['email' => 'test@example.com'],
        //     [
        //         'password' => Hash::make('password'),
        //         'email_verified_at' => now(),
        //     ],
        // );

        Role::firstOrCreate(['role' => 'admin']);
        Role::firstOrCreate(['role' => 'user']);
    }
}
