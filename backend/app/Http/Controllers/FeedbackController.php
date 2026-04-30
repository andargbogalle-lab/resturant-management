<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedback = Feedback::with(['customer', 'order'])->latest()->get();
        return response()->json($feedback);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'nullable|exists:orders,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $feedback = Feedback::create([
            'customer_id' => auth()->id(),
            'order_id' => $request->order_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json($feedback->load(['customer', 'order']), 201);
    }

    public function destroy($id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();
        return response()->json(['message' => 'Feedback deleted']);
    }
}
