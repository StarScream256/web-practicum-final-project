<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        $staff = Staff::all();

        return Inertia::render('admin/staff/index', [
            'staff' => $staff,
        ]);
    }
}
