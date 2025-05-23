<?php

namespace App\Http\Controllers;

use App\Enums\MaritalStatusEnum;
use App\Enums\ResidentStatusEnum;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Enum;

class ResidentController extends Controller
{
    public function index()
    {
        $residents = Resident::all();
        return response()->json($residents);

    }

    public function create()
    {
        $maritalStatusEnum = MaritalStatusEnum::cases();
        $residentStatusEnum = ResidentStatusEnum::cases();

        return response()->json([
            'maritial_status' => $maritalStatusEnum,
            'resident_status' => $residentStatusEnum,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'identification_card_img' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'maritial_status' => ['required', new Enum(MaritalStatusEnum::class)],
            'phone_number' => 'required|string|max:15',
            'resident_status' => ['required', new Enum(ResidentStatusEnum::class)],
        ]);

        $identificationCardImg = $request->file('identification_card_img');
        $identificationCardImgName = time() . '_' . $request->get('full_name') . '.' . $identificationCardImg->getClientOriginalExtension();
        $identificationCardImgNew = $identificationCardImg->storeAs('identification_card', $identificationCardImgName, 'local');

        if (!$identificationCardImgNew) {
            return response()->json([
                'message' => 'Failed to upload identification card image',
            ], 500);
        }

        $resident = Resident::create(
            [
                'identification_card_img' => $identificationCardImgName,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'maritial_status' => $request->maritial_status,
                'resident_status' => $request->resident_status,
                'phone_number' => $request->phone_number,
            ]
        );


        return response()->json([
            'message' => 'Resident created successfully',
            'resident' => $resident,
        ], 201);

    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'identification_card_img' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'maritial_status' => ['required', new Enum(MaritalStatusEnum::class)],
            'phone_number' => 'required|string|max:15',
            'resident_status' => ['required', new Enum(ResidentStatusEnum::class)],
        ]);

        $resident = Resident::findOrFail($id);

        if ($request->hasFile('identification_card_img')) {
            $identificationCardImg = $request->file('identification_card_img');
            $identificationCardImgName = time() . '_' . $request->get('full_name') . '.' . $identificationCardImg->getClientOriginalExtension();
            $identificationCardImgNew = $identificationCardImg->storeAs('identification_card', $identificationCardImgName, 'local');

            if (!$identificationCardImgNew) {
                return response()->json([
                    'message' => 'Failed to upload identification card image',
                ], 500);
            }

            // Delete the old image if it exists
            if ($resident->identification_card_img && file_exists(storage_path('app/identification_card/' . $resident->identification_card_img))) {
                unlink(storage_path('app/identification_card/' . $resident->identification_card_img));
            }

            $resident->identification_card_img = $identificationCardImgName;
        }

        $resident->full_name = $request->full_name;
        $resident->maritial_status = $request->maritial_status;
        $resident->phone_number = $request->phone_number;
        $resident->resident_status = $request->resident_status;

        if ($resident->save()) {
            return response()->json([
                'message' => 'Resident updated successfully',
                'resident' => $resident,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Failed to update resident',
            ], 500);
        }


    }

    public function StreamIdentificationCardImg($id)
    {
        $resident = Resident::findOrFail($id);
        $filePath = 'identification_card/' . $resident->identification_card_img;

        if (!Storage::disk('local')->exists($filePath)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        return Storage::disk('local')->response($filePath, null, [
            'Content-Type' => Storage::disk('local')->mimeType($filePath),
            'Cache-Control' => 'no-store, no-cache, must-revalidate',
        ]);
    }

}
