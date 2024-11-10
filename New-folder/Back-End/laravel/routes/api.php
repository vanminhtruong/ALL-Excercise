<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/chats', [ChatController::class, 'sendMessage']); // Gửi tin nhắn
    Route::get('/chats', [ChatController::class, 'getGroupChats']); // Lấy danh sách nhóm chat
    Route::get('/chats/{group_id}/messages', [ChatController::class, 'getMessages']); // Lấy tin nhắn trong nhóm
    Route::post('/chats/groups', [ChatController::class, 'createGroup']); // Tạo nhóm chat mới
    Route::post('/chats/join', [ChatController::class, 'joinGroup']); // Tham gia nhóm chat
});

