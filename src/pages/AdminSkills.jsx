import { useEffect, useState } from "react";
import { Edit, Plus, Trash2, X } from "lucide-react";
import api from "../api/axios";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: "",
    icon: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/skills");

      setSkills(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch skills"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      level: "",
      icon: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        await api.put(
          `/api/skills/${editingId}`,
          formData
        );

        setSuccess("Skill updated successfully");
      } else {
        await api.post("/api/skills", formData);

        setSuccess("Skill created successfully");
      }

      resetForm();
      await fetchSkills();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);

    setFormData({
      name: skill.name || "",
      category: skill.category || "",
      level: skill.level || "",
      icon: skill.icon || "",
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(`/api/skills/${id}`);

      setSuccess("Skill deleted successfully");

      await fetchSkills();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete skill"
      );
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Skills
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your portfolio skills
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {editingId ? "Edit Skill" : "Add Skill"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <X size={18} />
                Cancel
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Skill Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="React"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="Frontend"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Level
              </label>

              <input
                type="text"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                placeholder="Intermediate"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Icon
              </label>

              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="SiReact"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {editingId ? (
                  <Edit size={18} />
                ) : (
                  <Plus size={18} />
                )}

                {submitting
                  ? "Saving..."
                  : editingId
                  ? "Update Skill"
                  : "Add Skill"}
              </button>
            </div>
          </form>

          {error && (
            <p className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p className="mt-4 text-sm text-green-400">
              {success}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-6 text-xl font-semibold text-white">
            All Skills
          </h2>

          {loading ? (
            <div className="py-10 text-center text-cyan-400">
              Loading skills...
            </div>
          ) : skills.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              No skills found
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        {skill.icon && (
                          <span className="text-cyan-400">
                            {skill.icon}
                          </span>
                        )}

                        <h3 className="text-lg font-semibold text-white">
                          {skill.name}
                        </h3>
                      </div>

                      <p className="mt-2 text-sm text-slate-400">
                        {skill.category}
                      </p>

                      <p className="mt-1 text-sm text-cyan-400">
                        {skill.level}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(skill)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(skill._id)
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminSkills;