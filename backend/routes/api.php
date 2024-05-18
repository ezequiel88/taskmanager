<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    // Route::post('/refresh-token', [AuthController::class, 'refreshToken'])->name('auth.refreshToken');
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

Route::middleware('auth:sanctum')->prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('/', [TaskController::class, 'store'])->name('tasks.store');
    Route::put('/{id}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('/{id}', [TaskController::class, 'destroy'])->name('tasks.destroy');
});
