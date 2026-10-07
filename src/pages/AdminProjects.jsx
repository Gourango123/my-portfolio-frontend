import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    github: "",
    live: "",
  });

  const fetchProjects = async () => {
    try {
      const response = await api.get("/api/projects");

      setProjects(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load projects"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
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
      title: "",
      description: "",
      image: "",
      technologies: "",
      github: "",
      live: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError("");
    setSuccess("");

    const projectData = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      technologies: formData.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      github: formData.github,
      live: formData.live,
    };

    try {
      if (editingId) {
        const response = await api.put(
          `/api/projects/${editingId}`,
          projectData
        );

        setSuccess(
          response.data.message ||
            "Project updated successfully"
        );
      } else {
        const response = await api.post(
          "/api/projects",
          projectData
        );

        setSuccess(
          response.data.message ||
            "Project created successfully"
        );
      }

      resetForm();
      await fetchProjects();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save project"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      image: project.image || "",
      technologies: project.technologies?.join(", ") || "",
      github: project.github || "",
      live: project.live || "",
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
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) {
      return;
    }

    setDeletingId(id);
    setError("");
    setSuccess("");

    try {
      const response = await api.delete(
        `/api/projects/${id}`
      );

      setSuccess(
        response.data.message ||
          "Project deleted successfully"
      );

      await fetchProjects();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete project"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Project Management
          </h1>

          <p className="mt-2 text-slate-400">
            Add and manage your portfolio projects
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-semibold text-white">
              {editingId ? "Edit Project" : "Add Project"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-5 md:grid-cols-2"
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Project title"
              required
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Project image URL"
              required
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project description"
              required
              rows="5"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400 md:col-span-2"
            />

            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              required
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="GitHub URL"
              required
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              type="url"
              name="live"
              value={formData.live}
              onChange={handleChange}
              placeholder="Live project URL"
              required
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? editingId
                    ? "Updating..."
                    : "Creating..."
                  : editingId
                    ? "Update Project"
                    : "Add Project"}
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

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white">
            Projects
          </h2>

          {loading ? (
            <p className="mt-6 text-cyan-400">
              Loading projects...
            </p>
          ) : projects.length === 0 ? (
            <p className="mt-6 text-slate-400">
              No projects found.
            </p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-white">
                      {project.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm text-slate-400">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies?.map(
                        (technology, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-400"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(project)}
                        className="flex-1 rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(project._id)
                        }
                        disabled={deletingId === project._id}
                        className="flex-1 rounded-xl border border-red-500/40 px-4 py-2 font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === project._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;