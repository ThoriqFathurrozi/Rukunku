import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import apiClient from "../../../../../lib/axios";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const LineChart = () => {
  const lineChart = useRef(null); // 1. Create ref
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

        if (lineChart.current && year) {
          setTimeout(() => {
            lineChart.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 300);
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
      lineChart.current?.scrollIntoView({
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
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Pengeluaran",
        data: expenseData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Saldo",
        data: balanceData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "nearest",
      intersect: false,
    },
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
      className="max-w-full mx-auto p-4 m-4 bg-white rounded-md shadow-md "
      ref={lineChart}
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default LineChart;
