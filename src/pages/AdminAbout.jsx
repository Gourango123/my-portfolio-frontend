import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import api from "../api/axios";

const AdminAbout = () => {
  const [formData, setFormData] = useState({
    label: "",
    title: "",
    highlight: "",
    description: "",
    features: [
      {
        icon: "Code2",
        title: "",
        description: "",
      },
      {
        icon: "Server",
        title: "",
        description: "",
      },
      {
        icon: "Database",
        title: "",
        description: "",
      },
      {
        icon: "Rocket",
        title: "",
        description: "",
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get("/api/about");

        const about = response.data.data;

        setFormData({
          label: about.label || "",
          title: about.title || "",
          highlight: about.highlight || "",
          description: about.description || "",
          features:
            about.features?.length === 4
              ? about.features
              : formData.features,
        });
      } catch (error) {
        if (error.response?.status !== 404) {
          setError(
            error.response?.data?.message ||
              "Failed to load about section"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, featureIndex) =>
        featureIndex === index
          ? {
              ...feature,
              [field]: value,
            }
          : feature
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.put(
        "/api/about",
        formData
      );

      setFormData(response.data.data);

      setSuccess(
        response.data.message ||
          "About section updated successfully"
      );
    } catch (error) {
      setError(
        error.response?.data?.errors?.join(", ") ||
          error.response?.data?.message ||
          "Failed to update about section"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-cyan-400">
          Loading about section...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Portfolio Content
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            About Section
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your portfolio About section.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-400">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-6 text-xl font-semibold">
              About Content
            </h2>

            <div className="grid gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Label
                </label>

                <input
                  type="text"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                  placeholder="About Me"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Building Ideas Into"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Highlight
                </label>

                <input
                  type="text"
                  name="highlight"
                  value={formData.highlight}
                  onChange={handleChange}
                  placeholder="Web Applications"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your about description..."
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-6 text-xl font-semibold">
              Feature Cards
            </h2>

            <div className="space-y-6">
              {formData.features.map(
                (feature, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                  >
                    <h3 className="mb-5 font-semibold text-cyan-400">
                      Feature {index + 1}
                    </h3>

                    <div className="grid gap-5">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Icon
                        </label>

                        <select
                          value={feature.icon}
                          onChange={(e) =>
                            handleFeatureChange(
                              index,
                              "icon",
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                        >
                          <option value="Code2">
                            Code2
                          </option>

                          <option value="Server">
                            Server
                          </option>

                          <option value="Database">
                            Database
                          </option>

                          <option value="Rocket">
                            Rocket
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Title
                        </label>

                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) =>
                            handleFeatureChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Frontend Development"
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Description
                        </label>

                        <textarea
                          value={feature.description}
                          onChange={(e) =>
                            handleFeatureChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={3}
                          placeholder="Feature description..."
                          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={20} />

            {saving
              ? "Saving..."
              : "Save About Section"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAbout;