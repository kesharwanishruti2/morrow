import { useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

              </div>
            </div>

          </nav>

        </div>
      )}
    </header>
  );
};

export default Navbar;