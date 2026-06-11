#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  cp .env.example .env
fi

set -a
# shellcheck source=/dev/null
source .env
set +a

PORT="${PORT:-8000}"

port_in_use() {
  if command -v lsof >/dev/null 2>&1; then
    lsof -nP -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1
    return
  fi

  python3 - "$1" <<'PY'
import socket, sys
port = int(sys.argv[1])
for host in ("127.0.0.1", "::1"):
    family = socket.AF_INET6 if ":" in host else socket.AF_INET
    with socket.socket(family, socket.SOCK_STREAM) as s:
        try:
            s.bind((host, port))
        except OSError:
            sys.exit(0)
sys.exit(1)
PY
}

open_url() {
  if command -v open >/dev/null 2>&1; then
    open "$1"
  else
    echo "Open this URL in your browser: $1"
  fi
}

URL="http://localhost:${PORT}/"

if port_in_use "$PORT"; then
  echo "Port ${PORT} is already in use — reusing existing server."
  echo "${URL}"
  open_url "$URL"
  exit 0
fi

echo "Starting server at ${URL}"
echo "Press Ctrl+C to stop."

(sleep 0.4 && open_url "$URL") &

exec python3 -m http.server "$PORT"
