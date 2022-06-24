<?php

namespace App\Models;

use App\Models\City;
use App\Models\Address;
use App\Models\Country;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class State extends Model
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
        'country',
    ];

    // relationship with Address - outward
    public function addresses()
    {
        return $this->hasMany(Address::class, 'state');
    }
    
    // Relationship with City - outward
    public function cities()
    {
        return $this->hasMany(City::class, 'state');
    }

    // Relationship with Country - inward
    public function country()
    {
        return $this->belongsTo(Country::class, 'country');
    }
}
