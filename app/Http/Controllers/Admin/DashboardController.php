<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\JobTitle;
use App\Models\Patient;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        $appointmentsToday = Appointment::whereDate('appointment_start_time', $today)
            ->count();

        $appointmentsThisMonth = Appointment::whereBetween('appointment_start_time', [
            $startOfMonth,
            $endOfMonth,
        ])->count();

        $totalPatients = Patient::count();
        $totalStaff = Staff::count();

        $appointments = Appointment::with([
            'patient',
            'staff.jobTitle',
        ])
            ->orderByDesc('appointment_start_time')
            ->limit(10)
            ->get();

        $doctorRole = JobTitle::where('title', 'Doctor')->first();
        $doctors = Staff::with(['user', 'jobTitle'])
            ->when($doctorRole, function ($query) use ($doctorRole) {
                return $query->where('job_title_id', $doctorRole->id);
            })
            ->get();

        return Inertia::render('admin/dashboard/dashboard', [
            'appointmentsToday' => $appointmentsToday,
            'appointmentsThisMonth' => $appointmentsThisMonth,
            'totalPatients' => $totalPatients,
            'totalStaff' => $totalStaff,
            'appointments' => $appointments,
            'doctors' => $doctors,
        ]);
    }
}
