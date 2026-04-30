<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_number',
        'room_type',
        'price_per_night',
        'status',
        'capacity',
        'description',
    ];

    public function bookings()
    {
        return $this->hasMany(RoomBooking::class);
    }

    public function currentBooking()
    {
        return $this->hasOne(RoomBooking::class)
            ->where('status', 'checked_in')
            ->latest();
    }
}
