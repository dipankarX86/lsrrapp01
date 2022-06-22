<?php

namespace App\Models;

use App\Models\City;
use App\Models\State;
use App\Models\Country;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends Model
{
    use HasFactory;
    
    // Fillables preset
    protected $fillable = [
        'line1',
        'line2',
        'city',
        'state',
        'country',
        'postal_code',
    ];


    // Relationship to Country
    public function country()
    {
        return $this->belongsTo(Country::class, 'country');
    }
    // Relationship to State
    public function state()
    {
        return $this->belongsTo(State::class, 'state');
    }
    // Relationship to City
    public function city()
    {
        return $this->belongsTo(City::class, 'city');
    }

    
    // Relationship to Shop
    public function shop()
    {
        return $this->hasOne(Shop::class, 'address');
    }
    public function shopOwner()
    {
        return $this->hasOne(Shop::class, 'owner_address');
    }

}
