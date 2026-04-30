<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoomController extends Controller
{
    /**
     * Display a listing of all rooms
     */
    public function index()
    {
        $rooms = Room::all();
        return response()->json($rooms);
    }

    /**
     * Display the specified room
     */
    public function show($id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        return response()->json($room);
    }

    /**
     * Check room availability for specific dates
     */
    public function checkAvailability(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'room_id' => 'required|exists:rooms,id',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $room = Room::find($request->room_id);

        // Check if room has any overlapping bookings
        $hasBooking = $room->bookings()
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

        return response()->json([
            'available' => !$hasBooking && $room->status === 'available',
            'room' => $room
        ]);
    }

    /**
     * Get available rooms for specific dates
     */
    public function availableRooms(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get all rooms that don't have overlapping bookings
        $rooms = Room::whereDoesntHave('bookings', function ($query) use ($request) {
            $query->where(function ($q) use ($request) {
                $q->whereBetween('check_in_date', [$request->check_in_date, $request->check_out_date])
                  ->orWhereBetween('check_out_date', [$request->check_in_date, $request->check_out_date])
                  ->orWhere(function ($subQ) use ($request) {
                      $subQ->where('check_in_date', '<=', $request->check_in_date)
                           ->where('check_out_date', '>=', $request->check_out_date);
                  });
            })
            ->whereIn('status', ['confirmed', 'checked_in']);
        })
        ->where('status', 'available')
        ->get();

        return response()->json($rooms);
    }
}
