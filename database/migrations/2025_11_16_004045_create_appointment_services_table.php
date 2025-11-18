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
        Schema::create('appointment_services', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('appointment_id')
                ->constrained('appointments', 'id')
                ->cascadeOnDelete();
            $table
                ->foreignId('service_id')
                ->constrained('services', 'id')
                ->cascadeOnDelete();
            $table->decimal('price', 10, 2);
            $table->integer('quantity')->default(1);
            $table
                ->enum('added_by', ['patient', 'doctor', 'admin'])
                ->default('patient');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment_services');
    }
};
