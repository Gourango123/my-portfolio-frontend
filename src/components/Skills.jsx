import { motion } from "framer-motion";
import { Code2, Database, Server, Wrench } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code2 size={24} />,
      skills: [
        { name: "HTML", level: "90%" },
        { name: "CSS", level: "85%" },
        { name: "JavaScript", level: "80%" },
        { name: "React", level: "80%" },
        { name: "Tailwind CSS", level: "75%" },
      ],
    },
    {
      title: "Backend",
      icon: <Server size={24} />,
      skills: [
        { name: "Node.js", level: "75%" },
        { name: "Express.js", level: "75%" },
        { name: "REST API", level: "80%" },
        { name: "JWT", level: "75%" },
      ],
    },
    {
      title: "Database",
      icon: <Database size={24} />,
      skills: [
        { name: "MongoDB", level: "75%" },
        { name: "Mongoose", level: "75%" },
      ],
    },
    {
      title: "Tools",
      icon: <Wrench size={24} />,
      skills: [
        { name: "Git", level: "75%" },
        { name: "GitHub", level: "80%" },
        { name: "Postman", level: "75%" },
        { name: "VS Code", level: "90%" },
      ],
    },
  ];

  return (
    <section id="skills" className="bg-slate-950 px-6 py-24">
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
            My Skills
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Technologies I<span className="text-cyan-400"> Work With</span>
          </h2>

          <p className="mt-6 leading-8 text-slate-400">
            Here are some of the technologies and tools I use to build modern
            full-stack web applications.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              {/* Category Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  {category.icon}
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium text-slate-300">
                        {skill.name}
                      </span>

                      <span className="text-sm text-cyan-400">
                        {skill.level}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-cyan-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
