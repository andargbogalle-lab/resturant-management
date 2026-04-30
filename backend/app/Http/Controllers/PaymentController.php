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
            'amount' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'payment_method' => 'required|in:cash,card,mobile,chapa',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $order = Order::findOrFail($request->order_id);
        
        // Get settings
        $taxRate = Setting::get('tax_rate', 0) / 100;
        $serviceChargeRate = Setting::get('service_charge', 0) / 100;

        $amount = $request->amount;
        $discount = $request->discount ?? 0;
        $subtotal = $amount - $discount;
        $tax = $subtotal * $taxRate;
        $serviceCharge = $subtotal * $serviceChargeRate;
        $total = $subtotal + $tax + $serviceCharge;

        $payment = Payment::create([
            'order_id' => $request->order_id,
            'cashier_id' => auth()->id(),
            'amount' => $amount,
            'discount' => $discount,
            'tax' => $tax,
            'service_charge' => $serviceCharge,
            'total' => $total,
            'payment_method' => $request->payment_method,
            'status' => 'completed',
        ]);

        // Update order status
        $order->update(['status' => 'completed', 'completed_at' => now()]);

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
