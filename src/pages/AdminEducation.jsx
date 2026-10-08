import { useEffect, useState } from "react";
import { Edit, Trash2, X } from "lucide-react";
import api from "../api/axios";

const AdminEducation = () => {
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    grade: "",
  });

  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchEducations = async () => {
    try {
      const response = await api.get("/api/educations");

      setEducations(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch educations"
      );
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
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
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      grade: "",
    });

    setEditId(null);
  };

  const validateForm = () => {
    if (!formData.institution.trim()) {
      return "Institution is required";
    }

    if (!formData.degree.trim()) {
      return "Degree is required";
    }

    if (!formData.field.trim()) {
      return "Field is required";
    }

    if (!formData.location.trim()) {
      return "Location is required";
    }

    if (!formData.startDate.trim()) {
      return "Start date is required";
    }

    if (!formData.endDate.trim()) {
      return "End date is required";
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

    const educationData = {
      institution: formData.institution.trim(),
      degree: formData.degree.trim(),
      field: formData.field.trim(),
      location: formData.location.trim(),
      startDate: formData.startDate.trim(),
      endDate: formData.endDate.trim(),
      description: formData.description.trim(),
      grade: formData.grade.trim(),
    };

    try {
      if (editId) {
        const response = await api.put(
          `/api/educations/${editId}`,
          educationData
        );

        setSuccess(
          response.data.message ||
            "Education updated successfully"
        );
      } else {
        const response = await api.post(
          "/api/educations",
          educationData
        );

        setSuccess(
          response.data.message ||
            "Education created successfully"
        );
      }

      resetForm();

      await fetchEducations();
    } catch (error) {
      console.error(
        "Education error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.errors?.join(", ") ||
          error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (education) => {
    setEditId(education._id);

    setFormData({
      institution: education.institution || "",
      degree: education.degree || "",
      field: education.field || "",
      location: education.location || "",
      startDate: education.startDate || "",
      endDate: education.endDate || "",
      description: education.description || "",
      grade: education.grade || "",
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
      "Are you sure you want to delete this education?"
    );

    if (!confirmDelete) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await api.delete(
        `/api/educations/${id}`
      );

      setSuccess(
        response.data.message ||
          "Education deleted successfully"
      );

      if (editId === id) {
        resetForm();
      }

      await fetchEducations();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete education"
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
            Education Management
          </h1>

          <p className="mt-2 text-slate-400">
            Add and manage your educational background.
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
              {editId ? "Edit Education" : "Add Education"}
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
                  Institution
                </label>

                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Thakurgaon Polytechnic Institute"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Degree
                </label>

                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="Diploma in Engineering"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Field
                </label>

                <input
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  placeholder="Computer Technology"
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
                  placeholder="Thakurgaon, Bangladesh"
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
                  placeholder="2022"
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
                  placeholder="2026"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Grade
                </label>

                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="CGPA 3.80"
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
                  placeholder="Describe your education..."
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
                ? "Update Education"
                : "Add Education"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-6 text-xl font-semibold">
            Education List
          </h2>

          {fetchLoading ? (
            <div className="py-10 text-center text-cyan-400">
              Loading educations...
            </div>
          ) : educations.length === 0 ? (
            <div className="py-10 text-center text-slate-400">
              No education found.
            </div>
          ) : (
            <div className="space-y-5">
              {educations.map((education) => (
                <div
                  key={education._id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {education.degree}
                      </h3>

                      <p className="mt-1 text-cyan-400">
                        {education.institution}
                      </p>

                      <p className="mt-1 text-slate-300">
                        {education.field}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {education.location}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {education.startDate} -{" "}
                        {education.endDate}
                      </p>

                      {education.grade && (
                        <p className="mt-2 text-sm text-cyan-400">
                          {education.grade}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(education)}
                        className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-300"
                      >
                        <Edit size={17} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(education._id)
                        }
                        className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 font-medium text-red-400 transition hover:bg-red-500/20"
                      >
                        <Trash2 size={17} />
                        Delete
                      </button>
                    </div>
                  </div>

                  {education.description && (
                    <p className="mt-4 leading-7 text-slate-300">
                      {education.description}
                    </p>
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

export default AdminEducation;