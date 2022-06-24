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
        Country::create([
            'name' => 'Canada'
        ]);
        Country::create([
            'name' => 'Australia'
        ]);
        Country::create([
            'name' => 'UAE'
        ]);
        //
        // Seed State
        State::create([
            'name' => 'Assam',
            'country' => '1'
        ]);
        State::create([
            'name' => 'Karnataka',
            'country' => '1'
        ]);
        State::create([
            'name' => 'Gujrat',
            'country' => '1'
        ]);
        State::create([
            'name' => 'Meghalaya',
            'country' => '1'
        ]);
        State::create([
            'name' => 'British Columbia',
            'country' => '2'
        ]);
        State::create([
            'name' => 'Northern Territory',
            'country' => '2'
        ]);
        State::create([
            'name' => 'Tasmania',
            'country' => '3'
        ]);
        //
        // Seed City
        City::create([
            'name' => 'Guwahati',
            'state' => '1',
            // 'country' => '1'
        ]);
        City::create([
            'name' => 'Dibrugarh',
            'state' => '1',
        ]);
        City::create([
            'name' => 'Jorhat',
            'state' => '1',
        ]);
        City::create([
            'name' => 'Kokrajhar',
            'state' => '1',
        ]);
        City::create([
            'name' => 'Vancouver',
            'state' => '5',
        ]);
        City::create([
            'name' => 'Kamloops',
            'state' => '5',
        ]);
        City::create([
            'name' => 'Kelowna',
            'state' => '5',
        ]);
        City::create([
            'name' => 'Squamish',
            'state' => '5',
        ]);

    }
}
