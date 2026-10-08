import { useEffect, useState } from "react";
import { Mail, Trash2, X } from "lucide-react";
import api from "../api/axios";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await api.get("/api/messages");

      setMessages(response.data.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch messages"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await api.delete(
        `/api/messages/${id}`
      );

      setSuccess(
        response.data.message ||
          "Message deleted successfully"
      );

      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }

      await fetchMessages();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete message"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-cyan-400">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Admin Panel
          </p>

          <h1 className="text-3xl font-bold text-white">
            Messages
          </h1>

          <p className="mt-2 text-slate-400">
            Manage messages received from your portfolio.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-400">
            {success}
          </div>
        )}

        {messages.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <Mail
              size={40}
              className="mx-auto mb-4 text-slate-600"
            />

            <p className="text-slate-400">
              No messages found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-400/40"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-white">
                      {message.subject}
                    </h2>

                    <p className="mt-1 text-cyan-400">
                      {message.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {message.email}
                    </p>

                    <p className="mt-3 line-clamp-2 text-sm text-slate-300">
                      {message.message}
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      {new Date(
                        message.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-start gap-2">
                    <button
                      onClick={() =>
                        setSelectedMessage(message)
                      }
                      className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(message._id)
                      }
                      className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  Message Details
                </h2>

                <button
                  onClick={() => setSelectedMessage(null)}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Name
                  </p>

                  <p className="mt-1 text-white">
                    {selectedMessage.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Email
                  </p>

                  <p className="mt-1 text-white">
                    {selectedMessage.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Subject
                  </p>

                  <p className="mt-1 text-white">
                    {selectedMessage.subject}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Message
                  </p>

                  <p className="mt-1 whitespace-pre-wrap leading-7 text-slate-300">
                    {selectedMessage.message}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Received
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {new Date(
                      selectedMessage.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;