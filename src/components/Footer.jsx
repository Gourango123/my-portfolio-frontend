import { ArrowUp, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <a href="#home" className="text-2xl font-bold text-white">
              G<span className="text-cyan-400">R</span>
            </a>

            <p className="mt-2 text-sm text-slate-500">MERN Stack Developer</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Gourango123"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/gourango-roy-14a42732b"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              LinkedIn
            </a>

            <a
              href="mailto:roygourango028@gmail.com"
              className="text-slate-400 transition hover:text-cyan-400"
            >
              <Mail size={20} />
            </a>

            <a
              href="#home"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-slate-950 transition hover:bg-cyan-300"
            >
              <ArrowUp size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Gourango Roy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
