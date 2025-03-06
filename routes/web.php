<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmployeeController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('employee', function () {
        return Inertia::render('employee');
    })->name('employee');
});

Route::middleware(['auth'])->group(function () {
    Route::get('equipment', function () {
        return Inertia::render('equipment');
    })->name('equipment');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
