import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Rocket,
  Server,
} from "lucide-react";
import api from "../api/axios";

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const iconMap = {
    Code2,
    Database,
    Rocket,
    Server,
  };

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get("/api/about");

        setAbout(response.data.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load about section"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section
        id="about"
        className="bg-slate-900 px-6 py-24"
      >
        <div className="text-center text-slate-400">
          Loading about section...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="about"
        className="bg-slate-900 px-6 py-24"
      >
        <div className="text-center text-red-400">
          {error}
        </div>
      </section>
    );
  }

  if (!about) {
    return null;
  }

  return (
    <section
      id="about"
      className="bg-slate-900 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 font-semibold uppercase tracking-widest text-cyan-400">
            {about.label}
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            {about.title}
            <span className="text-cyan-400">
              {" "}
              {about.highlight}
            </span>
          </h2>

          <p className="mt-6 leading-8 text-slate-400">
            {about.description}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.features.map((feature, index) => {
            const Icon = iconMap[feature.icon];

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group rounded-2xl border border-slate-800 bg-slate-950 p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition group-hover:bg-cyan-400 group-hover:text-slate-950">
                  {Icon && <Icon size={28} />}
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;