<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions'; // Match the migration table name

    protected $fillable = [
        'user_id',
        'employee_id',
        'equipment_id',
        'status',
        'release_mode',
        'release_state',
        'release_date',
        'return_state',
        'return_date',
    ];

    /**
     * Define relationships with other models.
     */
    
    // Transaction belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Transaction belongs to an Employee
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    // Transaction belongs to Equipment
    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
