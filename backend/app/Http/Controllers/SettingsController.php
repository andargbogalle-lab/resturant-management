<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    public function update(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            Setting::set($key, $value);
        }

        return response()->json(['message' => 'Settings updated successfully']);
    }

    public function get($key)
    {
        $value = Setting::get($key);
        return response()->json(['key' => $key, 'value' => $value]);
    }
}
