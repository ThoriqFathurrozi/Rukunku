<?php

namespace App\Services;

use App\Models\House;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class HouseStatusService
{
    public static function update(House $house): void
    {
        $today = Carbon::today();

        // Check if the house has any active resident record today
        $hasActiveResident = $house->houseResidents()
            ->where('start_date', '<=', $today)
            ->where(function ($query) use ($today) {
                $query->where('end_date', '>=', $today)
                    ->orWhereNull('end_date');
            })
            ->exists();


        $status = $hasActiveResident ? 'occupied' : 'unoccupied';


        if ($house->status !== $status) {
            $house->status = $status;
            $house->save();
        }

    }
}