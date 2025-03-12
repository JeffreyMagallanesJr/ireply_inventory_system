<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $table = 'employees'; // Match the migration table name

    protected $fillable = [
        'id_number',
        'first_name',
        'last_name',
        'email',
        'contact_number',
        'address',
        'department',
        'position',
        'date_hired',
    ];
}