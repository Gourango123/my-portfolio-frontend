
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "JWT Authentication",
      description:
        "A secure authentication system with user registration, login, logout, JWT access token, refresh token and protected routes.",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
      ],
      github: "https://github.com/",
      live: "https://example.com/",
    },

    {
      title: "REST API",
      description:
        "A RESTful API built with Node.js, Express.js and MongoDB with CRUD operations and database integration.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "REST API",
      ],
      github: "https://github.com/",
      live: "https://example.com/",
    },

    {
      title: "Video Upload API",
      description:
        "A backend application for uploading and serving video files using Express.js, Multer and MongoDB.",
      image:
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Multer",
      ],
      github: "https://github.com/",
      live: "https://example.com/",
    },

    {
      title: "Blog Application",
      description:
        "A full-stack blog application where users can create, edit and delete posts with authentication.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      github: "https://github.com/",
      live: "https://example.com/",
    },
  ];

  return (
    <section
      id="projects"
      className="bg-slate-900 px-6 py-24"
    >
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

        {/* Project Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
