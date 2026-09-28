import { useState } from "react";
import { useNavigate } from "react-router";
import Api from "../service/Api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await Api.post("/auth/register", formData);
      navigate("/login");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-black/40 px-4 py-6 sm:px-6">
      <div className="relative w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Close registration"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--dark)]"
        >
          ×
        </button>

        {/* Heading */}
        <div className="mb-7 pr-8 sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
            MORROW
          </p>

          <h1 className="mt-2 text-2xl font-bold text-[var(--dark)] sm:text-3xl">
            Create Account
          </h1>

          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Create your account to start buying and selling.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              Full name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="reg-email"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              Email address
            </label>

            <input
              id="reg-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="reg-password"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              Password
            </label>

            <input
              id="reg-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
            />
          </div>

          {/* confirmPassword */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              Confirm password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
            />
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-[var(--danger)]/20 bg-[var(--danger)]/5 px-4 py-3"
            >
              <p className="text-sm leading-5 text-[var(--danger)]">
                {error}
              </p>
            </div>
          )}

          {/* Sign Up / Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--dark)] hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Login redirect */}
        <p className="mt-6 text-center text-sm leading-6 text-[var(--muted)]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-[var(--primary)] transition-colors hover:text-[var(--dark)] hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;