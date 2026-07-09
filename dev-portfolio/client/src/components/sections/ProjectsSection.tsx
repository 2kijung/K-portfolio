/* ==========================================================
   DESIGN: Midnight Architecture — Projects section
   Card grid with hover effects, tech badges, live/github links
   ========================================================== */

import { useInView } from "@/hooks/useInView";
import { ExternalLink, Github, Server, Cloud, Database, Zap } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  longDesc: string;
  tech: string[];
  icon: React.ReactNode;
  color: string;
  status: "Production" | "Development" | "Open Source";
  metrics?: { label: string; value: string }[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce MSA Platform",
    description: "Spring Boot 기반 마이크로서비스 이커머스 플랫폼",
    longDesc:
      "주문, 결제, 재고, 사용자 서비스를 독립적인 마이크로서비스로 분리하여 Kubernetes 클러스터에 배포. Kafka를 통한 이벤트 기반 통신 구현.",
    tech: ["Spring Boot 3", "JDK 17", "Kafka", "Docker", "K8s", "PostgreSQL", "Redis"],
    icon: <Server className="w-6 h-6" />,
    color: "#3b82f6",
    status: "Production",
    metrics: [
      { label: "Daily Users", value: "50K+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Services", value: "8" },
    ],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 2,
    title: "Real-time Monitoring System",
    description: "Kubernetes 클러스터 실시간 모니터링 대시보드",
    longDesc:
      "Prometheus + Grafana 스택을 Spring Boot 애플리케이션과 통합하여 메트릭 수집 및 알림 시스템 구축. Helm Chart로 배포 자동화.",
    tech: ["Spring Boot", "Prometheus", "Grafana", "Helm", "K8s", "WebSocket"],
    icon: <Zap className="w-6 h-6" />,
    color: "#06b6d4",
    status: "Production",
    metrics: [
      { label: "Metrics/sec", value: "10K+" },
      { label: "Dashboards", value: "15+" },
      { label: "Alerts", value: "50+" },
    ],
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Cloud-Native API Gateway",
    description: "Spring Cloud Gateway 기반 API 게이트웨이",
    longDesc:
      "인증/인가, 레이트 리미팅, 로드 밸런싱을 담당하는 API 게이트웨이. JWT 토큰 검증 및 서비스 디스커버리 통합.",
    tech: ["Spring Cloud Gateway", "JWT", "Redis", "Docker", "Eureka", "JDK 17"],
    icon: <Cloud className="w-6 h-6" />,
    color: "#8b5cf6",
    status: "Open Source",
    metrics: [
      { label: "Req/sec", value: "5K+" },
      { label: "Latency", value: "<10ms" },
      { label: "Stars", value: "120+" },
    ],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 4,
    title: "Data Pipeline Service",
    description: "대용량 데이터 처리 배치 파이프라인",
    longDesc:
      "Spring Batch를 활용한 일 1억 건 이상의 데이터 처리 파이프라인. 병렬 처리 및 재시도 로직으로 안정성 확보.",
    tech: ["Spring Batch", "JDK 17", "PostgreSQL", "Docker", "K8s CronJob", "Kafka"],
    icon: <Database className="w-6 h-6" />,
    color: "#f59e0b",
    status: "Production",
    metrics: [
      { label: "Records/day", value: "100M+" },
      { label: "Processing", value: "2hrs" },
      { label: "Error Rate", value: "<0.01%" },
    ],
    github: "https://github.com",
  },
];

const statusColors: Record<string, string> = {
  Production: "text-green-400 bg-green-400/10 border-green-400/25",
  Development: "text-yellow-400 bg-yellow-400/10 border-yellow-400/25",
  "Open Source": "text-purple-400 bg-purple-400/10 border-purple-400/25",
};

export default function ProjectsSection() {
  const { ref, inView } = useInView();

  return (
    <section id="projects" className="py-24 relative" style={{ background: "#060b18" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label mb-3">Featured Projects</p>
          <h2
            className="text-4xl font-extrabold text-white"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            실제 배포된{" "}
            <span className="gradient-text">프로젝트들</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            프로덕션 환경에서 운영 중인 시스템들입니다. 각 프로젝트는 실제 비즈니스 문제를
            해결하기 위해 설계되었습니다.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`glass-card rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-500 group ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}
                  >
                    <span style={{ color: project.color }}>{project.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500">{project.description}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded-full border ${statusColors[project.status]}`}
                >
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.longDesc}</p>

              {/* Metrics */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-xl bg-white/3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-lg font-bold text-white" style={{ fontFamily: "Sora, sans-serif" }}>
                        {m.value}
                      </div>
                      <div className="text-xs text-slate-600">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span key={t} className="tech-badge text-xs">
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
