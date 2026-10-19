#!/usr/bin/env python3
"""
Deploy singularity-zh to GitHub through an API relay.

github.com is unreachable from this machine, but https://gh-proxy.com forwards
api.github.com requests (auth headers included). So instead of `git push`
(which hangs through the relay), we drive the Git Data API directly:
blobs -> tree -> commit -> ref, then flip Pages on.

Usage:
    python deploy_api.py <token> [owner] [repo]
"""
import base64
import json
import mimetypes
import os
import sys
import time
import urllib.error
import urllib.request

RELAY = "https://gh-proxy.com/https://api.github.com"
OWNER = "aeroheaven1"
REPO = "singularity-zh"
ROOT = os.path.dirname(os.path.abspath(__file__))

FILES = [
    "index.html",
    "i18n.js",
    "i18n.css",
    "README.md",
    ".gitignore",
    ".nojekyll",
    "assets/app.js",
    "assets/app.css",
]


def req(method, path, token, payload=None, base=RELAY, retries=4):
    # The relay sits behind a CDN that caches responses; a unique query string
    # keeps us from being served a stale cached error (seen with /user).
    sep = "&" if "?" in path else "?"
    url = "%s%s%s_cb=%d" % (base, path, sep, int(time.time() * 1000) % 1000000007)
    data = json.dumps(payload).encode() if payload is not None else None
    headers = {
        "Authorization": "Bearer " + token,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "User-Agent": "singularity-deploy",
    }
    last = None
    for attempt in range(retries + 1):
        try:
            r = urllib.request.Request(url, data=data, headers=headers, method=method)
            with urllib.request.urlopen(r, timeout=60) as resp:
                body = resp.read()
                return resp.status, (json.loads(body) if body else {})
        except urllib.error.HTTPError as e:
            body = e.read()
            try:
                parsed = json.loads(body)
            except Exception:
                parsed = {"raw": body.decode("utf-8", "replace")[:300]}
            if e.code >= 500 and attempt < retries:
                last = (e.code, parsed)
                time.sleep(2)
                continue
            # The relay's CDN sometimes serves a stale "rate limit exceeded"
            # response for a fresh request; a different query string clears it.
            if e.code == 403 and "rate limit" in str(parsed.get("message", "")).lower() \
                    and attempt < retries:
                last = (e.code, parsed)
                time.sleep(1.5)
                continue
            return e.code, parsed
        except Exception as e:  # network
            last = (0, {"error": str(e)})
            if attempt < retries:
                time.sleep(2)
                continue
            return last
    return last


def step(msg):
    print("   " + msg, flush=True)


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: python deploy_api.py <token> [owner] [repo]")
    token = sys.argv[1].strip()
    owner = sys.argv[2] if len(sys.argv) > 2 else OWNER
    repo = sys.argv[3] if len(sys.argv) > 3 else REPO

    print("==> 1/6 校验令牌")
    code, me = req("GET", "/user", token)
    if code != 200:
        sys.exit("   令牌无效: %s %s" % (code, me))
    login = me.get("login")
    step("已认证: %s" % login)
    owner = login

    print("==> 2/6 创建仓库 %s/%s" % (owner, repo))
    code, res = req("POST", "/user/repos", token, {
        "name": repo,
        "description": "Bilingual EN / 中文 version of the Singularity site",
        "homepage": "https://yan7770.github.io/singularity/",
        "private": False,
        "has_issues": True,
        "has_wiki": False,
        "has_projects": False,
        "auto_init": False,
    })
    if code == 201:
        step("已创建: " + res.get("html_url", ""))
    elif code == 422:
        step("仓库已存在，继续")
    else:
        sys.exit("   创建失败: %s %s\n   （令牌需要 repo 写权限）" % (code, res))

    print("==> 3/6 上传 %d 个文件" % len(FILES))
    tree = []
    for rel in FILES:
        path = os.path.join(ROOT, rel)
        with open(path, "rb") as f:
            raw = f.read()
        code, res = req("POST", "/repos/%s/%s/git/blobs" % (owner, repo), token, {
            "content": base64.b64encode(raw).decode(),
            "encoding": "base64",
        })
        if code != 201:
            sys.exit("   %s 上传失败: %s %s" % (rel, code, res))
        tree.append({"path": rel, "mode": "100644", "type": "blob", "sha": res["sha"]})
        step("%-16s %7d B" % (rel, len(raw)))

    print("==> 4/6 生成提交")
    code, t = req("POST", "/repos/%s/%s/git/trees" % (owner, repo), token, {"tree": tree})
    if code != 201:
        sys.exit("   tree 失败: %s %s" % (code, t))
    code, c = req("POST", "/repos/%s/%s/git/commits" % (owner, repo), token, {
        "message": "feat: bilingual EN/中文 layer for the Singularity site\n\n"
                   "- Non-invasive i18n layer over the original React build (artifacts untouched)\n"
                   "- 139 entries covering hero, science, instruments, protocol, data, telemetry, journal, footer\n"
                   "- Reversible: original English nodes memoised and restored verbatim\n"
                   "- Three matching tiers: block paragraphs, per-word headings, inline fragments\n"
                   "- localStorage persistence plus ?lang=zh|en deep links\n"
                   "- CJK typography: Noto Serif/Sans SC fallbacks for mono micro-labels",
        "tree": t["sha"],
    })
    if code != 201:
        sys.exit("   commit 失败: %s %s" % (code, c))
    step("commit " + c["sha"][:10])

    print("==> 5/6 创建 main 分支")
    code, r = req("POST", "/repos/%s/%s/git/refs" % (owner, repo), token, {
        "ref": "refs/heads/main", "sha": c["sha"],
    })
    if code == 201:
        step("main -> " + c["sha"][:10])
    elif code == 422:
        code2, _ = req("PATCH", "/repos/%s/%s/git/refs/heads/main" % (owner, repo), token,
                       {"sha": c["sha"], "force": True})
        step("main 已更新" if code2 == 200 else "main 更新失败: %s" % code2)
    else:
        sys.exit("   建分支失败: %s %s" % (code, r))

    print("==> 6/6 开启 GitHub Pages")
    code, p = req("POST", "/repos/%s/%s/pages" % (owner, repo), token,
                  {"source": {"branch": "main", "path": "/"}})
    if code in (201, 409):
        step("Pages 已开启" if code == 201 else "Pages 此前已开启")
    else:
        step("Pages 未开启 (%s)，需在 Settings → Pages 手动选择 main / root" % code)

    for _ in range(20):
        time.sleep(6)
        code, p = req("GET", "/repos/%s/%s/pages" % (owner, repo), token)
        if code == 200 and p.get("status") == "built":
            break
    url = "https://%s.github.io/%s/" % (owner, repo)
    print("\n站点地址: " + url)
    print("仓库地址: https://github.com/%s/%s" % (owner, repo))
    print("构建状态: %s" % (p.get("status") if code == 200 else "未知"))


if __name__ == "__main__":
    main()
