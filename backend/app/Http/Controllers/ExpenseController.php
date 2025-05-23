<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $expenses = Expense::with(['category'])->get();
        return response()->json(["expenses" => $expenses]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'description' => 'required|string|max:255',
            'category' => 'required|exists:categories,category_id',
            'expense_total' => 'required|numeric',
            'expense_date' => 'required|date',
        ]);


        $expense = Expense::create([
            'date' => $request->expense_date,
            'description' => $request->description,
            'foreign_category_id' => $request->category,
            'total' => $request->expense_total,
        ]);

        return response()->json($expense, 201);
    }

    public function update(Request $request, $expenseId)
    {
        $request->validate([
            'description' => 'required|string|max:255',
            'category' => 'required|exists:categories,category_id',
            'expense_total' => 'required|numeric',
            'expense_date' => 'required|date',
        ]);

        $expense = Expense::findOrFail($expenseId);

        $expense->update([
            'date' => $request->expense_date,
            'description' => $request->description,
            'foreign_category_id' => $request->category,
            'total' => $request->expense_total,
        ]);

        return response()->json(['message' => "Payment updated successfully", 'expense' => $expense], 200);
    }

}
