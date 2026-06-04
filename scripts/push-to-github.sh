#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GH_BIN="${GH_BIN:-}"
if [[ -z "$GH_BIN" ]]; then
  if command -v gh >/dev/null 2>&1; then
    GH_BIN="$(command -v gh)"
  elif [[ -x "$ROOT/.tools/gh_2.67.0_macOS_arm64/bin/gh" ]]; then
    GH_BIN="$ROOT/.tools/gh_2.67.0_macOS_arm64/bin/gh"
  else
    echo "Install GitHub CLI: https://cli.github.com/"
    exit 1
  fi
fi

if ! "$GH_BIN" auth status >/dev/null 2>&1; then
  echo "Log in to GitHub first:"
  "$GH_BIN" auth login -h github.com -p https -w --skip-ssh-key
fi

REPO_NAME="${1:-portfolio}"

"$GH_BIN" repo create "$REPO_NAME" --private --source=. --remote=origin --push

echo ""
echo "Done. View repo:"
"$GH_BIN" repo view --web 2>/dev/null || "$GH_BIN" repo view
