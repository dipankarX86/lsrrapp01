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


    // the filter function for tag and search filters
    public function scopeFilter($query, array $filters) {
        // if($filters['tag'] ?? false) {
        //     $query->where('tags', 'like', '%' . request('tag') . '%');
        // }

        if($filters['srch_string'] ?? false) {
            $query
                ->join('addresses', 'shops.address', '=', 'addresses.id')
                ->select('shops.address', 'shops.owner_name', 'shops.phone', 'shops.owner_phone', 'shops.id', 'shops.created_at')

                ->where('email', 'like', '%' . request('srch_string') . '%')
                ->orWhere('phone', 'like', '%' . request('srch_string') . '%')
                ->orWhere('pan', 'like', '%' . request('srch_string') . '%')
                ->orWhere('gst', 'like', '%' . request('srch_string') . '%')
                ->orWhere('trade_license', 'like', '%' . request('srch_string') . '%')
                ->orWhere('owner_name', 'like', '%' . request('srch_string') . '%')
                ->orWhere('owner_email', 'like', '%' . request('srch_string') . '%')
                ->orWhere('owner_phone', 'like', '%' . request('srch_string') . '%')
                
                ->orWhere('addresses.csc', 'like', '%' . request('srch_string') . '%')
                ->orWhere('addresses.line1', 'like', '%' . request('srch_string') . '%')
                ->orWhere('addresses.line2', 'like', '%' . request('srch_string') . '%');
                // next job is to include city state and country name as well as address sections
        }
    }

    /* // get address for the user
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
