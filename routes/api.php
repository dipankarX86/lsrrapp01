<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StateController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\CountryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* $myfile = fopen("TEST.txt", "w") or die("Unable to open file!");
$txt = $token;
fwrite($myfile, $txt);
fclose($myfile); */

/* // Master Admin Routes
Route::group(['middleware' => ['auth:sanctum', 'role:1']], function () {
    Route::post('/users', [UserController::class, 'store']);  // creates a new user
    Route::post('/shops', [ShopController::class, 'store']);  // creates a new shop
}); */

Route::get('/sanctum/csrf-cookie', function (Request $request) {  // CSRF token for any session, specialy important for: cross site requests
    $token = csrf_token();  // or can use: // $token = $request->session()->token();
    return response($token, 200);
});
//
// Route::get('/roles', [RoleController::class, 'index']);  // retrieving all the roles
Route::middleware(['auth:sanctum', 'role:1'])->get('/roles', [RoleController::class, 'index']);  // retrieving all the roles

// city, state and country lists returning
Route::middleware(['auth:sanctum', 'role:1'])->get('/addresses/csc', [AddressController::class, 'csc']);
//
Route::middleware(['auth:sanctum', 'role:1'])->get('/countries/2levels/{id}', [CountryController::class, 'index']);
Route::middleware(['auth:sanctum', 'role:1'])->get('/states/2levels/{id}', [StateController::class, 'statesForCountry']);
Route::middleware(['auth:sanctum', 'role:1'])->get('/cities/2levels/{id}', [CityController::class, 'citiesForState']);
Route::get('/countries', [CountryController::class, 'index']);
Route::get('/states', [StateController::class, 'index']);
Route::get('/cities', [CityController::class, 'index']);

Route::middleware(['auth:sanctum', 'role:1'])->get('/users', [UserController::class, 'index']);  // show all users
Route::middleware(['auth:sanctum', 'role:1'])->post('/users', [UserController::class, 'store']);  // creates a new user
Route::post('/users/login', [UserController::class, 'login']);  // Logging in, for any admin user
Route::middleware('auth:sanctum')->post('/users/logout', [UserController::class, 'logout']);  // logs the user out

// Route::get('/shops', [ShopController::class, 'index']);  // show all the shops available
Route::middleware(['auth:sanctum', 'role:1'])->post('/shops', [ShopController::class, 'store']);  // creates a new shop
Route::middleware(['auth:sanctum', 'role:1'])->get('/shops', [ShopController::class, 'index']);  // delivers a list of shops with sorting, filter and pagination
Route::middleware(['auth:sanctum', 'role:1'])->get('/shops/{id}', [ShopController::class, 'show']);

