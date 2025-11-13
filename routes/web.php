<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\StaffController as AdminStaffController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // --- User Routes ---
    Route::group([], function () {
        // URL: /dashboard
        Route::get('dashboard', function () {
            return Inertia::render('user/dashboard/dashboard');
        })->name('dashboard');

        // URL: /appointment/create
        Route::prefix('appointment')
            ->name('user.appointment.')
            ->group(function () {
                Route::get('create', function () {
                    return Inertia::render('user/appointment/create');
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
                });

            Route::prefix('staff-availability')
                ->name('staff-availability.')
                ->group(function () {});
        });
});

require __DIR__ . '/settings.php';
