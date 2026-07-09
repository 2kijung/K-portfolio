/* ==========================================================
   About 섹션 — Profile 소개 + 실제 데이터 개수(경력/프로젝트/자격증/스킬)
   가짜 통계 대신 DB의 실제 개수를 집계해 보여줌
   ========================================================== */

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Code2, Server, Cloud, Award } from "lucide-react";
import {
  profileApi, careerApi, projectApi, certificationApi, skillApi,
  type ProfileData,
} from "@/lib/api";

const PLACEHOLDER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663398554856/hsrSa3YUTQvKpXz9DLCYxj/profile-abstract-4WH4AFT3yksx6QBfnqFHP9.webp";

const highlights = [
  { icon: "☕", title: "Java / Spring Boot", desc: "JDK 17 기반 Spring Boot 3.x 애플리케이션 설계 및 개발" },
  { icon: "🗄️", title: "JPA / RDBMS", desc: "엔티티 설계와 JPA로 DB 접근, H2·PostgreSQL 운영" },
  { icon: "🐳", title: "Docker / K8s", desc: "컨테이너화 및 쿠버네티스 배포 학습·적용" },
  { icon: "🚀", title: "CI/CD", desc: "GitHub Actions·Jenkins 기반 자동화 배포 파이프라인" },
];

export default function AboutSection() {
  const { ref, inView } = useInView();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [counts, setCounts] = useState({ careers: 0, projects: 0, certs: 0, skills: 0 });

  useEffect(() => {
    const load = async () => {
      const toArr = (d: any) => (Array.isArray(d) ? d : (d?.content ?? []));
      const [p, ca, pr, ce, sk] = await Promise.all([
        profileApi.get(), careerApi.getAll(), projectApi.getAll(),
        certificationApi.getAll(), skillApi.getAll(),
      ]);
      if (p.success && p.data) setProfile(p.data);
      setCounts({
        careers: toArr(ca.data).length,
        projects: toArr(pr.data).length,
        certs: toArr(ce.data).length,
        skills: toArr(sk.data).length,
      });
    };
    load();
  }, []);

  const stats = [
    { label: "경력", value: `${counts.careers}`, icon: Server },
    { label: "프로젝트", value: `${counts.projects}`, icon: Cloud },
    { label: "자격증", value: `${counts.certs}`, icon: Award },
    { label: "기술 스택", value: `${counts.skills}`, icon: Code2 },
  ];

  return (
    <section id="about" className="py-24 relative" style={{ background: "#060b18" }}>
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
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              <div className="aspect-square rounded-2xl overflow-hidden neon-border">
                <img
                  src={profile?.imageUrl || PLACEHOLDER_IMG}
                  alt="Developer Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Stats grid — 실제 데이터 개수 */}
            <div className="grid grid-cols-2 gap-3 mt-8 max-w-sm mx-auto lg:mx-0">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="glass-card p-4 rounded-xl text-center">
                  <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: "Sora, sans-serif" }}>
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
            <h2 className="text-4xl font-extrabold text-white mb-6" style={{ fontFamily: "Sora, sans-serif" }}>
              {profile?.name || "개발자"}
              <br />
              <span className="gradient-text">소개</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6 whitespace-pre-line">
              {profile?.introduction || "성장을 즐기는 개발자입니다. 관리자 페이지에서 소개를 작성해 보세요."}
            </p>
            {profile?.currentStatus && (
              <p className="text-slate-300 leading-relaxed mb-8">
                <span className="text-blue-400 font-semibold">현재</span> — {profile.currentStatus}
              </p>
            )}

            {/* Highlight cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((item) => (
                <div key={item.title} className="glass-card p-4 rounded-xl hover:border-blue-500/30 transition-all duration-200">
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
