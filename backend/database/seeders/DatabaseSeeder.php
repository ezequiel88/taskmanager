<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        # Se quiser criar vários de uma vez use a factory
        // User::factory(10)->create(); 

        User::factory()->create([
            'name' => 'Ezequiel Tavares',
            'email' => 'ezequiel@taskmanager.com',
        ]);
    }
}
