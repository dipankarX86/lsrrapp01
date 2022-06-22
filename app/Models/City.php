<?php

namespace App\Models;

use App\Models\State;
use App\Models\Address;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class City extends Model
{
    use HasFactory;


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    // Fillables preset
    protected $fillable = [
        'name',
        'state',
    ];

    // relationship with Address - outward
    public function addresses()
    {
        return $this->hasMany(Address::class, 'city');
    }
    
    // Relationship with state - inward
    public function state()
    {
        return $this->belongsTo(State::class, 'state');
    }
}
