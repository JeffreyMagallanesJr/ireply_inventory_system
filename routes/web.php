<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmployeeController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'user' => Auth::user(), // 👈 Pass the authenticated user
        ]);
    })->name('dashboard');

    Route::get('/employee', [EmployeeController::class, 'index'])->name('employee');

    Route::get('/employee', [EmployeeController::class, 'index'])->name('employee.index');
    Route::get('/employee/employee-form', [EmployeeController::class, 'create'])->name('employee.create');
    Route::post('/employee', [EmployeeController::class, 'store'])->name('employee.store');

    Route::get('/employee/employee-view/{id}', [EmployeeController::class, 'show']);

    Route::get('/employee/employee-edit/{id}', [EmployeeController::class, 'edit']);

    Route::put('/employee/update/{id}', [EmployeeController::class, 'update'])->name('employee.update');

    Route::delete('/employee/delete/{id}', [EmployeeController::class, 'destroy'])->name('employee.destroy');


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
