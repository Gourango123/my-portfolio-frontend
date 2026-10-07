import { motion } from "framer-motion";
import { Code2, Database, Rocket, Server } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Code2 size={28} />,
      title: "Frontend Development",
      description:
        "Building responsive and interactive interfaces using React and modern frontend technologies.",
    },
    {
      icon: <Server size={28} />,
      title: "Backend Development",
      description:
        "Creating REST APIs and server-side applications using Node.js and Express.js.",
    },
    {
      icon: <Database size={28} />,
      title: "Database",
      description:
        "Working with MongoDB and Mongoose to design and manage application data.",
    },
    {
      icon: <Rocket size={28} />,
      title: "Full Stack",
      description:
        "Connecting frontend, backend and database to build complete web applications.",
    },
  ];

  return (
    <section id="about" className="bg-slate-900 px-6 py-24">
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
            About Me
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Building Ideas Into
            <span className="text-cyan-400"> Web Applications</span>
          </h2>

          <p className="mt-6 leading-8 text-slate-400">
            I'm a MERN Stack Developer passionate about creating modern and
            user-friendly web applications. I enjoy turning ideas into
            functional digital experiences and continuously improving my
            development skills.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group rounded-2xl border border-slate-800 bg-slate-950 p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition group-hover:bg-cyan-400 group-hover:text-slate-950">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
