<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\Address;
use Illuminate\Http\Request;
use App\Http\Controllers\AddressController;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // call all the shops first, [simplePaginate has some problems( it dont have a next page)]
        // $rawShops = Shop::latest()->paginate(6);
        $rawShops = null;

        /* if (request(['sort_by']) && request(['sort_by'])['sort_by'] === 'DESC_CREATED') {
            $rawShops = Shop::latest()->filter(request(['srch_string']))->paginate(6);
        } else  */
        if (request(['sort_by']) && request(['sort_by'])['sort_by'] === 'ASC_CREATED') {
            $rawShops = Shop::oldest()->filter(request(['srch_string']))->paginate(12);
        } else {
            $rawShops = Shop::latest()->filter(request(['srch_string']))->paginate(12);
        }
        
        $shops =  json_decode(json_encode($rawShops));

        // now create the hierarchy
        for($i=0 ; $i < sizeof($shops->data) ; $i++) {
            if($shops->data[$i]->address) {  // to test if address is is present, if not, then no need to bother the database
                $shops->data[$i]->address = Address::where('id', $shops->data[$i]->address)->first();
            }
        }
        return $shops;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        /* $myfile = fopen("TEST.txt", "w") or die("Unable to open file!");
        $txt = $request->address->state;
        fwrite($myfile, $txt);
        fclose($myfile); */

        // error message
        $fields = $request->validate([
            'email' => 'required|string|unique:shops,email',
            'phone' => 'required|string|max:14|unique:shops,phone',

            'address.line1' => 'nullable|string',  // this is a possibility  
            'address.line2' => 'nullable|string',
            'address.city' => 'required|string',
            'address.state' => 'required|string',
            'address.country' => 'required|string',
            'address.postal_code' => 'nullable|string',

            // 'address' => '',
            'lat_lon' => ['nullable', 'string', 'regex:/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/'], 
                            // regex:/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/  too should work.
            'pan' => 'nullable|string',
            'gst' => 'nullable|string',
            'trade_license' => 'nullable|string',
            'owner_name' => 'nullable|string',
            'owner_email' => 'required|string|unique:shops,owner_email',
            'owner_phone' => 'required|string|max:14|unique:shops,owner_phone',

            'owner_address.line1' => 'nullable|string',  // this is a possibility  
            'owner_address.line2' => 'nullable|string',
            'owner_address.city' => 'required|string',
            'owner_address.state' => 'required|string',
            'owner_address.country' => 'required|string',
            'owner_address.postal_code' => 'nullable|string',

            // 'owner_address' => '',
        ]);
        
        // 
        // First Compare and Store the Addresses
        // Save the shop address without any hasitation
        $addressId = AddressController::createNew($fields['address']);  // ->id
        // 
        // save the owner address only if the shop address is different from it
        if(
           !( $fields['owner_address']['line1'] === $fields['address']['line1'] &&
            $fields['owner_address']['line2'] === $fields['address']['line2'] &&
            $fields['owner_address']['city'] === $fields['address']['city'] &&
            $fields['owner_address']['state'] === $fields['address']['state'] &&
            $fields['owner_address']['country'] === $fields['address']['country'] &&
            $fields['owner_address']['postal_code'] === $fields['address']['postal_code']) 
            || $addressId === 0
        ) {
            $ownerAddressId = AddressController::createNew($fields['owner_address']); // ->id  not sure if this id extraction will work, 
                                                                        //for now will write to a file to see results
        } else {
            $ownerAddressId = $addressId;
        }
        // 

        $shop = Shop::create([
            'email' => $fields['email'],
            'phone' => $fields['phone'],

            'address' => strval($addressId),  // store the id of the address, after saving to address table

            'lat_lon' => $fields['lat_lon'],
            'pan' => $fields['pan'],
            'gst' => $fields['gst'],
            'trade_license' => $fields['trade_license'],
            'owner_name' => $fields['owner_name'],
            'owner_email' => $fields['owner_email'],
            'owner_phone' => $fields['owner_phone'],

            'owner_address' => strval($ownerAddressId),  // store the id of the address, after saving to address table
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
        $rawShop = Shop::where('id', $id)->first();

        $shop =  json_decode(json_encode($rawShop));

        if($shop->address) {  // to test if address is is present, if not, then no need to bother the database
            $shop->address = Address::where('id', $shop->address)->first();
            $shop->owner_address = Address::where('id', $shop->owner_address)->first();
        }

        // response
        $response = [
            'shop' => $shop,
        ];

        // return what is needed
        return response($response, 201);
    }
    // 

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
