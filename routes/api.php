<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ShopController;

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

// PUBLIC ROUTES
// ****
Route::get('/sanctum/csrf-cookie', function (Request $request) {  // CSRF token for any session, specialy important for: cross site requests
    $token = csrf_token();  // or can use: // $token = $request->session()->token();
    return response($token, 200);
});
//
Route::post('/users/login', [UserController::class, 'login']);  // Logging in, for any admin user
Route::get('/shops', [ShopController::class, 'index']);  // show all the shops available


// PROTECTED ROUTES
// ****
Route::middleware('auth:sanctum')->post('/users/logout', [UserController::class, 'logout']);  // logs the user out
Route::middleware(['auth:sanctum', 'role:1'])->post('/users', [UserController::class, 'store']);  // creates a new user
Route::middleware(['auth:sanctum', 'role:1'])->post('/shops', [ShopController::class, 'store']);  // creates a new shop

