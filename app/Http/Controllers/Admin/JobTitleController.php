<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobTitle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobTitleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/jobTitle/index', [
            'jobTitles' => JobTitle::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'string|required',
            'description' => 'string|nullable',
        ]);

        JobTitle::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return to_route('admin.job-title.index')->with(
            'success',
            'Job title has been created',
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
    public function update(Request $request, JobTitle $jobTitle)
    {
        $request->validate([
            'title' => 'string|required',
            'description' => 'string|nullable',
        ]);

        $jobTitle->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return to_route('admin.job-title.index')->with(
            'success',
            'Job title has been updated',
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobTitle $jobTitle)
    {
        $jobTitle->delete();

        return to_route('admin.job-title.index')->with(
            'success',
            'Job title has been deleted',
        );
    }
}
