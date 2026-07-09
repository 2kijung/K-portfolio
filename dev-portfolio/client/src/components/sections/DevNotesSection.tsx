/* ==========================================================
   개발 노트(Dev Notes) 섹션 — "이 프로젝트를 이렇게 만들었습니다"
   문제 상황 → Before 코드 → After 코드 → 해결/교훈 (트러블슈팅 케이스)
   ========================================================== */

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { devNoteApi, type DevNoteData } from "@/lib/api";
import { Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

function CodeBlock({ label, code, tone }: { label: string; code: string; tone: "before" | "after" }) {
  const color = tone === "before" ? "text-red-300 border-red-500/20" : "text-green-300 border-green-500/20";
  return (
    <div>
      <div className={`text-xs font-mono mb-1 ${tone === "before" ? "text-red-400" : "text-green-400"}`}>{label}</div>
      <pre className={`text-xs bg-black/40 border ${color} rounded-lg p-3 overflow-x-auto`}>
        <code className="text-slate-300">{code}</code>
      </pre>
    </div>
  );
}

export default function DevNotesSection() {
  const { ref, inView } = useInView();
  const [notes, setNotes] = useState<DevNoteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await devNoteApi.getAll();
      if (res.success && Array.isArray(res.data)) setNotes(res.data);
      setLoading(false);
    };
    load();
  }, []);

  if (!loading && notes.length === 0) return null;

  return (
    <section id="dev-notes" className="py-24 relative" style={{ background: "#060b18" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <p className="section-label mb-3">Trouble Shooting</p>
            <h2 className="text-4xl font-extrabold text-white" style={{ fontFamily: "Sora, sans-serif" }}>
              문제 <span className="gradient-text">해결 기록</span>
            </h2>
            <p className="text-slate-500 mt-3 text-sm">실무에서 마주친 장애·이슈와 해결 과정, 그리고 설계 결정</p>
          </div>

          {loading ? (
            <p className="text-center text-slate-500">불러오는 중...</p>
          ) : (
            <div className="space-y-6">
              {notes.map((n) => (
                <div key={n.id} className="glass-card p-6 rounded-xl">
                  <div className="flex items-center gap-2 mb-4">
                    {n.category && (
                      <span className="text-xs bg-blue-500/15 text-blue-300 px-2 py-1 rounded font-mono">
                        {n.category}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white">{n.title}</h3>
                  </div>

                  {n.situation && (
                    <div className="mb-4">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-amber-400 mb-1">
                        <AlertTriangle className="w-4 h-4" /> 상황 / 문제
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{n.situation}</p>
                    </div>
                  )}

                  {(n.codeBefore || n.codeAfter) && (
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {n.codeBefore && <CodeBlock label="// Before (문제)" code={n.codeBefore} tone="before" />}
                      {n.codeAfter && <CodeBlock label="// After (해결)" code={n.codeAfter} tone="after" />}
                    </div>
                  )}

                  {n.solution && (
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-green-400 mb-1">
                        <CheckCircle2 className="w-4 h-4" /> 원인 & 해결
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{n.solution}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10 text-xs text-slate-600 flex items-center justify-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" /> 실제 개발 중 마주친 문제와 해결 과정을 기록했습니다.
          </div>
        </div>
      </div>
    </section>
  );
}
