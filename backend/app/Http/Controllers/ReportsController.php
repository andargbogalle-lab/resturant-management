<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ReportsController extends Controller
{
    public function salesReport(Request $request)
    {
        $period = $request->get('period', 'daily'); // daily, weekly, monthly
        
        $query = Payment::where('status', 'completed');
        
        switch ($period) {
            case 'daily':
                $query->whereDate('created_at', Carbon::today());
                break;
            case 'weekly':
                $query->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                break;
            case 'monthly':
                $query->whereMonth('created_at', Carbon::now()->month)
                      ->whereYear('created_at', Carbon::now()->year);
                break;
        }
        
        $payments = $query->get();
        
        return response()->json([
            'period' => $period,
            'total_sales' => $payments->sum('total'),
            'total_orders' => $payments->count(),
            'average_order' => $payments->avg('total'),
            'total_discount' => $payments->sum('discount'),
            'total_tax' => $payments->sum('tax'),
            'payment_methods' => [
                'cash' => $payments->where('payment_method', 'cash')->sum('total'),
                'card' => $payments->where('payment_method', 'card')->sum('total'),
                'mobile' => $payments->where('payment_method', 'mobile')->sum('total'),
                'chapa' => $payments->where('payment_method', 'chapa')->sum('total'),
            ],
        ]);
    }
}
