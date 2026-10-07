
import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      icon: <GraduationCap size={24} />,
      year: "2022 - 2026",
      title: "Diploma in Engineering",
      company: "Thakurgaon Polytechnic Institute",
      description:
        "Completed Diploma in Engineering and developed a strong interest in web development and software engineering.",
    },
    {
      icon: <Briefcase size={24} />,
      year: "2025 - Present",
      title: "MERN Stack Developer",
      company: "Self Learning & Projects",
      description:
        "Building full-stack web applications using React, Node.js, Express.js and MongoDB with REST APIs and authentication.",
    },
  ];

  return (
    <section
      id="experience"
      className="bg-slate-900 px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 font-semibold uppercase tracking-widest text-cyan-400">
            My Journey
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Experience &
            <span className="text-cyan-400"> Education</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">

          {/* Line */}
          <div className="absolute left-5 top-0 h-full w-px bg-slate-700 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -40 : 40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative flex md:items-center ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="ml-14 w-full md:ml-0 md:w-[45%]">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-cyan-400/40">

                    <span className="text-sm font-semibold text-cyan-400">
                      {item.year}
                    </span>

                    <h3 className="mt-2 text-xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.company}
                    </p>

                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950 text-cyan-400 md:left-1/2 md:-translate-x-1/2">
                  {item.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;

