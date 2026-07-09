/* ==========================================================
   DESIGN: Midnight Architecture — Architecture showcase
   Interactive MSA diagram with animated connections
   ========================================================== */

import { useInView } from "@/hooks/useInView";
import { useState } from "react";

const ARCH_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663398554856/hsrSa3YUTQvKpXz9DLCYxj/arch-diagram-QtB2DgTkQnfWzqWGpvHsZX.webp";

interface ArchNode {
  id: string;
  label: string;
  description: string;
  tech: string;
  color: string;
  x: string;
  y: string;
}

const archNodes: ArchNode[] = [
  {
    id: "gateway",
    label: "API Gateway",
    description: "Spring Cloud Gateway — 인증, 라우팅, 레이트 리미팅",
    tech: "Spring Cloud Gateway",
    color: "#3b82f6",
    x: "50%",
    y: "8%",
  },
  {
    id: "user",
    label: "User Service",
    description: "사용자 인증/인가, JWT 토큰 관리",
    tech: "Spring Boot + JDK 17",
    color: "#8b5cf6",
    x: "15%",
    y: "38%",
  },
  {
    id: "order",
    label: "Order Service",
    description: "주문 처리 및 상태 관리, Saga 패턴",
    tech: "Spring Boot + Kafka",
    color: "#06b6d4",
    x: "38%",
    y: "38%",
  },
  {
    id: "payment",
    label: "Payment Service",
    description: "결제 처리 및 환불, 트랜잭션 관리",
    tech: "Spring Boot + JDK 17",
    color: "#10b981",
    x: "62%",
    y: "38%",
  },
  {
    id: "inventory",
    label: "Inventory Service",
    description: "재고 관리 및 예약, 이벤트 소싱",
    tech: "Spring Boot + Redis",
    color: "#f59e0b",
    x: "85%",
    y: "38%",
  },
  {
    id: "kafka",
    label: "Kafka",
    description: "서비스 간 비동기 이벤트 브로커",
    tech: "Apache Kafka",
    color: "#231f20",
    x: "50%",
    y: "62%",
  },
  {
    id: "k8s",
    label: "Kubernetes",
    description: "컨테이너 오케스트레이션, Auto-scaling",
    tech: "K8s + Helm",
    color: "#326ce5",
    x: "20%",
    y: "85%",
  },
  {
    id: "db",
    label: "PostgreSQL",
    description: "서비스별 독립 데이터베이스 (DB per Service)",
    tech: "PostgreSQL + Redis",
    color: "#336791",
    x: "50%",
    y: "85%",
  },
  {
    id: "monitor",
    label: "Monitoring",
    description: "Prometheus + Grafana 메트릭 수집 및 알림",
    tech: "Prometheus + Grafana",
    color: "#e6522c",
    x: "80%",
    y: "85%",
  },
];

const techStack = [
  {
    category: "Runtime",
    items: ["JDK 17 (LTS)", "Spring Boot 3.2", "Spring Cloud 2023"],
  },
  {
    category: "Container",
    items: ["Docker 24.x", "Docker Compose", "Multi-stage Build"],
  },
  {
    category: "Orchestration",
    items: ["Kubernetes 1.28", "Helm 3.x", "ArgoCD (GitOps)"],
  },
  {
    category: "Messaging",
    items: ["Apache Kafka", "Spring Kafka", "Saga Pattern"],
  },
  {
    category: "Observability",
    items: ["Prometheus", "Grafana", "Jaeger Tracing"],
  },
  {
    category: "CI/CD",
    items: ["GitHub Actions", "Docker Registry", "Rolling Update"],
  },
];

export default function ArchitectureSection() {
  const { ref, inView } = useInView();
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(null);

  return (
    <section
      id="architecture"
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
          <p className="section-label mb-3">System Architecture</p>
          <h2
            className="text-4xl font-extrabold text-white"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            MSA 아키텍처 &{" "}
            <span className="gradient-text">배포 환경</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            실제 프로덕션에 배포된 마이크로서비스 아키텍처입니다. 각 서비스는 독립적으로
            배포되고 확장 가능하며, Kubernetes가 전체 오케스트레이션을 담당합니다.
          </p>
        </div>

        <div
          className={`grid lg:grid-cols-5 gap-8 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Architecture diagram */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs font-mono text-slate-500 ml-2">
                  msa-architecture.yaml
                </span>
              </div>
              <div className="relative">
                <img
                  src={ARCH_IMG}
                  alt="MSA Architecture Diagram"
                  className="w-full object-cover"
                  style={{ maxHeight: "420px" }}
                />
                {/* Overlay nodes */}
                <div className="absolute inset-0">
                  {archNodes.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{ left: node.x, top: node.y }}
                    >
                      <div
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          selectedNode?.id === node.id ? "scale-150" : "group-hover:scale-125"
                        }`}
                        style={{
                          background: node.color,
                          boxShadow: `0 0 8px ${node.color}`,
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected node info */}
              {selectedNode && (
                <div
                  className="p-4 border-t border-white/5 animate-fadeIn"
                  style={{ background: `${selectedNode.color}10` }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: selectedNode.color }}
                    />
                    <span className="text-sm font-bold text-white">{selectedNode.label}</span>
                    <span className="text-xs font-mono text-slate-500">
                      ({selectedNode.tech})
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedNode.description}</p>
                </div>
              )}
            </div>

            {/* Deployment flow */}
            <div className="mt-4 glass-card rounded-2xl p-4">
              <h4 className="text-sm font-semibold text-slate-300 mb-3 font-mono">
                $ kubectl get deployments --all-namespaces
              </h4>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { ns: "production", name: "api-gateway", ready: "3/3", status: "Running" },
                  { ns: "production", name: "user-service", ready: "2/2", status: "Running" },
                  { ns: "production", name: "order-service", ready: "3/3", status: "Running" },
                  { ns: "production", name: "payment-service", ready: "2/2", status: "Running" },
                  { ns: "production", name: "inventory-service", ready: "2/2", status: "Running" },
                ].map((d) => (
                  <div key={d.name} className="flex items-center gap-4 text-slate-400">
                    <span className="text-blue-400 w-24 truncate">{d.ns}</span>
                    <span className="text-white w-36 truncate">{d.name}</span>
                    <span className="text-slate-500 w-12">{d.ready}</span>
                    <span className="text-green-400">{d.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech stack list */}
          <div className="lg:col-span-2 space-y-3">
            {techStack.map((group) => (
              <div key={group.category} className="glass-card rounded-xl p-4">
                <h4 className="text-xs font-mono text-blue-400 mb-3 tracking-wider uppercase">
                  {group.category}
                </h4>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Deployment status */}
            <div className="glass-card rounded-xl p-4 border border-green-500/20">
              <h4 className="text-xs font-mono text-green-400 mb-3 tracking-wider uppercase">
                Production Status
              </h4>
              <div className="space-y-2">
                {[
                  { label: "API Gateway", status: "Healthy", uptime: "99.9%" },
                  { label: "Microservices", status: "Running", uptime: "99.8%" },
                  { label: "Database Cluster", status: "Active", uptime: "99.99%" },
                  { label: "Kafka Cluster", status: "Online", uptime: "99.9%" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-slate-400">{s.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-400">{s.status}</span>
                      <span className="text-xs text-slate-600">{s.uptime}</span>
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
