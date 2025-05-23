<?php

use App\Http\Controllers\Auth\AuthenticatedController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\HouseResidentController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ResidentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthenticatedController::class, 'store'])->name('api.login');
Route::post('/logout', [AuthenticatedController::class, 'destroy'])->name('api.logout')->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
    Route::get('/dashboard/monthly-summary', [DashboardController::class, 'monthlySummary'])->name('dashboard.monthly-summary');
    route::get('/dashboard/detail-by-month', [DashboardController::class, 'detailByMonth'])->name('dashboard.detail-by-month');

    #Resident
    Route::prefix('/residents')->group(function () {
        Route::get('', [ResidentController::class, 'index'])->name('residents.index');
        Route::get('create', [ResidentController::class, 'create'])->name('residents.create');
        Route::post('', [ResidentController::class, 'store'])->name('residents.store');
        Route::put('{resident_id}', [ResidentController::class, 'update'])->name('residents.update');
        Route::get('/stream-identification-card/{resident_id}', [ResidentController::class, 'streamIdentificationCardImg'])->name('residents.streamIdentificationCard');
    });

    #House
    Route::prefix('/houses')->group(function () {
        Route::get('', [HouseController::class, 'index'])->name('houses.index');
        Route::post('', [HouseController::class, 'store'])->name('houses.store');
        Route::put('{house_id}', [HouseController::class, 'update'])->name('houses.update');
    });

    #House Resident
    Route::prefix('/house-residents')->group(function () {
        Route::get('', [HouseResidentController::class, 'index'])->name('house-residents.index');
        Route::get('create', [HouseResidentController::class, 'create'])->name('house-residents.create');
        Route::post('', [HouseResidentController::class, 'store'])->name('house-residents.store');
        Route::put('{house_resident_id}', [HouseResidentController::class, 'update'])->name('house-residents.update');
    });

    #Expense
    Route::prefix('/expenses')->group(function () {
        Route::get('', [ExpenseController::class, 'index'])->name('expenses.index');
        Route::post('', [ExpenseController::class, 'store'])->name('expenses.store');
        Route::put('{expense_id}', [ExpenseController::class, 'update'])->name('expenses.update');
    });

    #Category
    Route::prefix('/categories')->group(function () {
        Route::get('', [CategoryController::class, 'index'])->name('categories.index');
        Route::get('create', [CategoryController::class, 'create'])->name('categories.create');
        Route::post('', [CategoryController::class, 'store'])->name('categories.store');
        Route::put('{category_id}', [CategoryController::class, 'update'])->name('categories.update');
    });

    #Payment
    Route::prefix('/payments')->group(function () {
        Route::get('', [PaymentController::class, 'index'])->name('payments.index');
        Route::get('create', [PaymentController::class, 'create'])->name('payments.create');
        Route::post('', [PaymentController::class, 'store'])->name('payments.store');
        Route::put('{payment_id}', [PaymentController::class, 'update'])->name('payments.update');
    });

});



