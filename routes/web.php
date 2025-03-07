<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EquipmentController;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'user' => Auth::user(), // 👈 Pass the authenticated user
        ]);
    })->name('dashboard');

    // Employee Routes
    Route::get('/employee', [EmployeeController::class, 'index'])->name('employee.index');
    Route::get('/employee/employee-form', [EmployeeController::class, 'create'])->name('employee.create');
    Route::post('/employee', [EmployeeController::class, 'store'])->name('employee.store');
    Route::get('/employee/employee-view/{id}', [EmployeeController::class, 'show'])->name('employee.show');
    Route::get('/employee/employee-edit/{id}', [EmployeeController::class, 'edit'])->name('employee.edit');
    Route::put('/employee/update/{id}', [EmployeeController::class, 'update'])->name('employee.update');
    Route::delete('/employee/{id}', [EmployeeController::class, 'destroy'])->name('employee.destroy');

    // Equipment Routes
    Route::get('/equipment', [EquipmentController::class, 'index'])->name('equipment.index');
    Route::get('/equipment/equipment-form', [EquipmentController::class, 'create'])->name('equipment.create');
    Route::post('/equipment', [EquipmentController::class, 'store'])->name('equipment.store');
    Route::get('/equipment/equipment-view/{id}', [EquipmentController::class, 'show'])->name('equipment.show');
    Route::get('/equipment/equipment-edit/{id}', [EquipmentController::class, 'edit'])->name('equipment.edit');
    Route::put('/equipment/update/{id}', [EquipmentController::class, 'update'])->name('equipment.update');
    Route::delete('/equipment/{id}', [EquipmentController::class, 'destroy'])->name('equipment.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
