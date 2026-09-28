import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../Storee/hooks";
import { logout } from "../Storee/slices/authSlice";
import Api from "../service/Api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth) as {
    isAuthenticated: boolean;
    user: { name?: string; email?: string } | null;
  };

  const handleLogout = async () => {
    try {
      await Api.post("/auth/logout");
    } catch (error) {
      console.log("Logout failed", error);
    } finally {
      localStorage.removeItem("accessToken");
      dispatch(logout());
      navigate("/login");
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-[var(--dark)] font-semibold"
        : "text-[var(--text)] hover:text-[var(--terracotta)]"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-[0.2em] text-[var(--dark)] transition-opacity hover:opacity-85"
          >
            <span className="h-3.5 w-3.5 rounded-full bg-[var(--terracotta)]" />
            <span>MORROW</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <NavLink to="/" end className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Home
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[var(--terracotta)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink to="/listings" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Listings
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[var(--terracotta)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink to="/category" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Categories
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[var(--terracotta)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </nav>
        </div>

        {/* Desktop Auth & Actions */}
        <div className="hidden items-center gap-6 md:flex">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className="text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--terracotta)]"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/listings/add"
                className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-medium text-white shadow-xs transition-all hover:bg-[var(--dark)] hover:shadow-sm"
              >
                + Sell Item
              </NavLink>

              <div className="flex items-center gap-3 pl-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCCFB7] text-xs font-semibold text-[#29463C]">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--danger)]"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--terracotta)]"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--terracotta)]"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg text-[var(--dark)] hover:bg-[var(--background)] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span
            className={`h-0.5 w-5 bg-current transition-all duration-200 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-current transition-all duration-200 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-current transition-all duration-200 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--card)] px-4 py-5 shadow-lg md:hidden">
          <nav className="flex flex-col gap-3">
            <NavLink
              to="/"
              end
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--background)] hover:text-[var(--terracotta)]"
            >
              Home
            </NavLink>

            <NavLink
              to="/listings"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--background)] hover:text-[var(--terracotta)]"
            >
              Listings
            </NavLink>

            <NavLink
              to="/category"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--background)] hover:text-[var(--terracotta)]"
            >
              Categories
            </NavLink>

            <div className="mt-2 border-t border-[var(--border)] pt-4 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--background)]"
                  >
                    Seller Dashboard
                  </NavLink>
                  <NavLink
                    to="/listings/add"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg bg-[var(--primary)] px-4 py-2.5 text-center text-sm font-medium text-white"
                  >
                    + Sell Item
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--danger)] hover:bg-[var(--background)]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--background)] hover:text-[var(--terracotta)]"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--background)] hover:text-[var(--terracotta)]"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
