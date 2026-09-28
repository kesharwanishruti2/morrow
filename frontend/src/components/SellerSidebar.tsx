import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../Storee/hooks";
import { logout } from "../Storee/slices/authSlice";
import Api from "../service/Api";

const SellerSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user) as {
    name?: string;
  } | null;

  const navItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: "▣",
    },
    {
      name: "My Listings",
      path: "/mylistings",
      icon: "▤",
    },
    {
      name: "Add a listing",
      path: "/listings/add",
      icon: "+",
    },
  ];

  const handleLogout = async () => {
    try {
      await Api.post("/auth/logout");

      dispatch(logout());

      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-[var(--border)] bg-[#FCFAF6] px-4 py-7">

      {/* Logo */}
      <div className="mb-12 flex items-center gap-3 px-4">
        <span className="h-4 w-4 rounded-full bg-[var(--terracotta)]" />

        <span className="font-serif text-3xl font-semibold tracking-tight text-[#29463C]">
          morrow
        </span>
      </div>

      {/* YOUR SPACE */}
      <div>
        <p className="mb-4 px-3 text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
          Your Space
        </p>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  isActive
                    ? "bg-[#E6EDE5] font-medium text-[#29463C]"
                    : "text-[var(--text)] hover:bg-[#F0ECE5]"
                }`
              }
            >
              <span className="w-5 text-center text-sm">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ACCOUNT */}
      <div className="mt-auto">

        <p className="mb-4 px-3 text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
          Account
        </p>

        {/* Logout */}
        <button
          onClick={()=>handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[var(--text)] transition hover:bg-[#F0ECE5]"
        >
          <span className="w-5 text-center">
            ↪
          </span>

          <span>Logout</span>
        </button>

        {/* USER CARD */}
        <div className="mt-4 rounded-xl bg-[#F0ECE5] p-3">
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCCFB7] text-sm font-medium text-[#29463C]">
              {user?.name?.charAt(0).toUpperCase() || "S"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-[#29463C]">
                {user?.name || "Seller"}
              </p>

              <p className="text-[10px] text-[var(--muted)]">
                Seller
              </p>
            </div>

          </div>
        </div>

      </div>
    </aside>
  );
};

export default SellerSidebar;