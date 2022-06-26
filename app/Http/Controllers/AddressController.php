<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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

    // Store a newly created resource in storage from another controller
    // public function createNew($addrDataRaw)
    public static function createNew($fields)
    {
        /* $addrData = json_decode($addrDataRaw, true);
        // 
        // error message
        $fields = $addrData->validate([
            'line1' => 'string',
            'line2' => 'string',
            'city' => 'string',
            'state' => 'string',
            'country' => 'string',
            'postal_code' => 'string',
        ]); */


        // manual validation for existance of requested CSC is required
        // also, if $addrData->validate dont work, validate that manually
        $city = City::where('id', $fields['city'])->first();
        $state = State::where('id', $fields['state'])->first();
        $country = Country::where('id', $fields['country'])->first();
        // 
        if(!$city || !$state || !$country) {
            // return response([
            //     'message' => 'City, State or Country Does Not exists'
            // ], 401);
            return '0';  // this needs work
        }
        // for now it is Ok, but when any of them is 0 or 'Something Else', the item needs to be stored in it's table
        // first chk if city is 0, if yes, it will have associated $fields['new_city'] variable, create a new city for that data
        // the citywe are going to save bellow will be the id returned after saving the new city
        // same for country and state
        // 
        
        // now create the address in table
        $address = Address::create([
            'line1' => $fields['line1'],
            'line2' => $fields['line2'],
            'city' => $fields['city'],
            'state' => $fields['state'],
            'country' => $fields['country'],
            'postal_code' => $fields['postal_code']
        ]);

        // return what is needed
        return $address->id;
    }


    // return the whole hierarchy of countries, states and cities
    public function csc()
    {
        // call all the countries, states and cities
        $rawCountries = Country::all();
        $rawStates = State::all();
        $rawCities = City::all();

        $countries =  json_decode(json_encode($rawCountries));
        $states =  json_decode(json_encode($rawStates));
        $cities =  json_decode(json_encode($rawCities));

        // now create the hierarchy
        for($i=0 ; $i < sizeof($countries) ; $i++) {
            $countries[$i]->states = [];
            for($j=0 ; $j < sizeof($states) ; $j++) {
                $states[$j]->cities = [];
                for($k=0 ; $k < sizeof($cities) ; $k++) {
                    if($cities[$k]->state == $states[$j]->id ) {
                        array_push( $states[$j]->cities, $cities[$k] );
                    }
                }
                if($states[$j]->country == $countries[$i]->id ) {
                    array_push( $countries[$i]->states, $states[$j] );
                }
            }
        }
        return $countries;
    }

}
