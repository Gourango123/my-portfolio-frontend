import { useEffect, useState } from "react";
import {
  Plus,
  Save,
  Trash2,
  Edit,
  X,
} from "lucide-react";
import api from "../api/axios";

const defaultFeatures = [
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
];

const emptyFeature = {
  icon: "Code2",
  title: "",
  description: "",
};

const AdminAbout = () => {
  const [formData, setFormData] = useState({
    label: "",
    title: "",
    highlight: "",
    description: "",
    features: defaultFeatures,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [featureSaving, setFeatureSaving] =
    useState(false);

  const [editingFeatureId, setEditingFeatureId] =
    useState(null);

  const [featureForm, setFeatureForm] =
    useState(emptyFeature);

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
            about.features?.length > 0
              ? about.features
              : defaultFeatures,
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

  const handleFeatureFormChange = (e) => {
    const { name, value } = e.target;

    setFeatureForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAboutSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      let response;

      try {
        await api.get("/api/about");

        response = await api.put(
          "/api/about",
          formData
        );
      } catch (error) {
        if (error.response?.status !== 404) {
          throw error;
        }

        response = await api.post(
          "/api/about",
          formData
        );
      }

      setFormData(response.data.data);

      setSuccess(
        response.data.message ||
          "About section saved successfully"
      );
    } catch (error) {
      setError(
        error.response?.data?.errors?.join(", ") ||
          error.response?.data?.message ||
          "Failed to save about section"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleAddFeature = async () => {
    setError("");
    setSuccess("");

    if (formData.features.length >= 6) {
      setError("Maximum 6 features are allowed");
      return;
    }

    if (
      !featureForm.title.trim() ||
      !featureForm.description.trim()
    ) {
      setError(
        "Feature title and description are required"
      );
      return;
    }

    setFeatureSaving(true);

    try {
      const response = await api.post(
        "/api/about/features",
        featureForm
      );

      setFormData(response.data.data);

      setFeatureForm(emptyFeature);

      setSuccess(
        response.data.message ||
          "Feature added successfully"
      );
    } catch (error) {
      setError(
        error.response?.data?.errors?.join(", ") ||
          error.response?.data?.message ||
          "Failed to add feature"
      );
    } finally {
      setFeatureSaving(false);
    }
  };

  const handleEditFeature = (feature) => {
    setEditingFeatureId(feature._id);

    setFeatureForm({
      icon: feature.icon || "Code2",
      title: feature.title || "",
      description: feature.description || "",
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdateFeature = async () => {
    if (!editingFeatureId) {
      return;
    }

    if (
      !featureForm.title.trim() ||
      !featureForm.description.trim()
    ) {
      setError(
        "Feature title and description are required"
      );
      return;
    }

    setFeatureSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.put(
        `/api/about/features/${editingFeatureId}`,
        featureForm
      );

      setFormData(response.data.data);

      setEditingFeatureId(null);
      setFeatureForm(emptyFeature);

      setSuccess(
        response.data.message ||
          "Feature updated successfully"
      );
    } catch (error) {
      setError(
        error.response?.data?.errors?.join(", ") ||
          error.response?.data?.message ||
          "Failed to update feature"
      );
    } finally {
      setFeatureSaving(false);
    }
  };

  const handleDeleteFeature = async (featureId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feature?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await api.delete(
        `/api/about/features/${featureId}`
      );

      setFormData(response.data.data);

      if (editingFeatureId === featureId) {
        setEditingFeatureId(null);
        setFeatureForm(emptyFeature);
      }

      setSuccess(
        response.data.message ||
          "Feature deleted successfully"
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete feature"
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingFeatureId(null);
    setFeatureForm(emptyFeature);
    setError("");
    setSuccess("");
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
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Portfolio Content
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            About Section
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your portfolio About section and feature
            cards.
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
          onSubmit={handleAboutSubmit}
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
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  Feature Cards
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {formData.features.length}/6 features
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {formData.features.map(
                (feature, index) => (
                  <div
                    key={feature._id || index}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="font-semibold text-cyan-400">
                        Feature {index + 1}
                      </h3>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleEditFeature(feature)
                          }
                          className="rounded-lg p-2 text-cyan-400 transition hover:bg-cyan-400/10"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteFeature(
                              feature._id
                            )
                          }
                          className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-5">
                      <div>
                        <p className="mb-2 text-sm font-medium text-slate-400">
                          Icon
                        </p>

                        <p className="text-white">
                          {feature.icon}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium text-slate-400">
                          Title
                        </p>

                        <p className="text-white">
                          {feature.title}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium text-slate-400">
                          Description
                        </p>

                        <p className="leading-7 text-slate-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {editingFeatureId
                  ? "Edit Feature"
                  : "Add New Feature"}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {editingFeatureId
                  ? "Update an existing feature card."
                  : "Add a new feature card to your About section."}
              </p>
            </div>

            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Icon
                </label>

                <select
                  name="icon"
                  value={featureForm.icon}
                  onChange={handleFeatureFormChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
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

                  <option value="ShieldCheck">
                    ShieldCheck
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={featureForm.title}
                  onChange={handleFeatureFormChange}
                  placeholder="API & Authentication"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  name="description"
                  value={featureForm.description}
                  onChange={handleFeatureFormChange}
                  rows={4}
                  placeholder="Building secure REST APIs with JWT authentication..."
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {editingFeatureId ? (
                  <>
                    <button
                      type="button"
                      onClick={handleUpdateFeature}
                      disabled={featureSaving}
                      className="flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Save size={20} />

                      {featureSaving
                        ? "Updating..."
                        : "Update Feature"}
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
                    >
                      <X size={20} />

                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    disabled={
                      featureSaving ||
                      formData.features.length >= 6
                    }
                    className="flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={20} />

                    {featureSaving
                      ? "Adding..."
                      : "Add Feature"}
                  </button>
                )}
              </div>
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