<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Order;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with(['order', 'cashier'])->latest()->get();
        return response()->json($payments);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'amount_paid' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,card,mobile',
            'transaction_id' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $order = Order::findOrFail($request->order_id);
        
        // Simple payment - amount paid should match order total
        $amountPaid = $request->amount_paid;
        $orderTotal = $order->total_amount;

        $payment = Payment::create([
            'order_id' => $request->order_id,
            'cashier_id' => auth()->id(),
            'amount' => $orderTotal,
            'discount' => 0,
            'tax' => 0,
            'service_charge' => 0,
            'total' => $orderTotal,
            'payment_method' => $request->payment_method,
            'status' => 'completed',
        ]);

        // Don't update order status here - let the frontend handle it
        // This allows for prepayment (pending->confirmed) or post-payment (served->completed)

        return response()->json($payment->load(['order', 'cashier']), 201);
    }

    public function refund($id)
    {
        $payment = Payment::findOrFail($id);
        
        if ($payment->status === 'refunded') {
            return response()->json(['error' => 'Payment already refunded'], 400);
        }

        $payment->update(['status' => 'refunded']);
        $payment->order->update(['status' => 'cancelled']);

        return response()->json($payment);
    }

    public function dailyReport()
    {
        $today = now()->toDateString();
        
        $payments = Payment::whereDate('created_at', $today)
            ->where('status', 'completed')
            ->get();

        $report = [
            'date' => $today,
            'total_sales' => $payments->sum('total'),
            'total_orders' => $payments->count(),
            'total_discount' => $payments->sum('discount'),
            'total_tax' => $payments->sum('tax'),
            'payment_methods' => [
                'cash' => $payments->where('payment_method', 'cash')->sum('total'),
                'card' => $payments->where('payment_method', 'card')->sum('total'),
                'mobile' => $payments->where('payment_method', 'mobile')->sum('total'),
                'chapa' => $payments->where('payment_method', 'chapa')->sum('total'),
            ],
        ];

        return response()->json($report);
    }
}
