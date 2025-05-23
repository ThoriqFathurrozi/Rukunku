import React from "react";
import { Button } from "../../components/ui/button";
import { NavLink, useNavigate } from "react-router";

export default function UserNav() {
  let navigate = useNavigate();
  const nav = [
    {
      title: "Dashboard",
      route: "/dashboard",
    },
    {
      title: "Resident",
      route: "/resident",
    },
    {
      title: "House",
      route: "/house",
    },
    {
      title: "Expense",
      route: "/expense",
    },
    {
      title: "Payment",
      route: "/payment",
    },
    {
      title: "Category",
      route: "/category",
    },
  ];

  return (
    <nav className="bg-gray-200">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-gray-800">Rukunku</div>
          <div className="flex space-x-6">
            {nav.map((item) => (
              <NavLink to={item.route}>{item.title}</NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                navigate("/logout");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </section>
    </nav>
  );
}
