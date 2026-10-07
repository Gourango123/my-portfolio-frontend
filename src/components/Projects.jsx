import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import api from "../api/axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/api/projects");

        setProjects(response.data.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
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
            My Projects
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Things I've
            <span className="text-cyan-400"> Built</span>
          </h2>

          <p className="mt-6 leading-8 text-slate-400">
            Here are some of the projects I've worked on while
            learning and building full-stack web applications.
          </p>
        </motion.div>

        {loading && (
          <div className="mt-16 text-center text-slate-400">
            Loading projects...
          </div>
        )}

        {error && (
          <div className="mt-16 text-center text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="mt-16 text-center text-slate-400">
            No projects found.
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;