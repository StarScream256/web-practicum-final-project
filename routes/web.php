<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // User routes -> /...
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/dashboard');
    })->name('dashboard');

    // Admin routes -> /admin/...
    Route::prefix('admin')->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('admin/dashboard/dashboard');
        })->name('admin.dashboard');
    });
});

require __DIR__ . '/settings.php';
