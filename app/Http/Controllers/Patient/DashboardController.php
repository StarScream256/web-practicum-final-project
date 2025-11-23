<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $patient = Patient::where('user_id', Auth::id())->first();
        $nextAppointment = Appointment::with('staff')
            ->where('patient_id', $patient->id)
            ->where('status', 'scheduled')
            ->orderBy('appointment_end_time', 'asc')
            ->first();
        $scheduledAppointmet = Appointment::where('patient_id', $patient->id)
            ->where('status', 'scheduled')
            ->count();
        $completedAppointmet = Appointment::where('patient_id', $patient->id)
            ->where('status', 'completed')
            ->count();

        return Inertia::render('patient/dashboard/dashboard', [
            'nextAppointment' => $nextAppointment,
            'scheduledAppointment' => $scheduledAppointmet,
            'completedAppointment' => $completedAppointmet,
        ]);
    }
}
