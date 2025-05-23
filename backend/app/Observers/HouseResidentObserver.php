<?php

namespace App\Observers;

use App\Models\HouseResident;
use App\Services\HouseStatusService;
use Illuminate\Support\Facades\Log;

class HouseResidentObserver
{
    /**
     * Handle the HouseResident "created" event.
     */
    public function created(HouseResident $houseResident): void
    {
        if ($house = $houseResident->house) {
            HouseStatusService::update($house);
        }
    }

    /**
     * Handle the HouseResident "updated" event.
     */
    public function updated(HouseResident $houseResident): void
    {
        // Only update house status if start_date or end_date changed
        if ($houseResident->wasChanged(['start_date', 'end_date'])) {
            if ($house = $houseResident->house) {
                HouseStatusService::update($house);
            }
        }
    }

    /**
     * Handle the HouseResident "deleted" event.
     */
    public function deleted(HouseResident $houseResident): void
    {
        if ($house = $houseResident->house) {
            HouseStatusService::update($house);
        }
    }

    /**
     * Handle the HouseResident "restored" event.
     */
    public function restored(HouseResident $houseResident): void
    {
        if ($house = $houseResident->house) {
            HouseStatusService::update($house);
        }
    }

    /**
     * Handle the HouseResident "force deleted" event.
     */
    public function forceDeleted(HouseResident $houseResident): void
    {
        //
    }
}
