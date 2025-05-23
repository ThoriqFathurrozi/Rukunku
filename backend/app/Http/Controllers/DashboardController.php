<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Ambil total semua pemasukan yang lunas
        $totalIncome = Payment::where('status', 'paid')->sum('total_payment');

        // Ambil total semua pengeluaran
        $totalExpense = Expense::sum('total');

        // Hitung saldo akhir
        $balance = $totalIncome - $totalExpense;

        return response()->json([
            'total_income' => (float) $totalIncome,
            'total_expense' => (float) $totalExpense,
            'balance' => (float) $balance,
        ]);
    }
    public function monthlySummary(Request $request)
    {

        $year = $request->input('year');

        if ($year && !is_numeric($year)) {
            return response()->json(['error' => 'Year parameter must be numeric'], 400);
        }

        if ($year) {
            // Jika tahun diset, ambil semua bulan tahun tersebut (Jan - Dec)
            $startDate = Carbon::createFromDate($year, 1, 1)->startOfMonth();
            $endDate = Carbon::createFromDate($year, 12, 31)->endOfMonth();
        } else {
            // Jika tidak ada tahun, ambil 12 bulan terakhir dari bulan sekarang
            $endDate = Carbon::now()->endOfMonth();
            $startDate = $endDate->copy()->subMonths(11)->startOfMonth();
        }

        // Ambil total pemasukan per bulan dan tahun dalam rentang tanggal dengan groupBy
        $incomes = Payment::select(
            DB::raw('YEAR(payment_date) as year'),
            DB::raw('MONTH(payment_date) as month'),
            DB::raw('SUM(total_payment) as total_income')
        )
            ->where('status', 'paid')
            ->whereBetween('payment_date', [$startDate, $endDate])
            ->groupBy('year', 'month')
            ->get()
            ->keyBy(fn($item) => $item->year . '-' . $item->month);

        // Ambil total pengeluaran per bulan dan tahun dalam rentang tanggal dengan groupBy
        $expenses = Expense::select(
            DB::raw('YEAR(date) as year'),
            DB::raw('MONTH(date) as month'),
            DB::raw('SUM(total) as total_expense')
        )
            ->whereBetween('date', [$startDate, $endDate])
            ->groupBy('year', 'month')
            ->get()
            ->keyBy(fn($item) => $item->year . '-' . $item->month);

        // Buat array bulan yang akan ditampilkan (12 bulan dalam rentang startDate - endDate)
        $periods = [];
        $current = $startDate->copy();

        while ($current <= $endDate) {
            $periods[] = ['year' => $current->year, 'month' => $current->month, 'month_name' => $current->format('F')];
            $current->addMonth();
        }

        // Buat summary hasil akhir
        $summary = [];

        foreach ($periods as $period) {
            $key = $period['year'] . '-' . $period['month'];

            $income = $incomes->has($key) ? (float) $incomes[$key]->total_income : 0;
            $expense = $expenses->has($key) ? (float) $expenses[$key]->total_expense : 0;
            $balance = $income - $expense;

            $summary[] = [
                'year' => $period['year'],
                'month' => $period['month_name'],
                'income' => $income,
                'expense' => $expense,
                'balance' => $balance,
            ];
        }

        return response()->json([
            'year' => $year ?? null,
            'data' => $summary,
        ]);

    }

    public function detailByMonth(Request $request)
    {
        $year = (int) $request->input('year', now()->year);
        $month = (int) $request->input('month', now()->month);

        if (!is_numeric($year) || !is_numeric($month)) {
            return response()->json(['error' => 'Year and month parameters must be numeric'], 400);
        }


        // Ambil semua pembayaran (pemasukan) yang lunas di bulan & tahun tertentu
        $incomes = Payment::whereYear('payment_date', (int) $year)
            ->whereMonth('payment_date', (int) $month)
            ->where('status', 'paid')
            ->with(['resident', 'category', 'house']) // opsional untuk tampilkan relasi
            ->get();

        // Ambil semua pengeluaran di bulan & tahun tertentu
        $expenses = Expense::whereYear('date', $year)
            ->whereMonth('date', $month)
            ->with('category')
            ->get();

        $incomeTotal = $incomes->sum('total_payment');
        $expenseTotal = $expenses->sum('total');

        return response()->json([
            'month' => Carbon::create()->month($month)->format('F'),
            'year' => (int) $year,
            'income_total' => (float) $incomeTotal,
            'expense_total' => (float) $expenseTotal,
            'balance' => (float) ($incomeTotal - $expenseTotal),
            'incomes' => $incomes,
            'expenses' => $expenses,
        ]);
    }

}
