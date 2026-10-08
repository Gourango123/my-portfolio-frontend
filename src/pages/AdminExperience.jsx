import { useEffect, useState } from "react";
import { Edit, Trash2, X } from "lucide-react";
import api from "../api/axios";

const AdminExperience = () => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    technologies: "",
  });

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchExperiences = async () => {
    try {
      const response = await api.get("/api/experiences");

      setExperiences(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch experiences"
      );
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
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
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: "",
    });

    setEditId(null);
  };

  const validateForm = () => {
    if (!formData.company.trim()) {
      return "Company is required";
    }

    if (!formData.position.trim()) {
      return "Position is required";
    }

    if (!formData.location.trim()) {
      return "Location is required";
    }

    if (!formData.startDate.trim()) {
      return "Start date is required";
    }

    if (!formData.description.trim()) {
      return "Description is required";
    }

    if (!formData.technologies.trim()) {
      return "Technologies are required";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const experienceData = {
      company: formData.company.trim(),
      position: formData.position.trim(),
      location: formData.location.trim(),
      startDate: formData.startDate.trim(),
      endDate: formData.endDate.trim() || "Present",
      description: formData.description.trim(),
      technologies: formData.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (editId) {
        const response = await api.put(
          `/api/experiences/${editId}`,
          experienceData
        );

        setSuccess(
          response.data.message ||
            "Experience updated successfully"
        );
      } else {
        const response = await api.post(
          "/api/experiences",
          experienceData
        );

        setSuccess(
          response.data.message ||
            "Experience created successfully"
        );
      }

      resetForm();

      await fetchExperiences();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (experience) => {
    setEditId(experience._id);

    setFormData({
      company: experience.company || "",
      position: experience.position || "",
      location: experience.location || "",
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      description: experience.description || "",
      technologies: Array.isArray(experience.technologies)
        ? experience.technologies.join(", ")
        : "",
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmDelete) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await api.delete(
        `/api/experiences/${id}`
      );

      setSuccess(
        response.data.message ||
          "Experience deleted successfully"
      );

      if (editId === id) {
        resetForm();
      }

      await fetchExperiences();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete experience"
      );
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">
            Experience Management
          </h1>

          <p className="mt-2 text-slate-400">
            Add and manage your professional experiences.
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

        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {editId ? "Edit Experience" : "Add Experience"}
            </h2>

            {editId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={18} />
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Position
                </label>

                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="MERN Stack Developer"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Dhaka, Bangladesh"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Start Date
                </label>

                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  placeholder="Jan 2025"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  End Date
                </label>

                <input
                  type="text"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  placeholder="Present"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Technologies
                </label>

                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-slate-300">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your responsibilities and achievements..."
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editId
                ? "Update Experience"
                : "Add Experience"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-6 text-xl font-semibold">
            Experience List
          </h2>

          {fetchLoading ? (
            <div className="py-10 text-center text-cyan-400">
              Loading experiences...
            </div>
          ) : experiences.length === 0 ? (
            <div className="py-10 text-center text-slate-400">
              No experience found.
            </div>
          ) : (
            <div className="space-y-5">
              {experiences.map((experience) => (
                <div
                  key={experience._id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {experience.position}
                      </h3>

                      <p className="mt-1 text-cyan-400">
                        {experience.company}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {experience.location}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {experience.startDate} -{" "}
                        {experience.endDate || "Present"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(experience)}
                        className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-300"
                      >
                        <Edit size={17} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(experience._id)
                        }
                        className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 font-medium text-red-400 transition hover:bg-red-500/20"
                      >
                        <Trash2 size={17} />
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 leading-7 text-slate-300">
                    {experience.description}
                  </p>

                  {Array.isArray(experience.technologies) &&
                    experience.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {experience.technologies.map(
                          (technology, index) => (
                            <span
                              key={`${technology}-${index}`}
                              className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-400"
                            >
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminExperience;