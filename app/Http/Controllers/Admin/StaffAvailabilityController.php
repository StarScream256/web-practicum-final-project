<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use App\Models\StaffAvailability;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffAvailabilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $staffs = Staff::with(['user', 'jobTitle'])
        //     ->withCount('availabilities')
        //     ->get();

        // return Inertia::render('admin/staffAvailability/index', [
        //     'staffs' => $staffs,
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Not needed since using modal in show page
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $thirtyMinuteInterval = function (
            string $attribute,
            mixed $value,
            \Closure $fail,
        ) {
            $parts = explode(':', $value);

            if (count($parts) >= 2 && !in_array($parts[1], ['00', '30'])) {
                $fail(
                    "The {$attribute} must be on a 30-minute interval (e.g., 09:00 or 09:30).",
                );
            }
        };

        $validatedData = $request->validate([
            'staff_id' => ['required', 'exists:staffs,id'],
            'day_of_week' => [
                'required',
                'string',
                'in:sunday,monday,tuesday,wednesday,thursday,friday,saturday',
            ],
            'start_time' => [
                'required',
                'date_format:H:i',
                'before:end_time',
                $thirtyMinuteInterval,
            ],
            'end_time' => [
                'required',
                'date_format:H:i',
                'after:start_time',
                $thirtyMinuteInterval,
            ],
            'note' => ['nullable', 'string', 'max:255'],
        ]);

        StaffAvailability::create($validatedData);

        return redirect()
            ->back()
            ->with('success', 'Schedule added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Staff $staff)
    {
        $staff->load(['user', 'jobTitle']);

        return Inertia::render('admin/staffAvailability/show', [
            'staff' => $staff,
            'availabilities' => StaffAvailability::where('staff_id', $staff->id)
                ->orderByRaw(
                    "FIELD(day_of_week, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')",
                )
                ->orderBy('start_time')
                ->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StaffAvailability $availability)
    {
        // Not needed since using modal in show page
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StaffAvailability $availability)
    {
        $thirtyMinuteInterval = function (
            string $attribute,
            mixed $value,
            \Closure $fail,
        ) {
            $parts = explode(':', $value);

            if (count($parts) >= 2 && !in_array($parts[1], ['00', '30'])) {
                $fail(
                    "The {$attribute} must be on a 30-minute interval (e.g., 09:00 or 09:30).",
                );
            }
        };

        $validatedData = $request->validate([
            'staff_id' => ['required', 'exists:staffs,id'],
            'day_of_week' => [
                'required',
                'string',
                'in:sunday,monday,tuesday,wednesday,thursday,friday,saturday',
            ],
            'start_time' => [
                'required',
                'date_format:H:i',
                'before:end_time',
                $thirtyMinuteInterval,
            ],
            'end_time' => [
                'required',
                'date_format:H:i',
                'after:start_time',
                $thirtyMinuteInterval,
            ],
            'note' => ['nullable', 'string', 'max:255'],
        ]);

        $availability->update($validatedData);

        return redirect()
            ->back()
            ->with('success', 'Schedule updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StaffAvailability $availability)
    {
        $availability->delete();

        return redirect()
            ->back()
            ->with('success', 'Schedule deleted successfully.');
    }
}
