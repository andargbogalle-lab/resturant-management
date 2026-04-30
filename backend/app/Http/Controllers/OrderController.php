<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['table', 'orderItems.menuItem', 'waiter'])->latest()->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'table_id' => 'nullable|exists:tables,id',
            'customer_name' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.special_instructions' => 'nullable|string',
            'items.*.notes' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        try {
            // Check if user is authenticated
            $userId = auth()->check() ? auth()->id() : null;
            $waiterId = (auth()->check() && auth()->user()->role === 'waiter') ? auth()->id() : null;
            
            $order = Order::create([
                'table_id' => $request->table_id,
                'user_id' => $userId,
                'waiter_id' => $waiterId,
                'status' => 'pending',
                'notes' => $request->notes ?? ($request->customer_name ? "Guest: {$request->customer_name}" : 'Guest Order'),
            ]);

            $totalAmount = 0;
            foreach ($request->items as $item) {
                $menuItem = \App\Models\MenuItem::findOrFail($item['menu_item_id']);
                $price = $menuItem->price;
                $subtotal = $price * $item['quantity'];
                $totalAmount += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $item['menu_item_id'],
                    'quantity' => $item['quantity'],
                    'price' => $price,
                    'special_instructions' => $item['special_instructions'] ?? null,
                    'notes' => $item['notes'] ?? null,
                    'status' => 'pending',
                ]);
            }

            $order->update(['total_amount' => $totalAmount]);
            
            // Update table status if table is assigned
            if ($request->table_id) {
                \App\Models\Table::find($request->table_id)->update(['status' => 'occupied']);
            }

            DB::commit();

            return response()->json($order->load(['orderItems.menuItem', 'table', 'waiter']), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create order', 'message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $order = Order::with(['table', 'orderItems.menuItem', 'waiter'])->findOrFail($id);
        return response()->json($order);
    }

    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,confirmed,preparing,ready,served,completed,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);
        
        if ($request->status === 'completed') {
            $order->update(['completed_at' => now()]);
        }
        
        return response()->json($order->load(['orderItems.menuItem', 'table', 'waiter']));
    }

    public function updateItemStatus(Request $request, $orderId, $itemId)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,preparing,ready,served',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $orderItem = OrderItem::where('order_id', $orderId)->where('id', $itemId)->firstOrFail();
        $orderItem->update(['status' => $request->status]);

        return response()->json($orderItem->load('menuItem'));
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }

    // Get orders by status for chef
    public function byStatus($status)
    {
        $orders = Order::with(['table', 'orderItems.menuItem', 'waiter'])
            ->where('status', $status)
            ->latest()
            ->get();
        return response()->json($orders);
    }
}
