import { useEffect, useState } from "react";
import { FileText, Trash2, Upload, ExternalLink } from "lucide-react";
import api from "../api/axios";

const AdminResume = () => {
  const [resume, setResume] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchResume = async () => {
    try {
      const response = await api.get("/api/resume");

      setResume(response.data.data || null);
    } catch (error) {
      if (error.response?.status !== 404) {
        setError(
          error.response?.data?.message ||
            "Failed to fetch resume"
        );
      }

      setResume(null);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setError("");
    setSuccess("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("resume", file);

    try {
      const response = await api.post(
        "/api/resume",
        formData
      );

      setSuccess(
        response.data.message ||
          "Resume uploaded successfully"
      );

      setFile(null);

      e.target.reset();

      await fetchResume();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Resume upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the resume?"
    );

    if (!confirmDelete) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await api.delete("/api/resume");

      setSuccess(
        response.data.message ||
          "Resume deleted successfully"
      );

      setResume(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete resume"
      );
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-cyan-400">
          Loading resume...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Admin Panel
          </p>

          <h1 className="text-3xl font-bold text-white">
            Resume
          </h1>

          <p className="mt-2 text-slate-400">
            Upload and manage your portfolio resume.
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

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <Upload size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Upload Resume
              </h2>

              <p className="text-sm text-slate-400">
                Only PDF files are allowed.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleUpload}
            className="space-y-5"
          >
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="block w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:font-medium file:text-slate-950"
            />

            {file && (
              <p className="text-sm text-slate-400">
                Selected:{" "}
                <span className="text-cyan-400">
                  {file.name}
                </span>
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Upload size={18} />
              {loading
                ? "Uploading..."
                : "Upload Resume"}
            </button>
          </form>
        </div>

        {resume && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <FileText size={26} />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    {resume.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Uploaded{" "}
                    {new Date(
                      resume.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  <ExternalLink size={17} />
                  View
                </a>

                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                  <Trash2 size={17} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {!resume && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900 p-10 text-center">
            <FileText
              size={40}
              className="mx-auto mb-4 text-slate-600"
            />

            <p className="text-slate-400">
              No resume uploaded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResume;