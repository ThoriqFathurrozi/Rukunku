<?php

namespace App\Http\Controllers;

use App\Models\House;
use Illuminate\Http\Request;

class HouseController extends Controller
{
    public function index()
    {
        $status = request()->input('status');
        $houses = House::when($status, function ($query) use ($status) {
            return $query->where('status', $status);
        })->get();

        return response()->json($houses);

    }

    public function store(Request $request)
    {
        $request->validate([
            'number' => 'required|string|max:255',
            'address' => 'required|string',
        ]);

        $house = House::create($request->all());

        return response()->json($house, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'number' => 'required|string|max:255',
            'address' => 'required|string',
        ]);

        $house = House::findOrFail($id);

        $house->update($request->all());

        return response()->json([
            'message' => 'Resident updated successfully',
            'house' => $house,
        ], 200);
    }
}
