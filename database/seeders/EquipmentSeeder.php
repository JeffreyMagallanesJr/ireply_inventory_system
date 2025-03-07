<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $equipments = [
            [
                'item' => 'Laptop',
                'description' => 'Dell XPS 15, 16GB RAM, 512GB SSD',
                'serial_number' => 'DXPS123456',
                'stored_date' => Carbon::now()->subDays(10),
                'status' => 'available',
            ],
            [
                'item' => 'Projector',
                'description' => 'Epson PowerLite 1781W, 3000 Lumens',
                'serial_number' => 'EPPL789012',
                'stored_date' => Carbon::now()->subDays(5),
                'status' => 'available',
            ],
            [
                'item' => 'Printer',
                'description' => 'HP LaserJet Pro MFP M428fdw',
                'serial_number' => 'HPLJ456789',
                'stored_date' => Carbon::now()->subDays(2),
                'status' => 'unavailable',
            ],
            [
                'item' => 'Server Rack',
                'description' => '42U Rack Cabinet, Black',
                'serial_number' => 'SRACK987654',
                'stored_date' => Carbon::now()->subDays(15),
                'status' => 'available',
            ],
        ];

        DB::table('equipments')->insert($equipments);
    }
}