<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobTitle;
use App\Models\Role;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules;

class StaffController extends Controller
{
    public function index(): Response
    {
        $staff = Staff::with(['user', 'jobTitle'])->get();

        return Inertia::render('admin/staff/index', [
            'staff' => $staff,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/staff/create', [
            'jobTitles' => JobTitle::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                'unique:' . User::class,
            ],
            'password' => ['required', Rules\Password::defaults()],
            'name' => ['required', 'string', 'max:255'],
            'job_title_id' => ['required', 'exists:job_titles,id'],
            'salutation' => ['nullable'],
            'specialization' => ['required'],
            'picture' => ['nullable'],
            'bio' => ['nullable', 'string'],
        ]);

        $adminRole = Role::where('name', 'admin')->firstOrFail();

        DB::transaction(function () use ($request, $adminRole) {
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $adminRole->id,
            ]);

            $user->staff()->create([
                'name' => $request->name,
                'job_title_id' => $request->job_title_id,
                'specialization' => $request->specialization,
                'salutation' => $request->salutation,
                'bio' => $request->bio,
            ]);
        });

        return to_route('admin.staff.index')->with(
            'message',
            'Staff created successfully.',
        );
    }

    public function show(Staff $staff): Response
    {
        $staff->load(['user', 'jobTitle']);
        return Inertia::render('admin/staff/show', [
            'staff' => $staff,
        ]);
    }

    public function edit(Staff $staff): Response
    {
        $staff->load(['user', 'jobTitle']);
        return Inertia::render('admin/staff/edit', [
            'staff' => $staff,
            'jobTitles' => JobTitle::all(),
        ]);
    }

    public function update(Request $request, Staff $staff) {}

    public function destroy(Staff $staff) {}
}
