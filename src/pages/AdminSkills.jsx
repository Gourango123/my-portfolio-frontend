import { useEffect, useState } from "react";
import { Edit, Trash2, X } from "lucide-react";
import api from "../api/axios";

const AdminSkills = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: "",
    icon: "",
  });

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchSkills = async () => {
    try {
      const response = await api.get("/api/skills");

      setSkills(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch skills"
      );
    } finally {
      setFetchLoading(false);
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

    setEditId(null);
  };

  const validateForm = () => {
    const name = formData.name.trim();
    const category = formData.category.trim();
    const level = Number(formData.level);
    const icon = formData.icon.trim();

    if (!name) {
      return "Please select a skill";
    }

    if (!category) {
      return "Please select a category";
    }

    if (formData.level === "") {
      return "Please select a skill level";
    }

    if (!Number.isInteger(level)) {
      return "Skill level must be a whole number";
    }

    if (level < 0 || level > 100) {
      return "Skill level must be between 0 and 100";
    }

    if (!icon) {
      return "Please select an icon";
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

    const skillData = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      level: Number(formData.level),
      icon: formData.icon.trim(),
    };

    try {
      if (editId) {
        const response = await api.put(
          `/api/skills/${editId}`,
          skillData
        );

        setSuccess(
          response.data.message ||
            "Skill updated successfully"
        );
      } else {
        const response = await api.post(
          "/api/skills",
          skillData
        );

        setSuccess(
          response.data.message ||
            "Skill created successfully"
        );
      }

      resetForm();

      await fetchSkills();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setEditId(skill._id);

    setFormData({
      name: skill.name || "",
      category: skill.category || "",
      level:
        skill.level !== undefined && skill.level !== null
          ? String(skill.level)
          : "",
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await api.delete(
        `/api/skills/${id}`
      );

      setSuccess(
        response.data.message ||
          "Skill deleted successfully"
      );

      if (editId === id) {
        resetForm();
      }

      await fetchSkills();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete skill"
      );
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    setError("");
    setSuccess("");
  };

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Skills Management
          </h1>

          <p className="mt-2 text-slate-400">
            Add, edit and manage your portfolio skills
          </p>
        </div>

        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {editId ? "Edit Skill" : "Add Skill"}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {editId
                  ? "Update your skill information"
                  : "Add a new skill to your portfolio"}
              </p>
            </div>

            {editId && (
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
                Skill
              </label>

              <select
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="">Select Skill</option>

                <option value="React">React</option>

                <option value="JavaScript">
                  JavaScript
                </option>

                <option value="HTML5">HTML5</option>

                <option value="CSS3">CSS3</option>

                <option value="Tailwind CSS">
                  Tailwind CSS
                </option>

                <option value="Node.js">
                  Node.js
                </option>

                <option value="Express.js">
                  Express.js
                </option>

                <option value="MongoDB">
                  MongoDB
                </option>

                <option value="Git">Git</option>

                <option value="GitHub">GitHub</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="">Select Category</option>

                <option value="Frontend">
                  Frontend
                </option>

                <option value="Backend">
                  Backend
                </option>

                <option value="Database">
                  Database
                </option>

                <option value="Tools">
                  Tools
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Level
              </label>

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="">Select Level</option>

                <option value="50">50%</option>
                <option value="60">60%</option>
                <option value="70">70%</option>
                <option value="75">75%</option>
                <option value="80">80%</option>
                <option value="85">85%</option>
                <option value="90">90%</option>
                <option value="95">95%</option>
                <option value="100">100%</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Icon
              </label>

              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="">Select Icon</option>

                <option value="React">
                  React
                </option>

                <option value="Node">
                  Node.js
                </option>

                <option value="Express">
                  Express.js
                </option>

                <option value="MongoDB">
                  MongoDB
                </option>

                <option value="JavaScript">
                  JavaScript
                </option>

                <option value="HTML">
                  HTML5
                </option>

                <option value="CSS">
                  CSS3
                </option>

                <option value="Tailwind">
                  Tailwind CSS
                </option>

                <option value="Git">
                  Git
                </option>

                <option value="GitHub">
                  GitHub
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? editId
                    ? "Updating..."
                    : "Adding..."
                  : editId
                  ? "Update Skill"
                  : "Add Skill"}
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
              All Skills
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Total skills: {skills.length}
            </p>
          </div>

          {fetchLoading ? (
            <div className="py-10 text-center text-cyan-400">
              Loading skills...
            </div>
          ) : skills.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-700 py-10 text-center text-slate-400">
              No skills found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-800 text-left">
                    <th className="px-4 py-4 text-sm font-medium text-slate-400">
                      Skill
                    </th>

                    <th className="px-4 py-4 text-sm font-medium text-slate-400">
                      Category
                    </th>

                    <th className="px-4 py-4 text-sm font-medium text-slate-400">
                      Level
                    </th>

                    <th className="px-4 py-4 text-sm font-medium text-slate-400">
                      Icon
                    </th>

                    <th className="px-4 py-4 text-right text-sm font-medium text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {skills.map((skill) => (
                    <tr
                      key={skill._id}
                      className="border-b border-slate-800/70 transition hover:bg-slate-800/40"
                    >
                      <td className="px-4 py-4 font-medium text-white">
                        {skill.name}
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {skill.category}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-700">
                            <div
                              className="h-full rounded-full bg-cyan-400"
                              style={{
                                width: `${skill.level}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm text-cyan-400">
                            {skill.level}%
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {skill.icon || "N/A"}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(skill)
                            }
                            className="rounded-lg p-2 text-cyan-400 transition hover:bg-cyan-400/10"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(skill._id)
                            }
                            className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10"
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

export default AdminSkills;