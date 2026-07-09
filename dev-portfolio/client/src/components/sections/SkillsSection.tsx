/* ==========================================================
   DESIGN: Midnight Architecture — Skills section
   Categorized skill bars with glow effect, animated on scroll
   ========================================================== */

import { useInView } from "@/hooks/useInView";
import { useState } from "react";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    id: "backend",
    label: "Backend",
    icon: "☕",
    skills: [
      { name: "Java / JDK 17", level: 95, color: "#f97316" },
      { name: "Spring Boot 3.x", level: 93, color: "#6db33f" },
      { name: "Spring Security", level: 85, color: "#6db33f" },
      { name: "JPA / Hibernate", level: 88, color: "#59666c" },
      { name: "REST API Design", level: 92, color: "#3b82f6" },
      { name: "gRPC / Protobuf", level: 75, color: "#06b6d4" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "🚀",
    skills: [
      { name: "Docker", level: 92, color: "#2496ed" },
      { name: "Kubernetes (K8s)", level: 88, color: "#326ce5" },
      { name: "Helm Charts", level: 80, color: "#0f1689" },
      { name: "GitHub Actions", level: 87, color: "#2088ff" },
      { name: "Jenkins", level: 82, color: "#d33833" },
      { name: "ArgoCD", level: 75, color: "#ef7b4d" },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    icon: "🏗️",
    skills: [
      { name: "MSA Design", level: 90, color: "#8b5cf6" },
      { name: "Event-Driven (Kafka)", level: 83, color: "#231f20" },
      { name: "API Gateway", level: 87, color: "#3b82f6" },
      { name: "Service Mesh (Istio)", level: 72, color: "#466bb0" },
      { name: "Circuit Breaker", level: 80, color: "#06b6d4" },
      { name: "CQRS / Event Sourcing", level: 76, color: "#a855f7" },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: "🗄️",
    skills: [
      { name: "PostgreSQL", level: 88, color: "#336791" },
      { name: "MySQL", level: 85, color: "#4479a1" },
      { name: "Redis", level: 82, color: "#dc382d" },
      { name: "MongoDB", level: 75, color: "#47a248" },
      { name: "Elasticsearch", level: 72, color: "#f9a825" },
      { name: "Query Optimization", level: 85, color: "#3b82f6" },
    ],
  },
];

function SkillBar({ skill, animate }: { skill: Skill; animate: boolean }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-300 font-medium">{skill.name}</span>
        <span className="text-xs font-mono text-slate-500">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{
            width: animate ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
            boxShadow: `0 0 8px ${skill.color}60`,
            transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref, inView } = useInView();
  const [activeTab, setActiveTab] = useState("backend");

  const activeCategory = categories.find((c) => c.id === activeTab)!;

  return (
    <section
      id="skills"
      className="py-24 relative"
      style={{ background: "linear-gradient(180deg, #060b18 0%, #0a1628 50%, #060b18 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label mb-3">Technical Skills</p>
          <h2
            className="text-4xl font-extrabold text-white"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            기술 스택 &{" "}
            <span className="gradient-text">전문 역량</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            실제 프로덕션 환경에서 검증된 기술 스택과 도구들입니다.
          </p>
        </div>

        {/* Tab navigation */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === cat.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "glass-card text-slate-400 hover:text-white"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div
          className={`grid md:grid-cols-2 gap-8 transition-all duration-700 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Skill bars */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span>{activeCategory.icon}</span>
              {activeCategory.label} Skills
            </h3>
            {activeCategory.skills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} animate={inView} />
            ))}
          </div>

          {/* Tech radar / visual */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-6">핵심 기술 역량</h3>
            <div className="grid grid-cols-2 gap-3">
              {activeCategory.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3 rounded-xl border border-white/5 hover:border-blue-500/25 transition-all duration-200 group"
                  style={{ background: `${skill.color}08` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-1.5 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            i < Math.round(skill.level / 20)
                              ? skill.color
                              : "rgba(255,255,255,0.08)",
                          boxShadow:
                            i < Math.round(skill.level / 20)
                              ? `0 0 4px ${skill.color}80`
                              : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Certifications</h4>
              <div className="space-y-2">
                {[
                  { name: "Certified Kubernetes Administrator (CKA)", org: "CNCF" },
                  { name: "AWS Solutions Architect Associate", org: "Amazon" },
                  { name: "Spring Professional Certification", org: "VMware" },
                ].map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-white font-medium">{cert.name}</div>
                      <div className="text-xs text-slate-600">{cert.org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
