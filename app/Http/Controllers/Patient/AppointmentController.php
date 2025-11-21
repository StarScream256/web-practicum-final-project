<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\JobTitle;
use App\Models\Patient;
use App\Models\Service;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('patient/appointment/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $doctor_role = JobTitle::where('title', 'Doctor')->first();
        $doctors = Staff::with('availabilities')
            ->where('job_title_id', $doctor_role->id)
            ->get();
        return Inertia::render('patient/appointment/create', [
            'doctors' => $doctors,
            'appointments' => Appointment::all(),
            'services' => Service::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'staff_id' => 'required|exists:staffs,id',
            'services' => 'nullable|array',
            'services.*' => 'exists:services,id',
            'appointment_start_time' => 'required|date|after:now',
            'appointment_end_time' =>
                'required|date|after:appointment_start_time',
            'notes' => 'nullable|string|max:1000',
        ]);

        $hasConflict = Appointment::where('staff_id', $request->staff_id)
            ->where(function ($query) use ($request) {
                $query
                    ->where(
                        'appointment_start_time',
                        '<',
                        $request->appointment_end_time,
                    )
                    ->where(
                        'appointment_end_time',
                        '>',
                        $request->appointment_start_time,
                    );
            })
            ->exists();

        if ($hasConflict) {
            return back()->withErrors([
                'appointment_start_time' =>
                    'Sorry, this time slot was just booked by another patient. Please choose another time.',
            ]);
        }

        DB::transaction(function () use ($request, $validated) {
            $patient = Patient::where('user_id', Auth::id())->first();
            $appointment = Appointment::create([
                'patient_id' => $patient->id,
                'staff_id' => $validated['staff_id'],
                'appointment_start_time' =>
                    $validated['appointment_start_time'],
                'appointment_end_time' => $validated['appointment_end_time'],
                'notes' => $validated['notes'] ?? null,
                'status' => 'scheduled',
            ]);

            if (!empty($validated['services'])) {
                $services = Service::whereIn(
                    'id',
                    $validated['services'],
                )->get();
                $pivotData = [];
                foreach ($services as $service) {
                    $pivotData[$service->id] = [
                        'price' => $service->cost,
                        'quantity' => 1,
                        'added_by' => 'patient',
                        'notes' => null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                $appointment->services()->attach($pivotData);
            }
        });

        return to_route('patient.appointment.index')->with(
            'success',
            'Appointment has been created',
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
