<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
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
        // error message
        $fields = $request->validate([
            'role' => 'required|string',
            'name' => 'string',
            'username' => 'required|string|unique:users,username',
            'email' => 'required|string|unique:users,email',
            'phone' => 'required|string|max:14|unique:users,phone',
            'password' => 'required|string|confirmed'
        ]);
        
        $user = User::create([
            'role' => $fields['role'],
            'name' => $fields['name'],
            'username' => $fields['username'],
            'email' => $fields['email'],
            'phone' => $fields['phone'],
            'password' => bcrypt($fields['password'])
        ]);

        // create the api token
        // $token = $user->createToken('myAppToken')->plainTextToken;

        // response
        $response = [
            'user' => $user,
            // 'token' => $token
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

    
    // Login using api
    public function login(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check if the username is present
        $user = User::where('username', $fields['username'])->first();

        // Check Password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad Creds'
            ], 401);
        }

        // create the api token
        $token = $user->createToken('myAppToken')->plainTextToken;

        // response
        $response = [
            'user' => $user,
            'token' => $token
        ];

        // return what is needed
        return response($response, 201);
    }


    // Logout function
    public function logout(Request $request) {
        // auth()->user()->tokens()->delete();
        $request->user()->tokens()->delete();

        return [
            'message' => 'Logged Out'
        ];
    }
    
}
