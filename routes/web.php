<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\StaffController as AdminStaffController;
use App\Http\Controllers\Admin\StaffAvailabilityController as AdminStaffAvailabilityController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // --- Patient Routes ---
    Route::prefix('patient')
        ->name('patient.')
        ->group(function () {
            // URL: /patient/dashboard
            Route::get('dashboard', function () {
                return Inertia::render('patient/dashboard/dashboard');
            })->name('dashboard');

            // URL: /patient/appointment/...
            Route::prefix('appointment')
                ->name('appointment.')
                ->group(function () {
                    Route::get('create', function () {
                        return Inertia::render('patient/appointment/create');
                    })->name('create');
                });
        });

    // --- Admin Routes ---
    Route::prefix('admin/dashboard')
        ->name('admin.')
        ->group(function () {
            // URL: /admin/dashboard
            Route::get('', function () {
                return Inertia::render('admin/dashboard/dashboard');
            })->name('dashboard');

            // URL: /admin/dashboard/staff/...
            Route::prefix('staff')
                ->name('staff.')
                ->group(function () {
                    Route::get('', [
                        AdminStaffController::class,
                        'index',
                    ])->name('index');
                    Route::get('create', [
                        AdminStaffController::class,
                        'create',
                    ])->name('create');
                    Route::post('store', [
                        AdminStaffController::class,
                        'store',
                    ])->name('store');
                    Route::get('{staff}/show', [
                        AdminStaffController::class,
                        'show',
                    ])->name('show');
                    Route::get('{staff}/edit', [
                        AdminStaffController::class,
                        'edit',
                    ])->name('edit');
                    Route::patch('{staff}/update', [
                        AdminStaffController::class,
                        'update',
                    ])->name('update');
                    Route::delete('{staff}', [
                        AdminStaffController::class,
                        'destroy',
                    ])->name('destroy');
                });

            Route::prefix('staff-availability')
                ->name('staff-availability.')
                ->group(function () {
                    Route::get('', [
                        AdminStaffAvailabilityController::class,
                        'index',
                    ])->name('index');
                    Route::get('{staff}/show', [
                        AdminStaffAvailabilityController::class,
                        'show',
                    ])->name('show');
                    Route::post('store', [
                        AdminStaffAvailabilityController::class,
                        'store',
                    ])->name('store');
                    Route::patch('{availability}/update', [
                        AdminStaffAvailabilityController::class,
                        'update',
                    ])->name('update');
                    Route::delete('{availability}/destroy', [
                        AdminStaffAvailabilityController::class,
                        'destroy',
                    ])->name('destroy');
                });

            Route::prefix('service')
                ->name('service.')
                ->group(function () {
                    Route::get('', [
                        AdminServiceController::class,
                        'index',
                    ])->name('index');
                    Route::get('{service}/show', [
                        AdminServiceController::class,
                        'show',
                    ])->name('show');
                    Route::post('store', [
                        AdminServiceController::class,
                        'store',
                    ])->name('store');
                    Route::patch('{service}/update', [
                        AdminServiceController::class,
                        'update',
                    ])->name('update');
                    Route::delete('{service}/destroy', [
                        AdminServiceController::class,
                        'destroy',
                    ])->name('destroy');
                });
        });
});

require __DIR__ . '/settings.php';
