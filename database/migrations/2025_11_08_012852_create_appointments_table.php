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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id('appointment_id');

            $table->foreignId('patient_id')->constrained('patients', 'id');
            $table->foreignId('staff_id')->constrained('staffs', 'id');
            $table->foreignId('service_id')->constrained('services', 'id');

            $table->dateTime('appointment_start_time');
            $table->dateTime('appointment_end_time');

            $table->dateTime('check_in_time')->nullable();
            $table->dateTime('seen_by_doctor_time')->nullable();
            $table->dateTime('check_out_time')->nullable();

            $table
                ->enum('status', [
                    'scheduled',
                    'checked-in',
                    'completed',
                    'canceled',
                ])
                ->default('scheduled');
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
