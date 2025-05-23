import { createBrowserRouter } from "react-router";
import { redirect } from "react-router";

import App from "./App";
import LoginPage from "./page/auth/login-page";
import DashboardPage from "./page/user/dashboard/page";
import ResidentPage from "./page/user/resident/page";
import AuthenticatedLayout from "./page/user/authenticated-layout";
import GuestLayout from "./page/auth/guest-layout";
import HousePage from "./page/user/house/page";
import { ShowHistoricalHouse } from "./page/user/resident/show";
import { ShowHistoricalResident } from "./page/user/house/show";
import ExpensePage from "./page/user/expense/page";
import PaymentPage from "./page/user/payment/page";
import CategoryPage from "./page/user/category/page";

import { auth } from "./repository/auth";
import { residents } from "./repository/resident";
import { houses } from "./repository/house";
import { expense } from "./repository/expense";
import { payment } from "./repository/payment";
import { category } from "./repository/category";

export const routes = createBrowserRouter([
  { index: true, Component: App },
  {
    Component: GuestLayout,
    children: [
      {
        path: "login",
        Component: LoginPage,
        loader: async () => {
          if (localStorage.getItem("token")) {
            return redirect("/dashboard");
          }
        },
        action: async ({ request }) => {
          let formData = await request.formData();
          let res = await auth.login(formData);
          return res;
        },
      },
      {
        path: "logout",
        loader: async () => {
          let res = await auth.logout();
          return res;
        },
      },
    ],
  },
  {
    Component: AuthenticatedLayout,
    loader: async () => {
      if (!localStorage.getItem("token")) {
        return redirect("/login");
      }
    },
    children: [
      { path: "dashboard", Component: DashboardPage },
      {
        path: "resident",
        children: [
          {
            index: true,
            Component: ResidentPage,
            loader: async () => {
              return await residents.getAll();
            },
            action: async ({ request }) => {
              console.log(request);
              let formData = await request.formData();
              const res = await residents.create(formData);
              return res;
            },
          },
          {
            path: ":id/house",
            loader: async ({ params }) => {
              const res = await residents.getHouseById(params.id);
              return res;
            },
            Component: ShowHistoricalHouse,
          },
        ],
      },
      {
        path: "house",
        children: [
          {
            index: true,
            Component: HousePage,
            loader: async () => {
              return await houses.getAll();
            },
            action: async ({ request }) => {
              let formData = await request.formData();
              return await houses.create(formData);
            },
          },
          {
            path: ":id/resident",
            loader: async ({ params }) => {
              return await houses.getResidentById(params.id);
            },
            Component: ShowHistoricalResident,
          },
        ],
      },
      {
        path: "expense",
        children: [
          {
            index: true,
            Component: ExpensePage,
            loader: async () => {
              return await expense.getAll();
            },
            action: async ({ request }) => {
              let formData = await request.formData();
              return await expense.create(formData);
            },
          },
        ],
      },
      {
        path: "payment",
        children: [
          {
            index: true,
            Component: PaymentPage,
            loader: async () => {
              return await payment.getAll();
            },
            action: async ({ request }) => {
              let formData = await request.formData();
              return await payment.create(formData);
            },
          },
        ],
      },
      {
        path: "category",
        children: [
          {
            index: true,
            Component: CategoryPage,
            loader: async () => {
              return await category.getAll();
            },
            action: async ({ request }) => {
              let formData = await request.formData();
              return await category.create(formData);
            },
          },
        ],
      },
    ],
  },
]);
