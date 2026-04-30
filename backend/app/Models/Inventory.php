<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $table = 'inventory';

    protected $fillable = [
        'item_name', 'quantity', 'unit', 'cost_per_unit', 'minimum_stock'
    ];

    protected $casts = [
        'quantity' => 'integer',
        'cost_per_unit' => 'decimal:2',
        'minimum_stock' => 'integer',
    ];

    public function isLowStock()
    {
        return $this->quantity <= $this->minimum_stock;
    }
}
