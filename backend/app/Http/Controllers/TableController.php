<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TableController extends Controller
{
    public function index()
    {
        $tables = Table::all();
        return response()->json($tables);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'table_number' => 'required|string|unique:tables,table_number',
            'capacity' => 'required|integer|min:1',
            'status' => 'in:available,occupied,reserved',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $table = Table::create($request->all());
        return response()->json($table, 201);
    }

    public function show($id)
    {
        $table = Table::with('orders')->findOrFail($id);
        return response()->json($table);
    }

    public function update(Request $request, $id)
    {
        $table = Table::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'table_number' => 'string|unique:tables,table_number,' . $id,
            'capacity' => 'integer|min:1',
            'status' => 'in:available,occupied,reserved',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $table->update($request->all());
        return response()->json($table);
    }

    public function destroy($id)
    {
        $table = Table::findOrFail($id);
        $table->delete();
        return response()->json(['message' => 'Table deleted successfully']);
    }
}
