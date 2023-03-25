<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\MyPosition;
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
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // generating Seeder For User and Positions
        $user=User::factory()->create([
            'name' => 'Leonardo',
            'email' => 'leonardo@findme.com',
        ]);

        MyPosition::factory()->create([
            'available' => true,
            'longitude' => '4.059',
            'latitude' => '9.795',
            'country' => 'Cameroun',
            'city' => 'Douala',
            'region' => 'Litoral',
            'user_id'=> $user->id,
        ]);

        $user1=User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
        ]);

        MyPosition::factory()->create([
            'user_id'=>$user1->id,
            'available' => true,
            'longitude' => '4.0505',
            'latitude' => '9.7023',
            'country' => 'Cameroun',
            'city' => 'Douala',
            'region' => 'Litoral',
        ]);

        $user2=User::factory()->create([
            'name' => 'Youssouf',
            'email' => 'youssouf@isdg.com',
        ]);

        MyPosition::factory()->create([
            'user_id'=>$user2->id,
            'available' => true,
            'longitude' => '11.43',
            'latitude' => '3.84',
        ]);

        $user3=User::factory()->create([
            'name' => 'Daevin',
            'email' => 'daevin@example.net',
        ]);

        MyPosition::factory()->create([
            'user_id'=>$user3->id,
            'available' => true,
            'longitude' => '13.40',
            'latitude' => '5.08',
        ]);

        $user4=User::factory()->create([
            'name' => 'Essama',
            'email' => 'essama@gmail.com',
        ]);

        MyPosition::factory()->create([
            'user_id'=>$user4->id,
            'available' => true,
            'longitude' => '30.10',
            'latitude' => '13.95',
        ]);

        $user5=User::factory()->create([
            'name' => 'Morning Star',
            'email' => 'admin5@admin.com',
        ]);

        MyPosition::factory()->create([
            'user_id'=>$user5->id,
            'available' => true,
            'longitude' => '14.10',
            'latitude' => '3.59',
        ]);

        $user6=User::factory()->create([
            'name' => 'Nellie Gorczany',
            'email' => 'tkirlin@example.org',
        ]);

        MyPosition::factory()->create([
            'user_id'=>$user6->id,
            'available' => true,
            'longitude' => '29.784',
            'latitude' => '13.784',
        ]);

        $user7=User::factory()->create([
            'name' => 'Pierce Kulas',
            'email' => 'cathrine.kunde@example.net',
        ]);

        MyPosition::factory()->create([
            'user_id'=>$user7->id,
            'available' => true,
            'longitude' => '19.44',
            'latitude' => '25.959',
        ]);

        $user8=User::factory()->create([
            'name' => 'Miss Drew Luettgen DDS',
            'email' => 'travon01@example.net',
        ]);

        MyPosition::factory()->create([
            'user_id'=>$user8->id,
            'available' => true,
            'longitude' => '11.308',
            'latitude' => '25.272',
        ]);

        $user9=User::factory()->create([
            'name' => 'Dr. Deshawn Schneider III',
            'email' => 'rbarrows@example.org',
        ]);
        

        MyPosition::factory()->create([
            'user_id'=>$user9->id,
            'available' => true,
            'longitude' => '24.308',
            'latitude' => '26.732',
        ]);

        // MyPosition::factory()->create();

      

    }
}
