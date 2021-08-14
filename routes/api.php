<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\CategoryController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Category Routes
|--------------------------------------------------------------------------
*/
Route::get('category/search', [CategoryController::class, 'searchCategory']);

/*
|--------------------------------------------------------------------------
| Photos Routes
|--------------------------------------------------------------------------
*/


Route::get('/photos/category/{id}', [PhotoController::class, 'categoryPhoto']);
Route::get('/donwload/photo/{id}', [PhotoController::class, 'donwloadCount']);

Route::apiResources([
    'photos' => PhotoController::class
]);
