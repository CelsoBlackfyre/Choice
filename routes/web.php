<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CharactersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/characters', function () {
    return Inertia::render('MainPage');
})->name('characters');

// Separate GET route for the form view and POST route for form submission
Route::get('/characters/create', function () {
    return Inertia::render('CreateCharacter');
})->name('characters.create');

Route::post('/characters/create', [CharactersController::class, 'store'])->name('characters.store');

// Authenticated routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['verified'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
