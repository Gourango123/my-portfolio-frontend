import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Server, Wrench } from "lucide-react";
import api from "../api/axios";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/api/skills");

        setSkills(response.data.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load skills"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categoryIcons = {
    Frontend: <Code2 size={24} />,
    Backend: <Server size={24} />,
    Database: <Database size={24} />,
    Tools: <Wrench size={24} />,
  };

  const skillCategories = Object.entries(
    skills.reduce((categories, skill) => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }

      categories[skill.category].push(skill);

      return categories;
    }, {})
  );

  return (
    <section id="skills" className="bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-7xl">
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
            Technologies I
            <span className="text-cyan-400"> Work With</span>
          </h2>

          <p className="mt-6 leading-8 text-slate-400">
            Here are some of the technologies and tools I use to build modern
            full-stack web applications.
          </p>
        </motion.div>

        {loading && (
          <div className="mt-16 text-center text-slate-400">
            Loading skills...
          </div>
        )}

        {error && (
          <div className="mt-16 text-center text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && skills.length === 0 && (
          <div className="mt-16 text-center text-slate-400">
            No skills found.
          </div>
        )}

        {!loading && !error && skills.length > 0 && (
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {skillCategories.map(([category, categorySkills], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                    {categoryIcons[category]}
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {category}
                  </h3>
                </div>

                <div className="space-y-5">
                  {categorySkills.map((skill) => (
                    <div key={skill._id}>
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
        )}
      </div>
    </section>
  );
};

export default Skills;