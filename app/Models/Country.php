<?php

namespace App\Models;

use App\Models\State;
use App\Models\Address;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Country extends Model
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
    ];

    // relationship with Address
    public function addresses()
    {
        return $this->hasMany(Address::class, 'country');
    }

    // Relationship with state
    public function states()
    {
        return $this->hasMany(State::class, 'country');
    }
    
    // // Relationship with cities
    // public function cities()
    // {
    //     return $this->hasManyThrough(City::class, State::class, 'country', 'state');
    // }

}
