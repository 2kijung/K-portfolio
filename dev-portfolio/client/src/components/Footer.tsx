/* ==========================================================
   DESIGN: Midnight Architecture — Minimal footer
   ========================================================== */

import { Terminal, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="py-8 border-t"
      style={{ background: "#040810", borderColor: "rgba(59,130,246,0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="font-mono text-sm text-slate-400">
              <span className="text-blue-400">&lt;</span>
              KimDev
              <span className="text-blue-400">/&gt;</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs font-mono text-slate-600">
            © 2024 Kim DevOps. Built with{" "}
            <span className="text-blue-400">React + TypeScript</span>
          </p>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Github className="w-4 h-4" />, href: "https://github.com" },
              { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com" },
              { icon: <Mail className="w-4 h-4" />, href: "mailto:kim@devops.kr" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-300 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
