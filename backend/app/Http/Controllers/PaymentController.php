<?php

namespace App\Http\Controllers;

use App\Enums\PaymentStatusEnum;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $payments = Payment::with(['house', 'resident', 'category'])->get();
        return response()->json(["payments" => $payments]);
    }

    public function create()
    {
        $status = PaymentStatusEnum::cases();
        return response()->json([
            'paymentStatus' => $status,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'house_id' => 'required|exists:houses,house_id',
            'resident_id' => 'required|exists:residents,resident_id',
            'category' => 'required|exists:categories,category_id',
            'payment_date' => 'required|date',
            'payment_total' => 'required|numeric',
            'total_month' => 'required|numeric',
            'description' => 'required|string',
            'status' => ['nullable', new Enum(PaymentStatusEnum::class)],
        ]);

        $payment = Payment::create([
            'foreign_house_id' => $request->house_id,
            'foreign_resident_id' => $request->resident_id,
            'payment_date' => $request->payment_date,
            'total_payment' => $request->payment_total,
            'foreign_category_id' => $request->category,
            'total_month' => $request->total_month,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        return response()->json($payment, 201);
    }

    public function update(Request $request)
    {
        $payment = Payment::findOrFail($request->payment_id);

        if (!$payment) {
            return response()->json([
                'message' => 'House Resident not found',
            ], 404);
        }

        $request->validate([
            // 'house_id' => 'required|exists:houses,house_id',
            // 'resident_id' => 'required|exists:residents,resident_id',
            'payment_date' => 'required|date',
            'category' => 'required|exists:categories,category_id',
            'payment_total' => 'required|numeric',
            'total_month' => 'required|numeric',
            'description' => 'required|string',
            'status' => ['required', new Enum(PaymentStatusEnum::class)],
        ]);
        $payment->update([
            'foreign_category_id' => $request->category,
            'foreign_house_id' => $request->house_id,
            'foreign_resident_id' => $request->resident_id,
            'payment_date' => $request->payment_date,
            'total_payment' => $request->payment_total,
            'total_month' => $request->total_month,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        return response()->json(['message' => "Payment updated successfully", 'payment' => $payment], 200);

    }

}
