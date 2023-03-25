<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\MyPosition;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Myposition>
 */
class MyPositionFactory extends Factory
{
    protected $model = MyPosition::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'longitude' => fake()->randomFloat(3, 10, 30),
            'latitude' => fake()->randomFloat(3, 10, 30),
            'country' => fake()->country(),
            'region' => fake()->state(),
            'city' => fake()->city(),
            'available' => true,
        ];
    }
}
