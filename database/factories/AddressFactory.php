<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'line1' => $this->faker->streetAddress(),
            'line2' =>  $this->faker->streetAddress(),
            'city' => '1',
            'state' => '1',
            'country' => '1',
            'postal_code' =>  $this->faker->postcode(),
            'country' => 'Vancouver, British-Columbia, Canada',
        ];
    }
}
