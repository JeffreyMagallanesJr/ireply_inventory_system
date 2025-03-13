<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Equipment;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipment>
 */
class EquipmentFactory extends Factory
{
    protected $model = Equipment::class;

    public function definition(): array
    {
        $items = [
            'Laptop' => ['Dell XPS 15', 'MacBook Pro M3', 'ASUS ROG Zephyrus G14', 'Lenovo ThinkPad X1', 'HP Spectre x360', 'Acer Predator Helios 300', 'MSI Stealth 16', 'Razer Blade 15', 'Samsung Galaxy Book3', 'Microsoft Surface Laptop 5'],
            'Mouse' => ['Logitech G Pro', 'Razer DeathAdder', 'SteelSeries Rival 5', 'Corsair Dark Core', 'Glorious Model O', 'Cooler Master MM720', 'Asus ROG Keris', 'HyperX Pulsefire Haste', 'Zowie EC2', 'Logitech MX Master 3S'],
            'Keyboard' => ['Corsair K95', 'Keychron K6', 'Ducky One 3', 'Logitech G915', 'Razer Huntsman Mini', 'SteelSeries Apex Pro', 'HyperX Alloy Origins', 'Akko 3068B', 'Anne Pro 2', 'Varmilo VA87M'],
            'Monitor' => ['LG UltraGear 27GP850', 'Dell Alienware AW3423DW', 'ASUS ROG Swift PG259QN', 'Gigabyte M32U', 'BenQ EX3501R', 'MSI Optix MAG274QRF', 'Acer Predator X27', 'Samsung Odyssey G7', 'ViewSonic Elite XG270', 'HP Omen X 25'],
            'Headset' => ['SteelSeries Arctis Pro', 'HyperX Cloud Alpha', 'Razer BlackShark V2', 'Logitech G733', 'Corsair Virtuoso RGB', 'Astro A50', 'Beyerdynamic DT 990 Pro', 'Sennheiser Game One', 'Turtle Beach Elite Atlas', 'JBL Quantum One'],
            'Printer' => ['HP LaserJet Pro MFP', 'Canon Pixma TR8520', 'Brother HL-L2350DW', 'Epson EcoTank ET-3760', 'Lexmark MB3442adw', 'Samsung Xpress M2020W', 'Xerox Phaser 6510', 'Dell Color Cloud E525w', 'Ricoh SP C261DNw', 'OKI C532dn'],
            'Router' => ['Asus RT-AX86U', 'Netgear Nighthawk AX12', 'TP-Link Archer AX6000', 'Google Nest WiFi', 'Linksys Velop MX10', 'Ubiquiti AmpliFi Alien', 'Synology RT2600ac', 'D-Link DIR-3060', 'Huawei AX3 Pro', 'MikroTik hAP AC3'],
            'External Storage' => ['Samsung T7 SSD', 'WD Black P10', 'Seagate Backup Plus Hub', 'SanDisk Extreme Pro SSD', 'Crucial X8 SSD', 'Toshiba Canvio Advance', 'LaCie Rugged Mini', 'ADATA HD710 Pro', 'Transcend StoreJet 25M3', 'G-Technology G-Drive'],
            'Camera' => ['Canon EOS R6', 'Sony Alpha A7 III', 'Nikon Z6 II', 'Fujifilm X-T4', 'Panasonic Lumix GH5', 'Olympus OM-D E-M1 Mark III', 'Leica Q2', 'GoPro Hero 11 Black', 'DJI Osmo Pocket 2', 'Ricoh GR III'],
            'Smartphone' => ['iPhone 15 Pro Max', 'Samsung Galaxy S24 Ultra', 'Google Pixel 8 Pro', 'OnePlus 12', 'Xiaomi 13 Ultra', 'Sony Xperia 1 V', 'ASUS ROG Phone 8', 'Nothing Phone (2)', 'Motorola Edge 40 Pro', 'Realme GT5 Pro']
        ];

        $item = $this->faker->randomElement(array_keys($items));
        $description = 'Model: ' . $this->faker->randomElement($items[$item]);

        return [
            'item' => $item,
            'specs' => $this->faker->word() . ': ' . $this->faker->words(3, true),
            'description' => $description,
            'serial_number' => $this->faker->unique()->bothify('SN-#####'),
            'stored_date' => $this->faker->date(),
            'status' => $this->faker->randomElement(['Available', 'Unavailable']),
            'quantity' => '1',
        ];
    }
}
