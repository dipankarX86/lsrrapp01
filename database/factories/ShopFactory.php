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
            // 'address' => '1',
            'lat_lon' => '90,170',
            'pan' => '3',
            'gst' => '4',
            'trade_license' => '5',
            'owner_name' => $this->faker->name(),
            'owner_email' => $this->faker->email(),
            'owner_phone' => $this->faker->phoneNumber(),
            // 'owner_address' => '1',
        ];
    }
}
