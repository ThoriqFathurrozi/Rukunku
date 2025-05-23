import React, { useEffect, useState } from "react";
import apiClient from "../../../../lib/axios";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { formatCurrency } from "../../../../lib/utils";

const MonthlyDetailReport = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchData = (year = null, month = null) => {
    setLoading(true);

    const params = new URLSearchParams();
    if (year) params.append("year", year);
    if (month) params.append("month", month);

    apiClient(`/api/dashboard/detail-by-month?${params.toString()}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch current month data on mount
    fetchData();
  }, []);

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    if (isNaN(date)) return;
    setSelectedDate(date);
  };

  const handleFilterClick = () => {
    if (!selectedDate) return;
    fetchData(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <div className="mt-4 mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">
          Detail Bulan {data.month} {data.year}
        </h2>
        <div className="action flex gap-1">
          <Input name="month" type="date" onChange={handleDateChange} />
          <Button onClick={handleFilterClick}>Filter</Button>
        </div>
      </div>

      {/* Pemasukan */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Pemasukan: {formatCurrency(data.income_total)}
        </h3>
        {data.incomes.length === 0 ? (
          <p className="italic text-gray-500">Tidak ada pemasukan bulan ini.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-4">
            {data.incomes.map((income) => (
              <li key={income.payment_id} className="border p-3 rounded">
                <strong>{income.description}</strong> —{" "}
                {formatCurrency(income.total_payment)} <br />
                <small className="text-gray-600">
                  Tanggal: {new Date(income.payment_date).toLocaleDateString()}
                </small>
                <br />
                <small className="italic text-gray-700">
                  Kategori: {income.category?.name ?? "-"}
                </small>
                <br />
                <small className="italic text-gray-700">
                  Resident: {income.resident?.full_name ?? "-"} | House:{" "}
                  {income.house?.number ?? "-"}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pengeluaran */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Pengeluaran: {formatCurrency(data.expense_total)}
        </h3>
        {data.expenses.length === 0 ? (
          <p className="italic text-gray-500">
            Tidak ada pengeluaran bulan ini.
          </p>
        ) : (
          <ul className="list-disc pl-5 space-y-4">
            {data.expenses.map((expense) => (
              <li key={expense.expense_id} className="border p-3 rounded">
                <strong>{expense.description}</strong> —{" "}
                {formatCurrency(expense.total)} <br />
                <small className="text-gray-600">
                  Tanggal: {new Date(expense.date).toLocaleDateString()}
                </small>
                <br />
                <small className="italic text-gray-700">
                  Kategori: {expense.category?.name ?? "-"}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Saldo */}
      <div className="text-lg font-bold border-t pt-4">
        Saldo Bulan Ini: {formatCurrency(data.balance)}
      </div>
    </div>
  );
};

export default MonthlyDetailReport;
