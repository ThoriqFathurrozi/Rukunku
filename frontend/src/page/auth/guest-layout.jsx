import { Outlet } from "react-router";

export default function GuestLayout() {
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <Outlet />
    </main>
  );
}
