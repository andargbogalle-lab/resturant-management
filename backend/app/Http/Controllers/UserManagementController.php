<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserManagementController extends Controller
{
    // Manager only - Get all staff
    public function index()
    {
        $users = User::whereIn('role', ['cashier', 'chef', 'waiter'])->get();
        return response()->json($users);
    }

    // Manager only - Create staff
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:cashier,chef,waiter',
            'phone' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'phone' => $request->phone,
        ]);

        return response()->json($user, 201);
    }

    // Manager only - Update staff
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $id,
            'password' => 'nullable|min:6',
            'role' => 'in:cashier,chef,waiter',
            'phone' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('password');
        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);
        return response()->json($user);
    }

    // Manager only - Delete staff
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        if ($user->role === 'manager') {
            return response()->json(['error' => 'Cannot delete manager'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
