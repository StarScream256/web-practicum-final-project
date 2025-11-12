<?php

namespace Database\Seeders;

use App\Models\JobTitle;
use App\Models\Role;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $doctorJobTitle = JobTitle::where('title', 'Doctor')->first();
        $receptionistJobTitle = JobTitle::where(
            'title',
            'Receptionist',
        )->first();
        $managerJobTitle = JobTitle::where('title', 'Manager')->first();

        $doctor1 = User::firstOrCreate(
            ['email' => 'drtirta@example.com'],
            [
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role_id' => $adminRole->id,
            ],
        );

        $doctor2 = User::firstOrCreate(
            ['email' => 'drmike@example.com'],
            [
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role_id' => $adminRole->id,
            ],
        );

        $receptionist = User::firstOrCreate(
            ['email' => 'receptionist@example.com'],
            [
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role_id' => $adminRole->id,
            ],
        );

        $manager = User::firstOrCreate(
            ['email' => 'manager@example.com'],
            [
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role_id' => $adminRole->id,
            ],
        );

        Staff::firstOrCreate(
            ['user_id' => $doctor1->id],
            [
                'name' => 'Tirta Mandira Hudhi',
                'job_title_id' => $doctorJobTitle->id,
                'salutation' => 'dr.',
                'specialization' => 'THT Doctor',
            ],
        );

        Staff::firstOrCreate(
            ['user_id' => $doctor2->id],
            [
                'name' => 'Mike Johnson',
                'job_title_id' => $doctorJobTitle->id,
                'salutation' => 'dr.',
                'specialization' => 'General Purpose Doctor',
            ],
        );

        Staff::firstOrCreate(
            ['user_id' => $receptionist->id],
            [
                'name' => 'Elon Musk',
                'job_title_id' => $receptionistJobTitle->id,
                'specialization' => 'Administrative',
            ],
        );

        Staff::firstOrCreate(
            ['user_id' => $manager->id],
            [
                'name' => 'John Elkann',
                'job_title_id' => $managerJobTitle->id,
                'specialization' => 'Managerial',
                'salutation' => 'MBA',
            ],
        );
    }
}
