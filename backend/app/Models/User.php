<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Check if user is manager
    public function isManager()
    {
        return $this->role === 'manager';
    }

    // Check if user is cashier
    public function isCashier()
    {
        return $this->role === 'cashier';
    }

    // Check if user is chef
    public function isChef()
    {
        return $this->role === 'chef';
    }

    // Check if user is waiter
    public function isWaiter()
    {
        return $this->role === 'waiter';
    }

    // Check if user is customer
    public function isCustomer()
    {
        return $this->role === 'customer';
    }
}
