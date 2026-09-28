
import { useState } from "react";
import { useNavigate } from "react-router";
import Api from "../service/Api";
import {
  setUser,
  setAccessToken,
} from "../Storee/slices/authSlice.tsx";
import { useAppDispatch } from "../Storee/hooks.tsx";

const Loginpage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      setLoading(true);
      setError("");

      const response = await Api.post("/auth/login", formData);

      console.log("LOGIN RESPONSE:", response.data);

      const { user, accessToken } = response.data.data;

      console.log("NEW ACCESS TOKEN:", accessToken);

      dispatch(setUser(user));
      dispatch(setAccessToken(accessToken));

      localStorage.setItem("accessToken", accessToken);

      console.log(
        "SAVED TOKEN:",
        localStorage.getItem("accessToken")
      );

      navigate("/dashboard");
    } catch (error: any) {
      console.log("LOGIN ERROR:", error);

      setError(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-black/40 px-4 py-6 sm:px-6">

      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl sm:p-8">

        {/* Close Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Close login"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--dark)]"
        >
          ×
        </button>

        {/* Heading */}
        <div className="mb-7 pr-8 sm:mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            MORROW
          </p>

          <h1 className="mt-2 text-2xl font-medium text-[var(--dark)] sm:text-3xl">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Login to your account and continue exploring.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[var(--text)]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[var(--text)]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[var(--dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm leading-6 text-[var(--muted)]">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-medium text-[var(--primary)] transition-colors hover:text-[var(--dark)] hover:underline"
          >
            Create Account
          </button>
        </p>

      </div>
    </div>
  );
};

export default Loginpage;
