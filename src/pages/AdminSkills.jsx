import { useState } from "react";

const AdminSkills = () => {
  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [icon, setIcon] = useState("");

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h1 className="mb-8 text-2xl font-bold text-white">
          Test Skills Dropdown
        </h1>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-white">
              Skill
            </label>

            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 text-black"
            >
              <option value="">Select Skill</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Node.js">Node.js</option>
              <option value="Express.js">Express.js</option>
              <option value="MongoDB">MongoDB</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-white">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 text-black"
            >
              <option value="">Select Category</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Tools">Tools</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-white">
              Level
            </label>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 text-black"
            >
              <option value="">Select Level</option>
              <option value="50">50%</option>
              <option value="60">60%</option>
              <option value="70">70%</option>
              <option value="80">80%</option>
              <option value="90">90%</option>
              <option value="100">100%</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-white">
              Icon
            </label>

            <select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 text-black"
            >
              <option value="">Select Icon</option>
              <option value="SiReact">React</option>
              <option value="SiNodedotjs">Node.js</option>
              <option value="SiMongodb">MongoDB</option>
              <option value="SiJavascript">JavaScript</option>
            </select>
          </div>

        </div>

        <div className="mt-8 rounded-xl bg-slate-800 p-5 text-white">
          <p>Skill: {skill}</p>
          <p>Category: {category}</p>
          <p>Level: {level}%</p>
          <p>Icon: {icon}</p>
        </div>

      </div>
    </section>
  );
};

export default AdminSkills;