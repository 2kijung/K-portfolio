/* ==========================================================
   DESIGN: Midnight Architecture — About section
   Asymmetric layout: profile image left, bio + stats right
   ========================================================== */

import { useInView } from "@/hooks/useInView";
import { Code2, Server, Cloud, Award } from "lucide-react";

const PROFILE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663398554856/hsrSa3YUTQvKpXz9DLCYxj/profile-abstract-4WH4AFT3yksx6QBfnqFHP9.webp";

const stats = [
  { label: "Years of Experience", value: "5+", icon: Award },
  { label: "Projects Deployed", value: "30+", icon: Cloud },
  { label: "Microservices Built", value: "50+", icon: Server },
  { label: "Lines of Code", value: "200K+", icon: Code2 },
];

const highlights = [
  {
    icon: "☕",
    title: "Java / Spring Boot",
    desc: "JDK 17 기반의 Spring Boot 3.x 애플리케이션 설계 및 개발",
  },
  {
    icon: "🏗️",
    title: "MSA Architecture",
    desc: "도메인 주도 설계(DDD)를 적용한 마이크로서비스 분리 및 통합",
  },
  {
    icon: "🐳",
    title: "Docker / Kubernetes",
    desc: "컨테이너화 및 K8s 클러스터 운영, Helm Chart 관리",
  },
  {
    icon: "🚀",
    title: "CI/CD Pipeline",
    desc: "GitHub Actions, Jenkins를 통한 자동화 배포 파이프라인 구축",
  },
];

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-24 relative" style={{ background: "#060b18" }}>
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left: Profile visual */}
          <div className="relative">
            {/* Main image */}
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              <div className="aspect-square rounded-2xl overflow-hidden neon-border">
                <img
                  src={PROFILE_IMG}
                  alt="Developer Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-card px-4 py-3 rounded-xl neon-border">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-mono text-green-400">Production Ready</span>
                </div>
              </div>
              {/* Floating tech card */}
              <div className="absolute -top-4 -left-4 glass-card px-4 py-3 rounded-xl neon-border">
                <div className="text-xs font-mono text-blue-400">
                  <span className="text-slate-500">$</span> kubectl get pods
                  <div className="text-green-400 mt-1">3/3 Running ✓</div>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mt-8 max-w-sm mx-auto lg:mx-0">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="glass-card p-4 rounded-xl text-center">
                  <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <div
                    className="text-2xl font-extrabold text-white mb-1"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bio */}
          <div>
            <p className="section-label mb-3">About Me</p>
            <h2
              className="text-4xl font-extrabold text-white mb-6"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Backend Engineer,
              <br />
              <span className="gradient-text">Cloud Native 전문가</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              5년 이상의 경력을 가진 백엔드 엔지니어로, JDK 17과 Spring Boot 3.x를
              주력으로 사용합니다. 마이크로서비스 아키텍처 설계부터 Docker 컨테이너화,
              Kubernetes 오케스트레이션을 통한 실제 프로덕션 배포까지 전 과정을
              직접 수행합니다.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              단순히 코드를 작성하는 것을 넘어, 시스템이 어떻게 확장되고 운영되는지를
              깊이 이해하며, 비즈니스 요구사항을 안정적이고 확장 가능한 아키텍처로
              변환하는 것을 전문으로 합니다.
            </p>

            {/* Highlight cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="glass-card p-4 rounded-xl hover:border-blue-500/30 transition-all duration-200"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
