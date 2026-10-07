import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);
  };

  return (
    <section id="contact" className="bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 font-semibold uppercase tracking-widest text-cyan-400">
            Contact Me
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Let's Work
            <span className="text-cyan-400"> Together</span>
          </h2>

          <p className="mt-6 leading-8 text-slate-400">
            Have a project idea or want to work together? Feel free to send me a
            message.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-white">Get In Touch</h3>

            <p className="mt-5 max-w-lg leading-8 text-slate-400">
              I'm always open to discussing new projects, development
              opportunities and interesting ideas.
            </p>

            {/* Email */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <Mail size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>

                <a
                  href="mailto:roygourango028@gmail.com"
                  className="text-slate-200 transition hover:text-cyan-400"
                >
                  roygourango028@gmail.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <MapPin size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Location</p>

                <p className="text-slate-200">Bangladesh</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <p className="mb-4 text-sm text-slate-500">Find me on</p>

              <div className="flex gap-4">
                <a
                  href="https://github.com/Gourango123"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-800 px-5 py-2 text-sm text-slate-400 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/gourango-roy-14a42732b"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-800 px-5 py-2 text-sm text-slate-400 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project discussion"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  required
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
