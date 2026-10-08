import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [adminExists, setAdminExists] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await api.get("/api/admin/check");

        setAdminExists(response.data.exists);
      } catch (error) {
        console.error(
          "Check admin error:",
          error.response?.data || error.message
        );

        setAdminExists(true);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/api/admin/login",
        formData
      );

      setAccessToken(response.data.accessToken);
      setUser(response.data.admin);

      navigate("/admin/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8"
      >
        <h1 className="text-3xl font-bold text-white">
          Admin Login
        </h1>

        <p className="mt-2 text-slate-400">
          Login to manage your portfolio
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {!checkingAdmin && !adminExists && (
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                No admin account exists yet.
              </p>

              <button
                type="button"
                onClick={() => navigate("/admin/register")}
                className="mt-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                Create Admin Account
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 w-full rounded-xl border border-slate-700 px-4 py-3 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
          >
            Back to Home
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;