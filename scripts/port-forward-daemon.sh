#!/usr/bin/env bash
# 포트포워드 자동 재연결 데몬
# pod 교체/재시작 시 자동으로 포트포워드를 복구

NAMESPACE="portfolio"
FRONTEND_PORT=8888
BACKEND_PORT=8889

log() { echo "[$(date '+%H:%M:%S')] $1"; }

forward_frontend() {
  while true; do
    log "frontend 포트포워드 시작 (:${FRONTEND_PORT})"
    kubectl port-forward --address 0.0.0.0 -n "$NAMESPACE" svc/portfolio-frontend "${FRONTEND_PORT}:80" 2>/dev/null
    log "frontend 포트포워드 끊김 — 5초 후 재연결"
    sleep 5
  done
}

forward_backend() {
  while true; do
    log "backend 포트포워드 시작 (:${BACKEND_PORT})"
    kubectl port-forward --address 0.0.0.0 -n "$NAMESPACE" svc/portfolio-backend "${BACKEND_PORT}:8080" 2>/dev/null
    log "backend 포트포워드 끊김 — 5초 후 재연결"
    sleep 5
  done
}

log "포트포워드 데몬 시작"
forward_frontend &
forward_backend &
wait
