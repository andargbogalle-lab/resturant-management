<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class RoomBookingController extends Controller
{
    /**
     * Display a listing of all bookings
     */
    public function index(Request $request)
    {
        $query = RoomBooking::with('room');

        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by date range if provided
        if ($request->has('from_date')) {
            $query->where('check_in_date', '>=', $request->from_date);
        }

        if ($request->has('to_date')) {
            $query->where('check_out_date', '<=', $request->to_date);
        }

        $bookings = $query->orderBy('created_at', 'desc')->get();

        return response()->json($bookings);
    }

    /**
     * Store a newly created booking
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'room_id' => 'required|exists:rooms,id',
            'guest_name' => 'required|string|max:255',
            'guest_phone' => 'required|string|max:20',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if room exists and is available
        $room = Room::find($request->room_id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        if ($room->status !== 'available') {
            return response()->json(['message' => 'Room is not available'], 400);
        }

        // Check for overlapping bookings
        $hasOverlap = RoomBooking::where('room_id', $request->room_id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('check_in_date', [$request->check_in_date, $request->check_out_date])
                    ->orWhereBetween('check_out_date', [$request->check_in_date, $request->check_out_date])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('check_in_date', '<=', $request->check_in_date)
                          ->where('check_out_date', '>=', $request->check_out_date);
                    });
            })
            ->whereIn('status', ['confirmed', 'checked_in'])
            ->exists();

        if ($hasOverlap) {
            return response()->json(['message' => 'Room is already booked for these dates'], 400);
        }

        // Calculate number of nights and total amount
        $checkIn = Carbon::parse($request->check_in_date);
        $checkOut = Carbon::parse($request->check_out_date);
        $nights = $checkIn->diffInDays($checkOut);
        $totalAmount = $room->price_per_night * $nights;

        // Create booking
        $booking = RoomBooking::create([
            'room_id' => $request->room_id,
            'guest_name' => $request->guest_name,
            'guest_phone' => $request->guest_phone,
            'check_in_date' => $request->check_in_date,
            'check_out_date' => $request->check_out_date,
            'total_amount' => $totalAmount,
            'status' => 'confirmed',
            'notes' => $request->notes,
        ]);

        // Update room status to reserved
        $room->update(['status' => 'reserved']);

        return response()->json([
            'message' => 'Room booked successfully',
            'booking' => $booking->load('room'),
            'nights' => $nights,
        ], 201);
    }

    /**
     * Display the specified booking
     */
    public function show($id)
    {
        $booking = RoomBooking::with('room')->find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        return response()->json($booking);
    }

    /**
     * Update the specified booking
     */
    public function update(Request $request, $id)
    {
        $booking = RoomBooking::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'sometimes|in:confirmed,checked_in,checked_out,cancelled',
            'guest_name' => 'sometimes|string|max:255',
            'guest_phone' => 'sometimes|string|max:20',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $booking->update($request->only(['status', 'guest_name', 'guest_phone', 'notes']));

        // Update room status based on booking status
        if ($request->has('status')) {
            $room = $booking->room;
            
            switch ($request->status) {
                case 'checked_in':
                    $room->update(['status' => 'occupied']);
                    break;
                case 'checked_out':
                case 'cancelled':
                    $room->update(['status' => 'available']);
                    break;
            }
        }

        return response()->json([
            'message' => 'Booking updated successfully',
            'booking' => $booking->load('room')
        ]);
    }

    /**
     * Cancel a booking
     */
    public function cancel($id)
    {
        $booking = RoomBooking::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        if ($booking->status === 'checked_in') {
            return response()->json(['message' => 'Cannot cancel a checked-in booking'], 400);
        }

        $booking->update(['status' => 'cancelled']);
        $booking->room->update(['status' => 'available']);

        return response()->json([
            'message' => 'Booking cancelled successfully',
            'booking' => $booking->load('room')
        ]);
    }

    /**
     * Delete a booking
     */
    public function destroy($id)
    {
        $booking = RoomBooking::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        // Make room available if booking is deleted
        if (in_array($booking->status, ['confirmed', 'checked_in'])) {
            $booking->room->update(['status' => 'available']);
        }

        $booking->delete();

        return response()->json(['message' => 'Booking deleted successfully']);
    }
}
