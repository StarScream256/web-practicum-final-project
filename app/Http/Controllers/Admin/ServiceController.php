<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/services/index', [
            'services' => Service::get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // no need, use modal
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable'],
            'duration_minutes' => ['required', 'integer'],
            'cost' => ['required', 'numeric'],
        ]);

        Service::create([
            'name' => $request->name,
            'description' => $request->description,
            'duration_minutes' => $request->duration_minutes,
            'cost' => $request->cost,
        ]);

        return to_route('admin.service.index')->with(
            'success',
            'New service has been added',
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
    public function update(Request $request, Service $service)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'duration_minutes' => ['required', 'integer'],
            'cost' => ['required', 'numeric'],
        ]);

        $service->update([
            'name' => $request->name,
            'description' => $request->description,
            'duration_minutes' => $request->duration_minutes,
            'cost' => $request->cost,
        ]);

        return to_route('admin.service.index')->with(
            'success',
            'Service has been updated.',
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        try {
            $service->delete();

            return to_route('admin.service.index')->with(
                'success',
                'Service has been deleted.',
            );
        } catch (\Illuminate\Database\QueryException $e) {
            // foreign key constraint or related records preventing deletion
            return to_route('admin.service.index')->with(
                'error',
                'Service could not be deleted. It may be referenced by other records.',
            );
        } catch (\Exception $e) {
            return to_route('admin.service.index')->with(
                'error',
                'An unexpected error occurred while deleting the service.',
            );
        }
    }
}
