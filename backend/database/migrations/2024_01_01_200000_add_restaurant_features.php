<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add inventory tracking
        Schema::create('inventory', function (Blueprint $table) {
            $table->id();
            $table->string('item_name');
            $table->integer('quantity');
            $table->string('unit'); // kg, liters, pieces
            $table->decimal('cost_per_unit', 10, 2);
            $table->integer('minimum_stock')->default(10);
            $table->timestamps();
        });

        // Add payments table
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('cashier_id')->nullable()->constrained('users')->onDelete('set null');
            $table->decimal('amount', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('tax', 10, 2)->default(0);
            $table->decimal('service_charge', 10, 2)->default(0);
            $table->decimal('total', 10, 2);
            $table->enum('payment_method', ['cash', 'card', 'mobile', 'chapa'])->default('cash');
            $table->enum('status', ['pending', 'completed', 'refunded'])->default('pending');
            $table->timestamps();
        });

        // Add feedback/reviews
        Schema::create('feedback', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('order_id')->nullable()->constrained()->onDelete('set null');
            $table->integer('rating'); // 1-5
            $table->text('comment')->nullable();
            $table->timestamps();
        });

        // Add restaurant settings
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value');
            $table->timestamps();
        });

        // Add order assignments to waiters
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('waiter_id')->nullable()->after('user_id')->constrained('users')->onDelete('set null');
            $table->timestamp('completed_at')->nullable();
        });

        // Note: status column already added in create_restaurants_tables migration
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['waiter_id']);
            $table->dropColumn(['waiter_id', 'completed_at']);
        });

        Schema::dropIfExists('settings');
        Schema::dropIfExists('feedback');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('inventory');
    }
};
