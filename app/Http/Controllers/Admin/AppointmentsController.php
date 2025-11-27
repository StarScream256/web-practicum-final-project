<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\AppointmentService;
use App\Models\Invoice;
use App\Models\Transaction;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class AppointmentsController extends Controller
{
    public function index(): Response
    {
        $appointments = Appointment::with(['patient', 'staff'])->get();
        // Log::info('Appointments retrieved', ['count' => $appointments]);
        return Inertia::render('admin/appointments/index', [
            'appointments' => $appointments,
        ]);
    }
    public function show(Appointment $appointment)
    {
        $appointment->load(['patient.user', 'staff.user', 'services']);
        $invoice = Invoice::where('appointment_id', $appointment->id)->first();
        // Log::info('Appointments retrieved', [$invoice]);
        return Inertia::render('admin/appointments/show', [
            'appointment' => $appointment,
            'invoice' => $invoice,
        ]);
    }
    public function checkIn(Appointment $appointment)
    {
        // Log::info('Appointments retrieved', ['count' => $appointment]);
        if (Invoice::where('appointment_id', $appointment->id)->exists()) {
            return to_route('admin.appointments.index')->with(
                'error',
                'Appointment creation failed',
            );
        }
        try {
            $totalAmount =
                DB::table('appointment_services')
                    ->where('appointment_id', $appointment->id)
                    ->selectRaw('SUM(price * quantity) as total_amount')
                    ->value('total_amount') ?? 0;

            DB::transaction(function () use ($appointment, $totalAmount) {
                Invoice::create([
                    'appointment_id' => $appointment->id,
                    'patient_user_id' => $appointment->patient->user_id,
                    'total_amount' => $totalAmount,
                    'status' => 'pending',
                ]);

                $appointment->update([
                    'status' => 'checked-in',
                    'check_in_time' => Carbon::now('Asia/Jakarta'),
                ]);
            });

            return back()->with('success', 'Invoice has been created');
        } catch (Exception $error) {
            Log::error('Error during appointment check-in', [
                'error' => $error->getMessage(),
            ]);
            return to_route('admin.appointments.index')->with(
                'error',
                'Appointment creation failed',
            );
        }
    }

    public function markDoctor(Appointment $appointment)
    {
        $appointment->update([
            'seen_by_doctor_time' => Carbon::now('Asia/Jakarta'),
        ]);
        return back()->with(
            'success',
            'This appointment has been marked as checked by doctor',
        );
    }

    public function checkout(Invoice $invoice)
    {
        // Log::info('Appointments retrieved', ['count' => $invoice]);
        $invoice->load(
            'transactions',
            'appointment.patient.user',
            'appointment.staff.user',
        );
        return Inertia::render('admin/appointments/checkout', [
            'invoice' => $invoice,
        ]);
    }

    public function transaction(Request $request, Invoice $invoice)
    {
        // Log::info('Transaction request received', [
        //     $request,
        // ]);
        $validated = $request->validate([
            'payment_method' => [
                'required',
                'string',
                'in:cash,insurance,bank_transfer',
            ],
            'notes' => ['nullable', 'string'],
        ]);

        if ($invoice->status === 'paid') {
            return back()->with('error', 'Invoice has already been paid');
        }

        try {
            DB::transaction(function () use ($invoice, $validated) {
                Transaction::create([
                    'invoice_id' => $invoice->id,
                    'amount_paid' => $invoice->total_amount,
                    'payment_method' => $validated['payment_method'],
                    'payment_date' => Carbon::now('Asia/Jakarta'),
                    'reference_number' => null,
                    'notes' => $validated['notes'] ?? null,
                ]);

                $invoice->update([
                    'status' => 'paid',
                ]);

                $appointment = $invoice->appointment;
                if ($appointment) {
                    $appointment->update([
                        'status' => 'completed',
                        'check_out_time' => Carbon::now('Asia/Jakarta'),
                    ]);
                }
            });

            return back()->with('success', 'Payment completed successfully');
        } catch (Exception $error) {
            return back()->with('error', 'Payment processing failed');
        }
    }
}
