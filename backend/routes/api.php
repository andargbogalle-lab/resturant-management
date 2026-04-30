<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\SettingsController;

Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'message' => 'Restaurant API is running']);
});

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public routes
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/menu-items', [MenuItemController::class, 'index']);
Route::get('/menu-items/{id}', [MenuItemController::class, 'show']);
Route::get('/tables', [TableController::class, 'index']);

// Guest ordering (no authentication required)
Route::post('/orders', [OrderController::class, 'store']);

// Protected routes (require authentication)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Orders - All authenticated users
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::patch('/orders/{orderId}/items/{itemId}/status', [OrderController::class, 'updateItemStatus']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
    Route::get('/orders/status/{status}', [OrderController::class, 'byStatus']);
    
    // Feedback - Customers
    Route::get('/feedback', [FeedbackController::class, 'index']);
    Route::post('/feedback', [FeedbackController::class, 'store']);
    
    // Manager only routes
    Route::middleware(['role:manager'])->group(function () {
        // User Management
        Route::get('/users', [UserManagementController::class, 'index']);
        Route::post('/users', [UserManagementController::class, 'store']);
        Route::put('/users/{id}', [UserManagementController::class, 'update']);
        Route::delete('/users/{id}', [UserManagementController::class, 'destroy']);
        
        // Categories
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
        
        // Menu Items
        Route::post('/menu-items', [MenuItemController::class, 'store']);
        Route::put('/menu-items/{id}', [MenuItemController::class, 'update']);
        Route::delete('/menu-items/{id}', [MenuItemController::class, 'destroy']);
        
        // Inventory
        Route::get('/inventory', [InventoryController::class, 'index']);
        Route::get('/inventory/low-stock', [InventoryController::class, 'lowStock']);
        Route::post('/inventory', [InventoryController::class, 'store']);
        Route::put('/inventory/{id}', [InventoryController::class, 'update']);
        Route::delete('/inventory/{id}', [InventoryController::class, 'destroy']);
        
        // Settings
        Route::get('/settings', [SettingsController::class, 'index']);
        Route::post('/settings', [SettingsController::class, 'update']);
        Route::get('/settings/{key}', [SettingsController::class, 'get']);
    });
    
    // Cashier routes
    Route::middleware(['role:cashier,manager'])->group(function () {
        Route::get('/payments', [PaymentController::class, 'index']);
        Route::post('/payments', [PaymentController::class, 'store']);
        Route::post('/payments/{id}/refund', [PaymentController::class, 'refund']);
        Route::get('/payments/daily-report', [PaymentController::class, 'dailyReport']);
    });
    
    // Waiter routes
    Route::middleware(['role:waiter,manager'])->group(function () {
        Route::post('/tables', [TableController::class, 'store']);
        Route::put('/tables/{id}', [TableController::class, 'update']);
    });
});
