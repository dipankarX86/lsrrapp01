<?php

namespace Database\Seeders;

use App\Models\Role;
// use App\Models\Shop;
use App\Models\Service;
use App\Models\Category;
use App\Models\City;
use App\Models\Country;
use App\Models\Customer;
use App\Models\State;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Seed users
        // \App\Models\User::factory(10)->create();


        // Seed shops
        // Shop::factory(6)->create();


        // Seed roles
        Role::create([
            'code' => 'MA',
            'name' => 'Master Admin'
        ]);
        Role::create([
            'code' => 'SA',
            'name' => 'Shop Admin'
        ]);
        Role::create([
            'code' => 'FD',
            'name' => 'Front Desk'
        ]);
        Role::create([
            'code' => 'TR',
            'name' => 'Transporter'
        ]);
        Role::create([
            'code' => 'WK',
            'name' => 'Worker'
        ]);
        Role::create([
            'code' => 'HS',
            'name' => 'Home Service'
        ]);


        // Seed country
        Country::create([
            'name' => 'India'
        ]);
        // Seed State
        State::create([
            'name' => 'Assam',
            'country' => '1'
        ]);
        // Seed City
        City::create([
            'name' => 'Guwahati',
            'state' => '1',
            // 'country' => '1'
        ]);

    }
}
