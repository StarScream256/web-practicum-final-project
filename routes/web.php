<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\PatientController as AdminPatientController;
use App\Http\Controllers\Admin\StaffController as AdminStaffController;
use App\Http\Controllers\Admin\StaffAvailabilityController as AdminStaffAvailabilityController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\AppointmentsController as AdminAppointmentsController;
use App\Http\Controllers\Admin\TransactionsController as AdminTransactionsController;
use App\Http\Controllers\Patient\AppointmentController as PatientAppointmentController;
use App\Http\Controllers\Patient\DashboardController as PatientDashboardController;
use App\Http\Controllers\Patient\InvoiceController as PatientInvoiceController;
use App\Http\Controllers\Admin\JobTitleController as AdminJobTitleController;
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
            Route::get('dashboard', [
                PatientDashboardController::class,
                'index',
            ])->name('dashboard');

            // URL: /patient/appointment/...
            Route::prefix('appointment')
                ->name('appointment.')
                ->group(function () {
                    Route::get('', [
                        PatientAppointmentController::class,
                        'index',
                    ])->name('index');
                    Route::get('create', [
                        PatientAppointmentController::class,
                        'create',
                    ])->name('create');
                    Route::post('store', [
                        PatientAppointmentController::class,
                        'store',
                    ])->name('store');
                    Route::get('{id}/show', [
                        PatientAppointmentController::class,
                        'show',
                    ])->name('show');
                    Route::delete('{id}/destroy', [
                        PatientAppointmentController::class,
                        'destroy',
                    ])->name('destroy');
                });

            Route::prefix('invoices')
                ->name('invoices.')
                ->group(function () {
                    Route::get('', [
                        PatientInvoiceController::class,
                        'index',
                    ])->name('index');
                });
        });

    // --- Admin Routes ---
    Route::prefix('admin/dashboard')
        ->name('admin.')
        ->group(function () {
            // URL: /admin/dashboard
            Route::get('', [AdminDashboardController::class, 'index'])->name(
                'dashboard',
            );

            // URL: /admin/dashboard/patients/...
            Route::prefix('patients')
                ->name('patients.')
                ->group(function () {
                    Route::get('', [
                        AdminPatientController::class,
                        'index',
                    ])->name('index');
                    Route::get('{patients}/show', [
                        AdminPatientController::class,
                        'show',
                    ])->name('show');
                    Route::get('{patients}/edit', [
                        AdminPatientController::class,
                        'edit',
                    ])->name('edit');
                    Route::patch('{patients}/update', [
                        AdminPatientController::class,
                        'update',
                    ])->name('update');
                    Route::delete('{patients}', [
                        AdminPatientController::class,
                        'destroy',
                    ])->name('destroy');
                });

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

            Route::prefix('job-title')
                ->name('job-title.')
                ->group(function () {
                    Route::get('', [
                        AdminJobTitleController::class,
                        'index',
                    ])->name('index');
                    Route::post('store', [
                        AdminJobTitleController::class,
                        'store',
                    ])->name('store');
                    Route::patch('{jobTitle}/update', [
                        AdminJobTitleController::class,
                        'update',
                    ])->name('update');
                    Route::delete('{jobTitle}/destroy', [
                        AdminJobTitleController::class,
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

            // URL: /admin/dashboard/appointments/...
            Route::prefix('appointments')
                ->name('appointments.')
                ->group(function () {
                    Route::get('', [
                        AdminAppointmentsController::class,
                        'index',
                    ])->name('index');
                    Route::get('{appointment}/show', [
                        AdminAppointmentsController::class,
                        'show',
                    ])->name('show');
                    Route::get('{appointment}/check-in', [
                        AdminAppointmentsController::class,
                        'checkIn',
                    ])->name('checkIn');
                    Route::get('{invoice}/checkout', [
                        AdminAppointmentsController::class,
                        'checkout',
                    ])->name('checkout');
                    Route::post('{invoice}/transaction', [
                        AdminAppointmentsController::class,
                        'transaction',
                    ])->name('transaction');
                });

            Route::prefix('transactions')
                ->name('transactions.')
                ->group(function () {
                    Route::get('', [
                        AdminTransactionsController::class,
                        'index',
                    ])->name('index');
                    Route::get('{transactions}/show', [
                        AdminTransactionsController::class,
                        'show',
                    ])->name('show');
                });
        });
});

require __DIR__ . '/settings.php';
