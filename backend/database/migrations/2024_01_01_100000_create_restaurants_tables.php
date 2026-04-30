<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('image')->nullable();
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });

        Schema::create('tables', function (Blueprint $table) {
            $table->id();
            $table->string('table_number')->unique();
            $table->integer('capacity');
            $table->enum('status', ['available', 'occupied', 'reserved'])->default('available');
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('status', ['pending', 'preparing', 'ready', 'served', 'completed', 'cancelled'])->default('pending');
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('menu_item_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->text('special_instructions')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['pending', 'preparing', 'ready', 'served'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('tables');
        Schema::dropIfExists('menu_items');
        Schema::dropIfExists('categories');
    }
};
