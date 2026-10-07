import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import api from "../api/axios";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [experienceResponse, educationResponse] =
          await Promise.all([
            api.get("/api/experiences"),
            api.get("/api/educations"),
          ]);

        setExperiences(experienceResponse.data.data);
        setEducations(educationResponse.data.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load experience and education"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const timelineItems = [
    ...experiences.map((item) => ({
      id: item._id,
      type: "experience",
      startDate: item.startDate,
      endDate: item.endDate,
      title: item.position,
      company: item.company,
      description: item.description,
    })),
    ...educations.map((item) => ({
      id: item._id,
      type: "education",
      startDate: item.startDate,
      endDate: item.endDate,
      title: item.degree,
      company: item.institution,
      description: item.description,
    })),
  ];

  return (
    <section
      id="experience"
      className="bg-slate-900 px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">
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

        {loading && (
          <div className="mt-16 text-center text-slate-400">
            Loading...
          </div>
        )}

        {error && (
          <div className="mt-16 text-center text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && timelineItems.length === 0 && (
          <div className="mt-16 text-center text-slate-400">
            No experience or education found.
          </div>
        )}

        {!loading && !error && timelineItems.length > 0 && (
          <div className="relative mt-16">
            <div className="absolute left-5 top-0 h-full w-px bg-slate-700 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.id}
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
                  <div className="ml-14 w-full md:ml-0 md:w-[45%]">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-cyan-400/40">
                      <span className="text-sm font-semibold text-cyan-400">
                        {item.startDate} - {item.endDate}
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

                  <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950 text-cyan-400 md:left-1/2 md:-translate-x-1/2">
                    {item.type === "education" ? (
                      <GraduationCap size={24} />
                    ) : (
                      <Briefcase size={24} />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;