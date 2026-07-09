/* ==========================================================
   DESIGN: Midnight Architecture — Contact section
   Split layout: contact info left, form right
   ========================================================== */

import { useInView } from "@/hooks/useInView";
import { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "kim@devops.kr",
      href: "mailto:kim@devops.kr",
      color: "#3b82f6",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "github.com/kimdevops",
      href: "https://github.com",
      color: "#e2e8f0",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/kimdevops",
      href: "https://linkedin.com",
      color: "#0077b5",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Seoul, South Korea",
      href: null,
      color: "#06b6d4",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 relative"
      style={{ background: "#060b18" }}
    >
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label mb-3">Get In Touch</p>
          <h2
            className="text-4xl font-extrabold text-white"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            함께 일하고{" "}
            <span className="gradient-text">싶으신가요?</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            새로운 프로젝트, 협업 기회, 또는 단순한 기술적 대화도 환영합니다.
          </p>
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left: Contact info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "Sora, sans-serif" }}>
              연락처 정보
            </h3>
            <div className="space-y-4 mb-8">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${info.color}15`,
                      border: `1px solid ${info.color}30`,
                      color: info.color,
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">{info.label}</div>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-slate-200 hover:text-blue-400 transition-colors animated-underline"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-200">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability card */}
            <div className="glass-card rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-green-400">현재 채용 가능</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                풀타임 포지션 및 프리랜서 프로젝트 모두 검토 중입니다.
                Spring Boot / MSA / Kubernetes 관련 포지션에 특히 관심이 있습니다.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Full-time", "Remote OK", "Contract"].map((tag) => (
                  <span key={tag} className="tech-badge text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="glass-card rounded-2xl p-6">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">메시지 전송 완료!</h3>
                <p className="text-slate-400 text-sm">
                  빠른 시일 내에 답변 드리겠습니다.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                >
                  새 메시지 작성
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      이름 *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="홍길동"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="hello@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    제목 *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="프로젝트 협업 문의"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    메시지 *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="안녕하세요! 프로젝트에 대해 이야기 나누고 싶습니다..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      전송 중...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      메시지 보내기
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
