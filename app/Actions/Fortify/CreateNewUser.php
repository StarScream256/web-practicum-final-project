<?php

namespace App\Actions\Fortify;

use App\Models\Patient;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'phone' => ['required', 'numeric'],
            'address' => ['required'],
            'gender' => ['required'],
            'dob' => ['required', 'date'],
            'password' => $this->passwordRules(),
        ])->validate();

        return DB::transaction(function () use ($input) {
            $role = Role::where('role', 'user')->first();
            $user = User::create([
                'email' => $input['email'],
                'password' => $input['password'],
                'role_id' => $role->id,
            ]);

            Patient::create([
                'user_id' => $user->id,
                'name' => $input['name'],
                'phone' => $input['phone'],
                'gender' => $input['gender'],
                'dob' => $input['dob'],
                'address' => $input['address'],
            ]);

            return $user;
        });
    }
}
