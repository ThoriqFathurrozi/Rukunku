import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import apiClient from "../../../../../lib/axios";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const BarChart = () => {
  const chartRef = useRef(null); // 1. Create ref

  const currentYear = new Date().getFullYear();

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ year: "", data: [] });
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const fetchData = (year) => {
    setLoading(true);
    let apiEndpoint = `/api/dashboard/monthly-summary`;

    if (year) {
      apiEndpoint += `?year=${year}`;
    }

    apiClient(apiEndpoint)
      .then((res) => {
        setSummary(res.data);
        setLoading(false);
        if (chartRef.current && year) {
          chartRef.current.scrollIntoView({ behavior: "smooth" });
        }
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterClick = () => {
    if (!selectedYear) return;
    fetchData(selectedYear);
  };

  const handleResetClick = () => {
    fetchData();
    setTimeout(() => {
      chartRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  const labels = summary.data.map((item) => item.month);
  const incomeData = summary.data.map((item) => item.income);
  const expenseData = summary.data.map((item) => item.expense);
  const balanceData = summary.data.map((item) => item.balance);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Pemasukan",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
      {
        label: "Pengeluaran",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
      {
        label: "Saldo",
        data: balanceData,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `Rp ${value.toLocaleString("id-ID")}`,
        },
      },
    },
  };

  return (
    <div
      className="max-w-full mx-auto p-4 m-4 bg-white rounded-md shadow-md"
      ref={chartRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Ringkasan Tahun {summary.year ?? "Terakhir"}
        </h2>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-32"
            min="2000"
            max={currentYear}
          />
          <Button onClick={handleFilterClick}>Filter</Button>
          <Button onClick={handleResetClick}>Reset</Button>
        </div>
      </div>

      {loading ? <p>Loading...</p> : <Bar data={chartData} options={options} />}
    </div>
  );
};

export default BarChart;
