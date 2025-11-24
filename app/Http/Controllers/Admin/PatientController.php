<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PatientController extends Controller
{
    public function index(): Response
    {
        $patients = Patient::with('user')
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('admin/patients/index', [
            'patients' => $patients,
        ]);
    }


    public function show(Patient $patients): Response
    {
        $patients->load('user');
        return Inertia::render('admin/patients/show', [
            'patient' => $patients,
        ]);
    }

    public function edit(Patient $patients): Response
    {
        $patients->load('user');
        return Inertia::render('admin/patients/edit', [
            'patient' => $patients,
        ]);
    }

    public function update(Request $request, Patient $patients)
    {
        \Log::info('Patient update request', $request->all());

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:255'],
            'dob' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:male,female,other'],
        ]);

        $patients->update($validated);

        return to_route('admin.patients.index')->with(
            'success',
            'Patient updated'
        );
    }

    public function destroy(Patient $patients)
    {
        DB::transaction(function () use ($patients) {
            $user = $patients->user;
            $patients->delete();
            $user->delete();
        });
        return to_route('admin.patients.index')->with(
            'success',
            'Patient Delete Successfully'
        );
    }
}
