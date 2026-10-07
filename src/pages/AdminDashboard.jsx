import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get(
          "/api/admin/dashboard-stats"
        );

        setStats(response.data.data);
      } catch (error) {
        console.error(
          "Failed to load dashboard stats:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Welcome, {user?.name || user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-red-500/30 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/10"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <div className="mt-12 text-center text-cyan-400">
            Loading dashboard...
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Projects
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                {stats?.projects || 0}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Skills
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                {stats?.skills || 0}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Experiences
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                {stats?.experiences || 0}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Messages
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                {stats?.messages || 0}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;