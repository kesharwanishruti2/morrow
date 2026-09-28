import { Outlet } from "react-router";
import SellerSidebar from "../components/SellerSidebar";

const SellerLayout = () => {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">

      {/* Sidebar */}
      <SellerSidebar />

      {/* Dashboard */}
      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
};

export default SellerLayout;