import { useEffect, useState } from "react";
import { Edit, Trash2, X } from "lucide-react";
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

  const validateForm = () => {
    const title = formData.title.trim();
    const description = formData.description.trim();
    const image = formData.image.trim();
    const technologies = formData.technologies.trim();
    const github = formData.github.trim();
    const live = formData.live.trim();

    if (!title) {
      return "Project title is required";
    }

    if (title.length < 2) {
      return "Project title must be at least 2 characters";
    }

    if (title.length > 100) {
      return "Project title must be less than 100 characters";
    }

    if (!description) {
      return "Project description is required";
    }

    if (description.length < 10) {
      return "Project description must be at least 10 characters";
    }

    if (!image) {
      return "Project image URL is required";
    }

    if (!technologies) {
      return "Technologies are required";
    }

    if (!github) {
      return "GitHub URL is required";
    }

    if (!live) {
      return "Live project URL is required";
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

    setSubmitting(true);

    const projectData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
      technologies: formData.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      github: formData.github.trim(),
      live: formData.live.trim(),
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
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
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

      if (editingId === id) {
        resetForm();
      }

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

  const handleCancelEdit = () => {
    resetForm();
    setError("");
    setSuccess("");
  };

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Projects Management
          </h1>

          <p className="mt-2 text-slate-400">
            Add, edit and manage your portfolio projects
          </p>
        </div>

        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {editingId ? "Edit Project" : "Add Project"}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {editingId
                  ? "Update your project information"
                  : "Add a new project to your portfolio"}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
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
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none focus:ring-2 focus:ring-cyan-400"
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
                placeholder="Enter project description"
                rows="5"
                className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-slate-300">
                Technologies
              </label>

              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <p className="mt-2 text-xs text-slate-500">
                Separate technologies with commas
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                GitHub URL
              </label>

              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Live URL
              </label>

              <input
                type="url"
                name="live"
                value={formData.live}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? editingId
                    ? "Updating..."
                    : "Adding..."
                  : editingId
                  ? "Update Project"
                  : "Add Project"}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
              {success}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              All Projects
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Total projects: {projects.length}
            </p>
          </div>

          {loading ? (
            <div className="py-10 text-center text-cyan-400">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-700 py-10 text-center text-slate-400">
              No projects found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b border-slate-800 text-left">
                    <th className="px-4 py-4 text-sm font-medium text-slate-400">
                      Project
                    </th>

                    <th className="px-4 py-4 text-sm font-medium text-slate-400">
                      Description
                    </th>

                    <th className="px-4 py-4 text-sm font-medium text-slate-400">
                      Technologies
                    </th>

                    <th className="px-4 py-4 text-sm font-medium text-slate-400">
                      Links
                    </th>

                    <th className="px-4 py-4 text-right text-sm font-medium text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project._id}
                      className="border-b border-slate-800/70 transition hover:bg-slate-800/40"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-14 w-20 rounded-lg object-cover"
                          />

                          <p className="font-semibold text-white">
                            {project.title}
                          </p>
                        </div>
                      </td>

                      <td className="max-w-xs px-4 py-4">
                        <p className="line-clamp-3 text-sm text-slate-400">
                          {project.description}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex max-w-xs flex-wrap gap-2">
                          {Array.isArray(
                            project.technologies
                          ) &&
                            project.technologies.map(
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
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-2">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-cyan-400 hover:text-cyan-300"
                          >
                            GitHub
                          </a>

                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-green-400 hover:text-green-300"
                          >
                            Live
                          </a>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(project)
                            }
                            className="rounded-lg p-2 text-cyan-400 transition hover:bg-cyan-400/10"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(project._id)
                            }
                            disabled={
                              deletingId === project._id
                            }
                            className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminProjects;