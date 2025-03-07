<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;

    protected $table = 'equipments'; // Match the migration table name

    protected $fillable = [
        'item',
        'description',
        'serial_number',
        'stored_date',
        'status',
        'quantity',
    ];
}
