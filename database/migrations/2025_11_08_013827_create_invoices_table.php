<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id('invoice_id');

            $table
                ->foreignId('appointment_id')
                ->constrained('appointments', 'appointment_id');
            $table->foreignId('patient_user_id')->constrained('users', 'id');

            $table->decimal('total_amount', 12, 2);
            $table->enum('status', ['pending', 'paid'])->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
