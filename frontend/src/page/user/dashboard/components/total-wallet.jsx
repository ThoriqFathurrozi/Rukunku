import React, { useEffect, useState } from "react";
import apiClient from "../../../../lib/axios";

function TotalWallet() {
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    apiClient("/api/dashboard")
      .then((res) => {
        setSummary(res.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading total summary...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="mt-4 mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl mb-4">Total Summary</h2>
      <div className="flex gap-2">
        <div className="min-w-80 w-full bg-blue-100 px-4 py-4 rounded-2xl">
          <h3 className="text-2xl mb-4">Total Income</h3>
          <p className="text-3xl font-semibold">
            Rp {summary.total_income.toLocaleString()}
          </p>
        </div>
        <div className="min-w-80 w-full bg-red-100 px-4 py-4 rounded-2xl">
          <h3 className="text-2xl mb-4">Total Expense</h3>
          <p className="text-3xl font-semibold">
            - Rp {summary.total_expense.toLocaleString()}
          </p>
        </div>
        <div className="min-w-80 w-full bg-green-100 px-4 py-4 rounded-2xl">
          <h3 className="text-2xl mb-4 ">Balance</h3>
          <p className="text-3xl font-semibold">
            Rp {summary.balance.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TotalWallet;
