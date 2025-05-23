<?php

namespace App\Providers;

use App\Models\HouseResident;
use App\Observers\HouseResidentObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        HouseResident::observe(HouseResidentObserver::class);
    }
}
