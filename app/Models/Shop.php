<?php

namespace App\Models;

use App\Models\Address;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Shop extends Model
{
    use HasFactory;
    
    // Fillables preset
    protected $fillable = [
        'email',
        'phone',
        'address',
        'lat_lon',
        'pan',
        'gst',
        'trade_license',
        'owner_name',
        'owner_email',
        'owner_phone',
        'owner_address',
    ];


    /* // the filter function for tag and search filters
    public function scopeFilter($query, array $filters) {
        if($filters['tag'] ?? false) {
            $query->where('tags', 'like', '%' . request('tag') . '%');
        }

        if($filters['search'] ?? false) {
            $query->where('title', 'like', '%' . request('search') . '%')
                ->orWhere('description', 'like', '%' . request('search') . '%')
                ->orWhere('tags', 'like', '%' . request('search') . '%');
        }
    }

    // get address for the user
    public function scopeGetByAddress($query, $asddressId)
    {
        return $query->where('address', $asddressId);
    } */
    

    // Relationship to Address
    public function address()
    {
        return $this->belongsTo(Address::class, 'address');
    }
    public function ownerAddress()
    {
        return $this->belongsTo(Address::class, 'owner_address');
    }
    
    
    // Relationship to user
    // public function users()
    // {
    //     return $this->hasMany(User::class, 'shop_id');
    // }
    
}
