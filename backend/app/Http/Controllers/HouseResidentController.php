<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\HouseResident;
use App\Models\Resident;
use Illuminate\Http\Request;

class HouseResidentController extends Controller
{
    public function index(Request $request)
    {
        $houseId = $request->input('house_id');
        $residentId = $request->input('resident_id');

        $data = [];

        if ($houseId) {
            $house = House::findOrFail($houseId);
            $houseResidents = $house->houseResidents()->with(['resident'])->get();
            $data = [
                'house' => $house,
                'houseResidents' => $houseResidents,
            ];


        }

        if ($residentId) {
            $resident = Resident::findOrFail($residentId);
            $houseResidents = $resident->houseResidents()->with(['house'])->get();
            $data = [
                'resident' => $resident,
                'residentHouse' => $houseResidents,
            ];

        }

        if (empty($data)) {
            $houseResidents = HouseResident::with(['house', 'resident'])->get();
            return response()->json($houseResidents);
        }

        return response()->json($data);
    }

    public function create()
    {
        $houses = House::all();
        $residents = Resident::all();

        return response()->json([
            'houses' => $houses,
            'residents' => $residents,
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'house_id' => 'required|exists:houses,house_id',
            'resident_id' => 'required|exists:residents,resident_id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        $houseResident = HouseResident::create([
            'foreign_house_id' => (int) $request->house_id,
            'foreign_resident_id' => (int) $request->resident_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);


        return response()->json(['message' => "House Resident created successfully", 'houseResident' => $houseResident], 201);
    }

    public function update(Request $request, $houseResidentId)
    {
        $houseResident = HouseResident::findOrFail($houseResidentId);

        if (!$houseResident) {
            return response()->json([
                'message' => 'House Resident not found',
            ], 404);
        }

        $request->validate([
            'house_id' => 'required|exists:houses,house_id',
            'resident_id' => 'required|exists:residents,resident_id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        $houseResident->update([
            'foreign_house_id' => (int) $request->house_id,
            'foreign_resident_id' => (int) $request->resident_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return response()->json(['message' => "House Resident updated successfully", 'houseResident' => $houseResident], 200);
    }

}
