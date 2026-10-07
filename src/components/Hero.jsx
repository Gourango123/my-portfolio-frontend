import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 px-6 pt-20"
    >
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-lg font-medium text-cyan-400">Hi, I'm</p>

          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
            Gourango
            <span className="block text-cyan-400">Roy</span>
          </h1>

          <h2 className="mt-6 text-2xl font-semibold text-slate-200 md:text-3xl">
            MERN Stack Developer
          </h2>

          <p className="mt-6 max-w-xl leading-8 text-slate-400">
            I build modern, responsive and scalable full-stack web applications
            using React, Node.js, Express.js and MongoDB.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              View Projects
            </a>

            {/* CV public : public/Gourango_Roy_CV.pdf */}
            <a
              href="/Gourango_Roy_CV.pdf"
              download="Gourango_Roy_CV.pdf"
              className="flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              <Download size={18} />
              Download CV
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-6 mb-6 flex gap-5">
            <a
              href="https://github.com/Gourango123"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 transition hover:text-white"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/gourango-roy-14a42732b"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 transition hover:text-cyan-400"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/5 shadow-2xl shadow-cyan-500/10 md:h-96 md:w-96">
            <div className="absolute inset-5 rounded-full border border-cyan-400/20" />

            <div className="text-center">
              <p className="text-6xl font-bold text-cyan-400">MERN</p>
              <p className="mt-3 text-slate-400">Full Stack Developer</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400"
      >
        <ArrowDown size={25} />
      </motion.a>
    </section>
  );
};

export default Hero;