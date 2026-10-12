import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../Storee/hooks";
import { logout } from "../Storee/slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-semibold tracking-[0.2em] text-[var(--dark)]"
        >
          MORROW
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          {/* HOME */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative py-2 text-sm transition-colors duration-300 ${
                isActive
                  ? "text-[var(--dark)]"
                  : "text-[var(--text)] hover:text-[var(--terracotta)]"
              }`
            }
          >
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

          {/* LISTINGS */}
          <NavLink
            to="/listings"
            className={({ isActive }) =>
              `relative py-2 text-sm transition-colors duration-300 ${
                isActive
                  ? "text-[var(--dark)]"
                  : "text-[var(--text)] hover:text-[var(--terracotta)]"
              }`
            }
          >
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

          {/* CATEGORIES */}
          <NavLink
            to="/category"
            className={({ isActive }) =>
              `relative py-2 text-sm transition-colors duration-300 ${
                isActive
                  ? "text-[var(--dark)]"
                  : "text-[var(--text)] hover:text-[var(--terracotta)]"
              }`
            }
          >
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

        {/* Desktop Auth */}
        <div className="hidden items-center gap-6 md:flex">
          {isAuthenticated ? (
            <>
              {user?.role === "seller" && (
                <NavLink
                  to="/dashboard"
                  className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--dark)]"
                >
                  Seller Portal
                </NavLink>
              )}

              <span className="text-sm font-medium text-[var(--dark)]">
                {user?.name}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="text-sm text-[var(--muted)] transition hover:text-[var(--dark)] cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm text-[var(--text)] transition hover:text-[var(--terracotta)]"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="text-sm text-[var(--text)] transition hover:text-[var(--terracotta)]"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className="h-0.5 w-6 bg-[var(--dark)]"></span>
          <span className="h-0.5 w-6 bg-[var(--dark)]"></span>
          <span className="h-0.5 w-6 bg-[var(--dark)]"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--card)] px-4 py-5 md:hidden">

          <nav className="flex flex-col gap-4">

            <NavLink
              to="/"
              end
              onClick={() => setIsOpen(false)}
              className="text-sm text-[var(--text)] hover:text-[var(--terracotta)]"
            >
              Home
            </NavLink>

            <NavLink
              to="/listings"
              onClick={() => setIsOpen(false)}
              className="text-sm text-[var(--text)] hover:text-[var(--terracotta)]"
            >
              Listings
            </NavLink>

            <NavLink
              to="/category"
              onClick={() => setIsOpen(false)}
              className="text-sm text-[var(--text)] hover:text-[var(--terracotta)]"
            >
              Categories
            </NavLink>

            <div className="border-t border-[var(--border)] pt-4">
              <div className="flex flex-col gap-4">
                {isAuthenticated ? (
                  <>
                    {user?.role === "seller" && (
                      <NavLink
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="text-sm font-semibold text-[var(--primary)]"
                      >
                        Seller Portal
                      </NavLink>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="text-left text-sm text-[var(--muted)] hover:text-[var(--dark)]"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-[var(--text)] hover:text-[var(--terracotta)]"
                    >
                      Login
                    </NavLink>

                    <NavLink
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-[var(--text)] hover:text-[var(--terracotta)]"
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </div>
            </div>

          </nav>

        </div>
      )}
    </header>
  );
};

export default Navbar;