import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../Storee/hooks";
import { logout } from "../Storee/slices/authSlice";
import Api from "../service/Api";

const SellerSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user) as {
    name?: string;
    email?: string;
  } | null;

  const navItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      name: "My Listings",
      path: "/mylistings",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      name: "Add a listing",
      path: "/listings/add",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
  ];

  const handleLogout = async () => {
    try {
      await Api.post("/auth/logout");
    } catch (error) {
      console.log("Logout API call failed", error);
    } finally {
      localStorage.removeItem("accessToken");
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[#FCFAF6] px-4 py-6 shadow-xs">
      {/* Brand / Logo */}
      <div className="mb-8 flex items-center justify-between px-3">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-85"
        >
          <span className="h-3.5 w-3.5 rounded-full bg-[var(--terracotta)]" />
          <span className="text-xl font-bold tracking-[0.2em] text-[#29463C]">
            MORROW
          </span>
        </NavLink>
      </div>

      {/* Navigation Group */}
      <div className="flex-1">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
          Your Space
        </p>

        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#E6EDE5] text-[#29463C] shadow-xs"
                    : "text-[var(--text)] hover:bg-[#F0ECE5] hover:text-[#29463C]"
                }`
              }
            >
              <span className="flex h-5 w-5 items-center justify-center text-current">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Back to store */}
        <div className="mt-8 border-t border-[var(--border)] pt-4">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
            Storefront
          </p>
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[#F0ECE5] hover:text-[#29463C]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>View Marketplace</span>
          </NavLink>
        </div>
      </div>

      {/* Account Section */}
      <div className="mt-auto border-t border-[var(--border)] pt-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
          Account
        </p>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-[var(--text)] transition-colors hover:bg-[#F0ECE5] hover:text-[var(--danger)]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>

        {/* User Card */}
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#F0ECE5] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCCFB7] text-sm font-bold text-[#29463C]">
            {user?.name?.charAt(0).toUpperCase() || "S"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#29463C]">
              {user?.name || "Seller"}
            </p>
            <p className="text-[10px] text-[var(--muted)]">Seller Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SellerSidebar;