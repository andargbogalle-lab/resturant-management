<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Table;
use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Users with different roles
        User::create([
            'name' => 'Cashier',
            'email' => 'cashier',
            'password' => Hash::make('1234'),
            'role' => 'cashier',
            'phone' => '1234567891',
        ]);

        User::create([
            'name' => 'Chief',
            'email' => 'chief',
            'password' => Hash::make('1234'),
            'role' => 'chef',
            'phone' => '1234567892',
        ]);

        User::create([
            'name' => 'Waiter',
            'email' => 'waiter',
            'password' => Hash::make('1234'),
            'role' => 'waiter',
            'phone' => '1234567893',
        ]);

        // Create Categories
        $wot = Category::create([
            'name' => 'ወጥ (Wot - Stews)',
            'description' => 'Traditional Ethiopian stews served with injera',
            'is_active' => true,
        ]);

        $tibs = Category::create([
            'name' => 'ጥብስ (Tibs - Sautéed)',
            'description' => 'Sautéed meat and vegetables',
            'is_active' => true,
        ]);

        $fasting = Category::create([
            'name' => 'ጾም (Fasting Food)',
            'description' => 'Vegetarian dishes for fasting days',
            'is_active' => true,
        ]);

        $beverages = Category::create([
            'name' => 'መጠጦች (Beverages)',
            'description' => 'Traditional and modern drinks',
            'is_active' => true,
        ]);

        // Create Menu Items - Wot (Stews)
        MenuItem::create([
            'category_id' => $wot->id,
            'name' => 'ዶሮ ወጥ (Doro Wot)',
            'description' => 'Spicy chicken stew with hard-boiled eggs, the national dish of Ethiopia',
            'price' => 250.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $wot->id,
            'name' => 'ስጋ ወጥ (Siga Wot)',
            'description' => 'Spicy beef stew with berbere spice blend',
            'price' => 220.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $wot->id,
            'name' => 'ቀይ ወጥ (Key Wot)',
            'description' => 'Red beef stew with Ethiopian spices',
            'price' => 200.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $wot->id,
            'name' => 'አልጫ (Alicha)',
            'description' => 'Mild chicken or beef stew without berbere',
            'price' => 180.00,
            'is_available' => true,
        ]);

        // Create Menu Items - Tibs (Sautéed)
        MenuItem::create([
            'category_id' => $tibs->id,
            'name' => 'ጥብስ (Tibs)',
            'description' => 'Sautéed beef cubes with onions, peppers, and spices',
            'price' => 280.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $tibs->id,
            'name' => 'ደረቅ ጥብስ (Derek Tibs)',
            'description' => 'Dry fried beef with onions and jalapeños',
            'price' => 300.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $tibs->id,
            'name' => 'አዋዜ ጥብስ (Awaze Tibs)',
            'description' => 'Beef tibs marinated in spicy awaze sauce',
            'price' => 290.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $tibs->id,
            'name' => 'ጉልባን (Gulban)',
            'description' => 'Lamb ribs grilled with Ethiopian spices',
            'price' => 350.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $tibs->id,
            'name' => 'ቁርጥ (Kurt)',
            'description' => 'Raw or lightly cooked beef cubes with mitmita',
            'price' => 320.00,
            'is_available' => true,
        ]);

        // Create Menu Items - Fasting Food (Vegetarian)
        MenuItem::create([
            'category_id' => $fasting->id,
            'name' => 'ቤይነቱ (Beyaynetu)',
            'description' => 'Vegetarian combination platter with various lentils, vegetables, and salads',
            'price' => 150.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $fasting->id,
            'name' => 'ምስር ወጥ (Misir Wot)',
            'description' => 'Spicy red lentil stew',
            'price' => 120.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $fasting->id,
            'name' => 'ክክ ወጥ (Kik Wot)',
            'description' => 'Yellow split pea stew',
            'price' => 110.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $fasting->id,
            'name' => 'ጎመን (Gomen)',
            'description' => 'Collard greens sautéed with garlic and ginger',
            'price' => 100.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $fasting->id,
            'name' => 'ሽሮ (Shiro)',
            'description' => 'Ground chickpea stew with spices',
            'price' => 130.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $fasting->id,
            'name' => 'ፎሶሊያ (Fosolia)',
            'description' => 'String beans and carrots cooked with onions',
            'price' => 90.00,
            'is_available' => true,
        ]);

        // Create Menu Items - Beverages
        MenuItem::create([
            'category_id' => $beverages->id,
            'name' => 'ቡና (Buna - Ethiopian Coffee)',
            'description' => 'Traditional Ethiopian coffee ceremony coffee',
            'price' => 50.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $beverages->id,
            'name' => 'ሻይ (Shai - Tea)',
            'description' => 'Spiced Ethiopian tea',
            'price' => 30.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $beverages->id,
            'name' => 'ጤላ (Tella)',
            'description' => 'Traditional Ethiopian beer',
            'price' => 80.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $beverages->id,
            'name' => 'ጠጅ (Tej)',
            'description' => 'Ethiopian honey wine',
            'price' => 120.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $beverages->id,
            'name' => 'ስፕሪስ (Spris)',
            'description' => 'Ethiopian soft drink',
            'price' => 25.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $beverages->id,
            'name' => 'አቮካዶ ጁስ (Avocado Juice)',
            'description' => 'Fresh avocado smoothie',
            'price' => 60.00,
            'is_available' => true,
        ]);

        MenuItem::create([
            'category_id' => $beverages->id,
            'name' => 'ፍሬሽ ጁስ (Fresh Juice)',
            'description' => 'Freshly squeezed fruit juice (mango, papaya, or mixed)',
            'price' => 55.00,
            'is_available' => true,
        ]);

        // Create Tables
        for ($i = 1; $i <= 10; $i++) {
            Table::create([
                'table_number' => 'T' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'capacity' => $i <= 4 ? 2 : ($i <= 8 ? 4 : 6),
                'status' => $i <= 3 ? 'occupied' : ($i <= 5 ? 'reserved' : 'available'),
            ]);
        }

        // Create 10 Bedrooms (Rooms)
        $roomTypes = ['single', 'double', 'suite'];
        $roomPrices = ['single' => 500.00, 'double' => 800.00, 'suite' => 1500.00];
        
        for ($i = 1; $i <= 10; $i++) {
            $type = $i <= 3 ? 'single' : ($i <= 7 ? 'double' : 'suite');
            $capacity = $type === 'single' ? 1 : ($type === 'double' ? 2 : 4);
            $status = $i <= 2 ? 'occupied' : ($i <= 4 ? 'reserved' : 'available');
            
            Room::create([
                'room_number' => 'R' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'room_type' => $type,
                'price_per_night' => $roomPrices[$type],
                'status' => $status,
                'capacity' => $capacity,
                'description' => ucfirst($type) . ' bedroom with comfortable amenities',
            ]);
        }
    }
}
