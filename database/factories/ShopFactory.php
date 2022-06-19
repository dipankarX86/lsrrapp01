<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ShopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'email' => $this->faker->email(),
            'phone' => $this->faker->phoneNumber(),

            'addr_line1' => $this->faker->streetAddress(),
            'addr_line2' =>  $this->faker->streetAddress(),
            'addr_city' => '1',
            'addr_state' => '1',
            'addr_country' => '1',
            'addr_postal_code' =>  $this->faker->postcode(),

            'lat_lon' => '90,170',

            'pan' => '3',
            'gst' => '4',
            'trade_license' => '5',

            'owner_name' => $this->faker->name(),
            'owner_email' => $this->faker->email(),
            'owner_phone' => $this->faker->phoneNumber(),

            'owner_addr_line1' =>  $this->faker->streetAddress(),
            'owner_addr_line2' =>  $this->faker->streetAddress(),
            'owner_addr_city' => '1',
            'owner_addr_state' => '1',
            'owner_addr_country' => '1',
            'owner_addr_postal_code' =>  $this->faker->postcode(),
        ];
    }
}
