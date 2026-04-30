<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InventoryController extends Controller
{
    public function index()
    {
        $inventory = Inventory::all();
        return response()->json($inventory);
    }

    public function lowStock()
    {
        $inventory = Inventory::all()->filter(function($item) {
            return $item->isLowStock();
        })->values();
        
        return response()->json($inventory);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'item_name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
            'unit' => 'required|string',
            'cost_per_unit' => 'required|numeric|min:0',
            'minimum_stock' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $inventory = Inventory::create($request->all());
        return response()->json($inventory, 201);
    }

    public function update(Request $request, $id)
    {
        $inventory = Inventory::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'item_name' => 'string|max:255',
            'quantity' => 'integer|min:0',
            'unit' => 'string',
            'cost_per_unit' => 'numeric|min:0',
            'minimum_stock' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $inventory->update($request->all());
        return response()->json($inventory);
    }

    public function destroy($id)
    {
        $inventory = Inventory::findOrFail($id);
        $inventory->delete();
        return response()->json(['message' => 'Inventory item deleted']);
    }
}
