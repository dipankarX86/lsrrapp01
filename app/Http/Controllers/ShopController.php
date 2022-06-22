<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\Address;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Shop::all();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // error message
        /* $request->validate([
            'email' => 'required|string|unique:shops,email',
            'phone' => 'required|string|max:14|unique:shops,phone',
            'lat_lon' => ['required', 'string', 'regex:/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/'], 
                                                // regex:/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/  too should work.
            'owner_email' => 'required|string|unique:shops,owner_email',
            'owner_phone' => 'required|string|max:14|unique:shops,owner_phone',
        ]);
        return Shop::create($request->all()); */

        // error message
        $fields = $request->validate([
            'email' => 'required|string|unique:shops,email',
            'phone' => 'required|string|max:14|unique:shops,phone',

            // 'address.line1' => 'string',  // this is a possibility  
            // 'address.line2' => 'string',
            // 'address.city' => 'string',
            // 'address.state' => 'string',
            // 'address.country' => 'string',
            // 'address.postal_code' => 'string',

            'address' => '',
            'lat_lon' => 'string',
            'pan' => 'string',
            'gst' => 'string',
            'trade_license' => 'string',
            'owner_name' => 'string',
            'owner_email' => 'required|string|unique:shops,owner_email',
            'owner_phone' => 'required|string|max:14|unique:shops,owner_phone',

            // 'owner_address.line1' => 'string',  // this is a possibility  
            // 'owner_address.line2' => 'string',
            // 'owner_address.city' => 'string',
            // 'owner_address.state' => 'string',
            // 'owner_address.country' => 'string',
            // 'owner_address.postal_code' => 'string',

            'owner_address' => '',
        ]);
        
        // // 
        // // First Compare and Store the Addresses
        // // Save the shop address without any hasitation
        // $addressId = Address::createNew($fields['address']);  // ->id
        // // 
        // // save the owner address only if the shop address is different from it
        // if(
        //    !( $fields['owner_address']['line1'] === $fields['address']['line1'] &&
        //     $fields['owner_address']['line2'] === $fields['address']['line2'] &&
        //     $fields['owner_address']['city'] === $fields['address']['city'] &&
        //     $fields['owner_address']['state'] === $fields['address']['state'] &&
        //     $fields['owner_address']['country'] === $fields['address']['country'] &&
        //     $fields['owner_address']['postal_code'] === $fields['address']['postal_code']) 
        // ) {
        //     $ownerAddressId = Address::createNew($fields['owner_address']); // ->id  not sure if this id extraction will work, 
        //                                                                 //for now will write to a file to see results
        // } else {
        //     $ownerAddressId = $addressId;
        // }
        // // 

        $shop = Shop::create([
            'email' => $fields['email'],
            'phone' => $fields['phone'],

            // 'address' => strval($addressId),  // store the id of the address, after saving to address table

            'lat_lon' => $fields['lat_lon'],
            'pan' => $fields['pan'],
            'gst' => $fields['gst'],
            'trade_license' => $fields['trade_license'],
            'owner_name' => $fields['owner_name'],
            'owner_email' => $fields['owner_email'],
            'owner_phone' => $fields['owner_phone'],

            // 'owner_address' => strval($ownerAddressId),  // store the id of the address, after saving to address table
        ]);

        // response
        $response = [
            'shop' => $shop,
        ];

        // return what is needed
        return response($response, 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}