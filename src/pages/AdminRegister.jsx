import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/api/admin/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(
        response.data.message || "Admin registered successfully"
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Admin registration failed"
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
          Create Admin
        </h1>

        <p className="mt-2 text-slate-400">
          Create your portfolio admin account
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="Gourango"
            />
          </div>

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

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="Confirm password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-green-400">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an admin account?
            </p>

            <button
              type="button"
              onClick={() => navigate("/admin/login")}
              className="mt-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              Login
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full rounded-xl border border-slate-700 px-4 py-3 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
          >
            Back to Home
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default AdminRegister;