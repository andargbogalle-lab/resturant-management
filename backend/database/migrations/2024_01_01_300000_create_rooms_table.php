<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_number')->unique();
            $table->enum('room_type', ['single', 'double', 'suite'])->default('double');
            $table->decimal('price_per_night', 10, 2);
            $table->enum('status', ['available', 'occupied', 'maintenance', 'reserved'])->default('available');
            $table->integer('capacity')->default(2);
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('room_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('guest_name');
            $table->string('guest_phone');
            $table->date('check_in_date');
            $table->date('check_out_date');
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('room_bookings');
        Schema::dropIfExists('rooms');
    }
};
