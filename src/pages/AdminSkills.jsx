import { useState } from "react";
import api from "../api/axios";

const AdminSkills = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: "",
    icon: "",
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

    try {
      const data = {
        name: formData.name,
        category: formData.category,
        level: Number(formData.level),
        icon: formData.icon,
      };

      const response = await api.post(
        "/api/skills",
        data
      );

      setSuccess(
        response.data.message ||
          "Skill created successfully"
      );

      setFormData({
        name: "",
        category: "",
        level: "",
        icon: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create skill"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-2xl">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h1 className="mb-2 text-2xl font-bold text-white">
            Add Skill
          </h1>

          <p className="mb-8 text-slate-400">
            Add a new skill to your portfolio
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Skill
              </label>

              <select
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-white px-4 py-3 text-black"
              >
                <option value="">
                  Select Skill
                </option>

                <option value="React">
                  React
                </option>

                <option value="JavaScript">
                  JavaScript
                </option>

                <option value="HTML5">
                  HTML5
                </option>

                <option value="CSS3">
                  CSS3
                </option>

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

                <option value="Git">
                  Git
                </option>

                <option value="GitHub">
                  GitHub
                </option>
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
                required
                className="w-full rounded-xl bg-white px-4 py-3 text-black"
              >
                <option value="">
                  Select Category
                </option>

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
                required
                className="w-full rounded-xl bg-white px-4 py-3 text-black"
              >
                <option value="">
                  Select Level
                </option>

                <option value="50">
                  50%
                </option>

                <option value="60">
                  60%
                </option>

                <option value="70">
                  70%
                </option>

                <option value="75">
                  75%
                </option>

                <option value="80">
                  80%
                </option>

                <option value="85">
                  85%
                </option>

                <option value="90">
                  90%
                </option>

                <option value="95">
                  95%
                </option>

                <option value="100">
                  100%
                </option>
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
                required
                className="w-full rounded-xl bg-white px-4 py-3 text-black"
              >
                <option value="">
                  Select Icon
                </option>

                <option value="SiReact">
                  React
                </option>

                <option value="SiNodedotjs">
                  Node.js
                </option>

                <option value="SiExpress">
                  Express.js
                </option>

                <option value="SiMongodb">
                  MongoDB
                </option>

                <option value="SiJavascript">
                  JavaScript
                </option>

                <option value="SiHtml5">
                  HTML5
                </option>

                <option value="SiCss3">
                  CSS3
                </option>

                <option value="SiTailwindcss">
                  Tailwind CSS
                </option>

                <option value="SiGit">
                  Git
                </option>

                <option value="SiGithub">
                  GitHub
                </option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Adding..."
                : "Add Skill"}
            </button>

          </form>

          {error && (
            <p className="mt-5 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p className="mt-5 rounded-lg bg-green-500/10 p-3 text-sm text-green-400">
              {success}
            </p>
          )}

        </div>

      </div>
    </section>
  );
};

export default AdminSkills;