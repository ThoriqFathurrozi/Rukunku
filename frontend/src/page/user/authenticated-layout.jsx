import { Outlet, useNavigation } from "react-router";
import UserNav from "./user-nav";
import LoadingSpinner from "../../components/ui/loading";

export default function AuthenticatedLayout() {
  const navigation = useNavigation();
  return (
    <main>
      <UserNav />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {navigation.state === "loading" && <LoadingSpinner />}
        <Outlet />
      </section>
    </main>
  );
}
