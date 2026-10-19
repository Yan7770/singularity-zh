#!/usr/bin/env bash
# Push singularity-zh to GitHub and enable Pages.
# Usage:
#   GH_TOKEN=ghp_xxx PROXY=http://127.0.0.1:7890 ./deploy.sh
set -euo pipefail

OWNER="${GH_OWNER:?set GH_OWNER to your GitHub username}"
REPO="${GH_REPO:-singularity-zh}"
TOKEN="${GH_TOKEN:?set GH_TOKEN to a Personal Access Token with repo scope}"
PROXY="${PROXY:-}"

cd "$(dirname "$0")"

HOST="github.com"
[ -n "$PROXY" ] && HOST="$(echo "$PROXY" | sed -E 's#^https?://##')"

echo "==> 1/4 连通性检查"
if [ -n "$PROXY" ]; then
  curl -s -o /dev/null -w "   api.github.com via proxy: %{http_code}\n" --max-time 15 \
    --proxy "$PROXY" https://api.github.com/ || true
else
  curl -s -o /dev/null -w "   api.github.com direct: %{http_code}\n" --max-time 10 \
    https://api.github.com/ || true
fi

echo "==> 2/4 创建仓库 $OWNER/$REPO（已存在则跳过）"
API_ARGS=(-s -X POST -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json"
  -d "{\"name\":\"$REPO\",\"description\":\"Bilingual EN/中文 version of the Singularity site\",\"private\":false,\"has_issues\":true,\"has_wiki\":false}")
[ -n "$PROXY" ] && API_ARGS+=(--proxy "$PROXY")
curl "${API_ARGS[@]}" https://api.github.com/user/repos >/tmp/repo_create.json 2>/dev/null || true
grep -o '"full_name": *"[^"]*"' /tmp/repo_create.json | head -1 || echo "   (仓库可能已存在，继续)"

echo "==> 3/4 推送 main"
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$OWNER/$REPO.git"
[ -n "$PROXY" ] && git config http.proxy "$PROXY"
# token 只在本次推送里出现，不写入 .git/config
git -c "http.https://github.com/.extraheader=Authorization: Bearer $TOKEN" \
    push -u origin main

echo "==> 4/4 开启 GitHub Pages"
PAGES_ARGS=(-s -X POST -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json"
  -d '{"source":{"branch":"main","path":"/"}}')
[ -n "$PROXY" ] && PAGES_ARGS+=(--proxy "$PROXY")
curl "${PAGES_ARGS[@]}" "https://api.github.com/repos/$OWNER/$REPO/pages" >/tmp/pages.json 2>/dev/null || true
grep -o '"html_url": *"[^"]*"' /tmp/pages.json | head -1 || echo "   已开启（或需在 Settings → Pages 手动确认）"

echo
echo "完成。站点地址（首次构建约 1 分钟）：https://$OWNER.github.io/$REPO/"
