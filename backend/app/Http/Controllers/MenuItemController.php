<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuItemController extends Controller
{
    public function index()
    {
        $menuItems = MenuItem::with('category')->where('is_available', true)->get();
        return response()->json($menuItems);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|string',
            'is_available' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $menuItem = MenuItem::create($request->all());
        return response()->json($menuItem->load('category'), 201);
    }

    public function show($id)
    {
        $menuItem = MenuItem::with('category')->findOrFail($id);
        return response()->json($menuItem);
    }

    public function update(Request $request, $id)
    {
        $menuItem = MenuItem::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'category_id' => 'exists:categories,id',
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'price' => 'numeric|min:0',
            'image' => 'nullable|string',
            'is_available' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $menuItem->update($request->all());
        return response()->json($menuItem->load('category'));
    }

    public function destroy($id)
    {
        $menuItem = MenuItem::findOrFail($id);
        $menuItem->delete();
        return response()->json(['message' => 'Menu item deleted successfully']);
    }
}
