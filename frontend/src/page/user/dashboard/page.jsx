import React from "react";
import BarChart from "./components/monthly-summary/barChart";
import LineChart from "./components/monthly-summary/lineChart";
import MonthlyDetailReport from "./components/monthly-report";
import TotalWallet from "./components/total-wallet";

export default function DashboardPage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Selamat datang di dashboard Anda!</p>
      </div>
      <div>
        <TotalWallet />
      </div>
      <MonthlyDetailReport />
      <div className="w-full mt-4">
        <BarChart />
        <LineChart />
      </div>
    </div>
  );
}
