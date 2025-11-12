<?php

namespace Database\Seeders;

use App\Models\Patient;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userRole = Role::where('name', 'user')->first();

        $user = User::firstOrCreate(
            ['email' => 'geto@example.com'],
            [
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role_id' => $userRole->id,
            ],
        );

        Patient::firstOrCreate(
            ['user_id' => $user->id],
            [
                'name' => 'Geto Suguru',
                'gender' => 'male',
                'phone' => '08123456789',
                'dob' => now()->subYears(30)->format('Y-m-d'),
                'address' => '128 Innovation Drive, South Park Avenue',
            ],
        );
    }
}
