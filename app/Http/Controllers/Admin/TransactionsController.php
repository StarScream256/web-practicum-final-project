<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class TransactionsController extends Controller
{
    public function index(): Response
    {
        $transactions = Transaction::with(['invoice', 'invoice.appointment.patient', 'invoice.appointment.staff'])->get();
        return Inertia::render('admin/transactions/index', [
            'transactions' => $transactions,
        ]);
    }

    public function show(): Response
    {
        $transactions = Transaction::with(['invoice', 'invoice.appointment.patient', 'invoice.appointment.staff'])->get();
        // Log::info('Appointments retrieved', ['count' => $transactions]);
        return Inertia::render('admin/transactions/show', [
            'transaction' => $transactions[0],
        ]);
    }
}