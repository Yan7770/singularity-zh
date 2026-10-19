/* ============================================================
   Singularity — bilingual layer (中文 / EN)
   ------------------------------------------------------------
   A non-invasive translation layer for the original React build.
   The English page is left completely untouched: the original
   text nodes are memoised on first swap and restored verbatim
   when switching back to EN.
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "singularity.lang";

  /* ---------------------------------------------------------
     1. Copy
     --------------------------------------------------------- */

  /* Meta */
  var META = {
    en: {
      title: "Singularity — The End of Approximation",
      desc:
        "Singularity is a private medical practice built on total-resolution diagnostics: whole-genome sequencing, continuous physiology, and a single physician accountable for every variable."
    },
    zh: {
      title: "Singularity — 近似的终结",
      desc:
        "Singularity 是一家以全分辨诊断为基石的私人医疗诊所：全基因组测序、连续生理监测，以及一位对您身体每一个变量负责的医生。"
    }
  };

  /* One-to-one strings, keyed by the normalised English text node */
  var TEXT = {
    /* — header / nav — */
    "Private Medical Practice": "私人医疗诊所",
    "Science": "科学",
    "Instruments": "仪器",
    "Protocol": "流程",
    "Journal": "期刊",
    "Request introduction": "申请引荐",

    /* — hero — */
    "Private medical practice — Est. 2031": "私人医疗诊所 — 创立于 2031",
    "The end of": "近似的",
    "approximation.": "终结。",
    "Singularity is a private medical practice built on total-resolution diagnostics — whole-genome sequencing, continuous physiology, and a single physician accountable for every variable in your body.":
      "Singularity 是一家以全分辨诊断为基石的私人医疗诊所——全基因组测序、连续生理监测，以及一位对您身体中每一个变量负责的医生。",
    "Request an introduction": "申请引荐",
    "See the protocol": "查看诊疗流程",
    "By referral only · 240 members": "仅接受转介 · 240 位会员",
    "· 11 physicians": "· 11 位医生",

    /* — hero plate — */
    "Plate 01 · Event horizon": "图版 01 · 事件视界",
    "Imaging resolution": "成像分辨率",
    "Sequenced per member": "单人测序量",
    "Physiological latency": "生理信号延迟",

    /* — affiliations marquee — */
    "ETH Zürich": "苏黎世联邦理工学院",
    "Broad Institute": "布罗德研究所",
    "Karolinska Institutet": "卡罗林斯卡学院",
    "RIKEN": "理化学研究所",
    "Max Planck Society": "马克斯·普朗克学会",
    "Wellcome Sanger Institute": "威康桑格研究所",
    "Chan Zuckerberg Biohub": "陈·扎克伯格生物中心",
    "Institut Pasteur": "巴斯德研究所",

    /* — doctrine — */
    "01 — Doctrine": "01 — 信条",
    "Zürich · MMXXXI": "苏黎世 · MMXXXI",
    "Definition": "定义",
    "A singularity is the point at which a function stops behaving incrementally — where resolution becomes absolute rather than proportional.":
      "奇点，是函数不再渐进变化的那个点——在那里，分辨率成为绝对，而不再是比例。",
    "We took the word as an obligation, not a metaphor.":
      "我们把这个词当作一种义务，而非一个比喻。",
    "Practice": "诊所",
    "Founded 2031. Eleven physicians. Two hundred and forty members. No insurance accepted, no volume model, no queue.":
      "创立于 2031 年。十一位医生，二百四十位会员。不接受保险，不做规模，不设排队。",
    "Mandate": "使命",
    "To know one body as completely as medicine currently allows — and then to keep knowing it.":
      "以医学今日之所能，彻底认识一具身体——然后持续地认识下去。",
    "Elias Roth": "Elias Roth",
    "Chief physician": "首席医生",

    /* — instruments — */
    "02 — Instruments": "02 — 仪器",
    "Four systems": "四套系统",
    "Four instruments.": "四台仪器。",
    "One body.": "一具身体。",
    "None of this is a device subscription. Each instrument exists to remove one specific kind of uncertainty — and to leave nothing that requires your interpretation.":
      "这些都不是设备订阅。每一台仪器只为消除一类特定的不确定性——并且不留下任何需要您自行解读的东西。",
    "Genome, whole": "基因组 · 完整",
    "3.2 gigabases read at 60× depth, re-annotated each quarter against the full literature and every prior report we hold on you.":
      "读取 32 亿碱基，深度 60×；每季度依据完整文献与我们持有的全部既往报告重新注释。",
    "3.2 Gb · 60× depth": "3.2 Gb · 60× 深度",
    "Physiology, continuous": "生理 · 连续",
    "A clinical-grade array reads 1,400 signals a day. Your physician sees the deviation long before you would feel it.":
      "一套临床级阵列每日读取 1,400 个信号。在您察觉之前，您的医生已经看见偏离。",
    "1,400 signals / day": "每日 1,400 个信号",
    "Imaging, sub-cellular": "影像 · 亚细胞",
    "0.4 μm magnetic and opto-acoustic imaging, read independently by two radiologists and one model, then reconciled.":
      "0.4 μm 磁成像与光声成像，由两位放射科医生与一个模型独立阅片，再行校对。",
    "0.4 μm resolution": "0.4 μm 分辨率",
    "Reasoning, clinical": "判断 · 临床",
    "One physician holds the entire record. Not a portal, not a dashboard — a person who knows the shape of your baseline.":
      "一位医生持有完整档案。不是门户，不是仪表盘——而是一个人，熟悉您基线的形状。",
    "1 physician / 22 members": "1 位医生 / 22 位会员",

    /* — protocol — */
    "03 — The protocol": "03 — 流程",
    "12 weeks": "12 周",
    "Twelve weeks": "十二周",
    "to a": "抵达",
    "baseline.": "基线。",
    "Membership begins with measurement, not with treatment. We do not accept a member we cannot first describe completely.":
      "会员身份始于测量，而非治疗。若无法先完整描述一位会员，我们不会接纳他。",
    "Residency": "驻留",
    "4 days": "4 天",
    "Data points": "数据点",
    "Recalibration": "重校准",
    "Quarterly": "每季度",
    "Days 1–4": "第 1–4 天",
    "Baseline": "基线",
    "Four days in residence at Zürich or Shanghai. Forty blood draws across one circadian cycle, an uninterrupted imaging session, and a full neurocognitive map.":
      "在苏黎世或上海驻留四天。跨越一个昼夜节律的四十次采血，一次不间断的成像，以及完整的神经认知图谱。",
    "Weeks 2–5": "第 2–5 周",
    "Model": "模型",
    "We build a physiological twin — a simulated body calibrated to your data. Every intervention is tested against the model before it is ever offered to you.":
      "我们构建一个生理孪生体——一具以您的数据校准的模拟身体。每一项干预在提供给您之前，都先在这个模型上验证。",
    "Weeks 6–12": "第 6–12 周",
    "Intervention": "干预",
    "Therapeutics, nutrition, sleep architecture, surgical referral. Each decision is made against your model, never against the population mean.":
      "治疗、营养、睡眠结构、外科转介。每一个决定都以您的模型为依据，而从不以人群均值为依据。",
    "Ongoing": "持续",
    "Continuity": "连续性",
    "Quarterly recalibration, twenty-four-hour physician access, and a standing review of every new finding that touches your genome.":
      "每季度重校准，全天候医生可及，并对每一项涉及您基因组的新发现保持常设复核。",

    /* — telemetry — */
    "04 — Telemetry": "04 — 遥测",
    "Continuous": "连续",
    "A practice that": "一家诊所，",
    "never stops": "从不停止",
    "measuring.": "测量。",
    "The instruments leave the clinic with you. Between visits, 1,400 signals a day arrive at your physician's desk — not at an app you are expected to interpret.":
      "仪器随您离开诊所。在两次就诊之间，每日 1,400 个信号抵达您医生的案头——而不是抵达一个需要您自行解读的应用。",
    "Cardiac": "心脏",
    "Metabolic": "代谢",
    "Neural": "神经",
    "Lead II · 500 Hz": "导联 II · 500 Hz",
    "Live · member 0192": "实时 · 会员 0192",
    "Zürich": "苏黎世",
    "Resting rate": "静息心率",
    "Variability": "变异性",
    "Saturation": "血氧饱和度",
    "Pressure": "血压",
    "Signal quality 99.4%": "信号质量 99.4%",
    "Open record": "查看档案",

    /* — outcomes — */
    "05 — Outcomes": "05 — 结果",
    "Cohort 2029–2035": "队列 2029–2035",
    "The result of measuring properly is not more data. It is": "正确测量的结果不是更多数据，而是",
    "time.": "时间。",
    "members": "位会员",
    "By referral": "仅接受转介",
    "Forty new members a year. Never more.": "每年四十位新会员。绝不再多。",
    "Imaging": "影像",
    "Sub-cellular resolution, read twice.": "亚细胞分辨率，双重阅片。",
    "Earlier detection": "更早发现",
    "Versus standard annual care, cohort 2029–2035.": "对比标准年度诊疗，队列 2029–2035。",
    "hours": "小时",
    "Physician access": "医生直通",
    "Direct line. No triage, no queue.": "直线联系。无分诊，无排队。",
    "Figures drawn from internal longitudinal records. Outcomes are individual; no clinical result is guaranteed or implied.":
      "数据取自内部纵向记录。结果因人而异；不保证、亦不暗示任何临床结果。",

    /* — journal — */
    "06 — Journal": "06 — 期刊",
    "All entries": "全部",
    "Research": "研究",
    "8 min": "8 分钟",
    "On the arithmetic of early detection": "论早期发现的算术",
    "March 2036": "2036 年 3 月",
    "Read": "阅读",
    "Why we refuse to scale": "我们为何拒绝规模化",
    "January 2036": "2036 年 1 月",
    "5 min": "5 分钟",
    "12 min": "12 分钟",
    "The physiology of a single day": "单日的生理学",
    "November 2035": "2035 年 11 月",
    "From the membership": "来自会员",
    "Eleven years of annual physicals had walked past it. Singularity found it in the first":
      "十一年的年度体检都错过了它。Singularity 在最初的",
    "four days.": "四天里发现了它。",
    "Member 0141 · 44 · Joined 2034": "会员 0141 · 44 岁 · 2034 年加入",

    /* — membership — */
    "07 — Membership": "07 — 会员",
    "Request an": "申请一次",
    "introduction.": "引荐。",
    "We accept forty members a year. Introductions are made by an existing member or by your physician — never by application alone.":
      "我们每年接纳四十位会员。引荐来自现有会员或您的医生——从不单凭申请。",
    "Four days in residence, Zürich or Shanghai": "苏黎世或上海的四天驻留",
    "A single named physician for the duration": "全程由一位具名医生负责",
    "No insurance, no billing department, no queue": "不接受保险，无收费部门，无排队",
    "Shanghai": "上海",
    "New York": "纽约",
    "Email address": "电子邮箱",
    "Referred by — optional": "引荐人 — 选填",
    "Submit request": "提交申请",
    "Reply within": "回复时间",
    "two business days": "两个工作日之内",
    "This form is a request for contact, not a medical intake. No clinical information should be submitted here.":
      "此表单仅用于建立联系，并非医疗问诊。请勿在此提交任何临床信息。",

    /* — footer — */
    "A private medical practice built on total-resolution diagnostics. By referral only.":
      "一家以全分辨诊断为基石的私人医疗诊所。仅接受转介。",
    "8001 Zürich, Switzerland": "8001 苏黎世，瑞士",
    "Office": "行政",
    "Membership": "会员",
    "Physicians": "医生",
    "Residencies": "驻留",
    "Contact": "联系",
    "Legal": "法律",
    "Privacy": "隐私",
    "Terms": "条款",
    "Compliance": "合规",
    "Accessibility": "无障碍",
    "Back to top": "回到顶部",
    "All rights reserved · Made in Zürich": "保留所有权利 · 苏黎世制造"
  };

  /* Paragraphs whose English is split into individually animated word spans.
     They cannot be translated word-by-word into Chinese, so the whole
     block is swapped in one go. Key = normalised full paragraph. */
  var BLOCK = {
    "Medicine has spent a century describing the average patient. We were built to resolve the individual — one body, measured without interruption, understood without remainder.":
      "医学用了一个世纪，来描述“平均”的病人。我们为分辨个体而生——一具身体，不间断地测量，无剩余地理解。"
  };

  /* Attributes (aria-labels, placeholders) */
  var ATTR = {
    "Open menu": "打开菜单",
    "Close menu": "关闭菜单",
    "Research affiliations": "研究机构",
    "Member name or physician": "会员姓名或医生姓名"
  };

  /* ---------------------------------------------------------
     2. Engine
     --------------------------------------------------------- */

  var lang = "en";
  var originals = new Map();       /* text node -> original value      */
  var blockOriginals = new Map();  /* element  -> original innerHTML   */
  var attrOriginals = new Map();   /* element  -> {name: value}        */
  var observer = null;
  var rootEl = null;

  function norm(s) {
    return String(s)
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  }

  function keyOf(nodeValue) {
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(nodeValue);
    if (!m) return null;
    var key = norm(m[2]);
    if (!key) return null;
    return { lead: m[1], key: key, tail: m[3] };
  }

  var CJK_RE = /[\u2E80-\u303F\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]/;

  function translateValue(nodeValue) {
    var k = keyOf(nodeValue);
    if (!k) return null;
    var zh = TEXT[k.key];
    if (zh === undefined) return null;
    /* A space next to Chinese text is always spurious: it comes from the
       Latin word spacing in the original markup. Spaces next to Latin or
       symbols (e.g. "· 11 位医生") are preserved. */
    var lead = k.lead;
    var tail = k.tail;
    if (CJK_RE.test(zh.charAt(0))) lead = "";
    if (CJK_RE.test(zh.charAt(zh.length - 1))) tail = "";
    return lead + zh + tail;
  }

  /* --- blocks --- */
  /* The word-by-word headings are built from adjacent inline-block spans
     with no whitespace between them, so textContent runs the words
     together. Rebuild the sentence by joining each child on a space. */
  function blockKey(el) {
    if (!el.children.length) return norm(el.textContent);
    var parts = [];
    for (var i = 0; i < el.children.length; i++) {
      var t = el.children[i].textContent;
      t = t.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
      t = t.replace(/\s+/g, " ").trim();
      if (t) parts.push(t);
    }
    return parts.join(" ");
  }

  function applyBlocks(scope) {
    var els = scope.querySelectorAll("p, h1, h2, h3, blockquote, span, div");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length === 0) continue;
      var key = blockKey(el);
      if (!key || BLOCK[key] === undefined) continue;
      /* skip parents that merely contain a block element */
      if (el.querySelector("[data-i18n-block]")) continue;
      if (el.getAttribute("data-i18n-block") === key) continue;
      if (!blockOriginals.has(el)) blockOriginals.set(el, el.innerHTML);
      el.setAttribute("data-i18n-block", key);
      el.textContent = BLOCK[key];
    }
    /* the scope itself may be the block (mutation on the element) */
    if (scope.nodeType === 1 && scope.children.length) {
      var k2 = blockKey(scope);
      if (BLOCK[k2] !== undefined && !scope.getAttribute("data-i18n-block")) {
        if (!blockOriginals.has(scope)) blockOriginals.set(scope, scope.innerHTML);
        scope.setAttribute("data-i18n-block", k2);
        scope.textContent = BLOCK[k2];
      }
    }
  }

  function refreshBlock(el) {
    var key = el.getAttribute("data-i18n-block");
    if (!key || BLOCK[key] === undefined) return;
    if (el.textContent !== BLOCK[key]) el.textContent = BLOCK[key];
  }

  /* --- text nodes --- */
  function translateText(scope) {
    if (!scope) return;
    var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") {
          return NodeFilter.FILTER_REJECT;
        }
        if (p.closest && p.closest("[data-i18n-block]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      var out = translateValue(n.nodeValue);
      if (out !== null && out !== n.nodeValue) {
        if (!originals.has(n)) originals.set(n, n.nodeValue);
        n.nodeValue = out;
      }
    }
  }

  /* --- attributes --- */
  function translateAttrs(scope) {
    if (!scope.querySelectorAll) return;
    var els = scope.querySelectorAll("[aria-label], [placeholder], [title]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      ["aria-label", "placeholder", "title"].forEach(function (name) {
        var v = el.getAttribute(name);
        if (v === null) return;
        var k = keyOf(v);
        if (!k) return;
        var zh = ATTR[k.key];
        if (zh === undefined) return;
        var store = attrOriginals.get(el);
        if (!store) {
          store = {};
          attrOriginals.set(el, store);
        }
        if (!(name in store)) store[name] = v;
        el.setAttribute(name, k.lead + zh + k.tail);
      });
    }
  }

  /* --- restore --- */
  function restoreAll() {
    blockOriginals.forEach(function (html, el) {
      el.innerHTML = html;
      el.removeAttribute("data-i18n-block");
    });
    blockOriginals.clear();

    originals.forEach(function (value, node) {
      try {
        node.nodeValue = value;
      } catch (e) {
        /* node detached — harmless */
      }
    });
    originals.clear();

    attrOriginals.forEach(function (store, el) {
      Object.keys(store).forEach(function (name) {
        el.setAttribute(name, store[name]);
      });
    });
    attrOriginals.clear();
  }

  /* --- meta --- */
  function updateMeta() {
    var m = META[lang] || META.en;
    document.title = m.title;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute("content", m.desc);
  }

  /* --- full pass --- */
  function apply() {
    if (!rootEl) return;
    if (lang === "zh") {
      applyBlocks(rootEl);
      translateText(rootEl);
      translateAttrs(rootEl);
    } else {
      restoreAll();
    }
    updateMeta();
  }

  /* --- keep React re-renders translated --- */
  function onMutations(mutations) {
    if (lang !== "zh") return;
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i];

      if (m.type === "characterData") {
        var out = translateValue(m.target.nodeValue);
        if (out !== null && out !== m.target.nodeValue) {
          if (!originals.has(m.target)) originals.set(m.target, m.target.nodeValue);
          m.target.nodeValue = out;
        }
        continue;
      }

      if (m.type !== "childList") continue;

      for (var j = 0; j < m.addedNodes.length; j++) {
        var node = m.addedNodes[j];
        if (node.nodeType === 1) {
          applyBlocks(node);
          translateText(node);
          translateAttrs(node);
        } else if (node.nodeType === 3) {
          var t = translateValue(node.nodeValue);
          if (t !== null && t !== node.nodeValue) {
            if (!originals.has(node)) originals.set(node, node.nodeValue);
            node.nodeValue = t;
          }
        }
      }

      var host = m.target.nodeType === 1 ? m.target : m.target.parentNode;
      if (host && host.closest) {
        var blk = host.closest("[data-i18n-block]");
        if (blk) refreshBlock(blk);
      }
    }
  }

  /* ---------------------------------------------------------
     3. Language switch UI
     --------------------------------------------------------- */

  var LABELS = { en: "EN", zh: "中文" };

  function buildSwitch() {
    if (document.querySelector(".sg-lang")) return;
    var wrap = document.createElement("div");
    wrap.className = "sg-lang";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Language / 语言");

    ["en", "zh"].forEach(function (code) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = LABELS[code];
      b.setAttribute("data-l", code);
      b.setAttribute("aria-pressed", String(code === lang));
      b.addEventListener("click", function () {
        setLang(code);
      });
      wrap.appendChild(b);
    });

    document.body.appendChild(wrap);
  }

  function syncSwitch() {
    var btns = document.querySelectorAll(".sg-lang button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", String(btns[i].getAttribute("data-l") === lang));
    }
  }

  /* ---------------------------------------------------------
     4. Boot
     --------------------------------------------------------- */

  function setLang(next, opts) {
    if (next !== "en" && next !== "zh") next = "en";
    lang = next;
    document.documentElement.setAttribute("lang", next === "zh" ? "zh-Hans" : "en");
    document.documentElement.setAttribute("data-lang", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
    observe(next === "zh");
    apply();
    syncSwitch();
    if (!(opts && opts.silent)) {
      document.dispatchEvent(
        new CustomEvent("singularity:lang", { detail: { lang: next } })
      );
    }
  }

  function observe(on) {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (!on || !rootEl) return;
    observer = new MutationObserver(onMutations);
    observer.observe(rootEl, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  function initialLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "zh" || q === "en") return q;
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "zh" || saved === "en") return saved;
    } catch (e) {}
    /* no explicit choice yet — follow the browser for Chinese readers */
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    if (/^zh/i.test(nav)) return "zh";
    return "en";
  }

  function boot() {
    rootEl = document.getElementById("root");
    var want = initialLang();

    var tries = 0;
    (function wait() {
      if (!rootEl) rootEl = document.getElementById("root");
      if ((rootEl && rootEl.childElementCount > 0) || tries++ > 240) {
        document.documentElement.setAttribute(
          "data-lang",
          want === "zh" ? "zh" : "en"
        );
        document.documentElement.setAttribute(
          "lang",
          want === "zh" ? "zh-Hans" : "en"
        );
        buildSwitch();
        lang = "en"; /* start from a clean English baseline */
        setLang(want, { silent: true });
        return;
      }
      requestAnimationFrame(wait);
    })();
  }

  /* Testing hook: ?y=2400 scrolls the page once animations are live */
  var scrollTo = new URLSearchParams(location.search).get("y");
  if (scrollTo) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        window.scrollTo(0, parseInt(scrollTo, 10) || 0);
      }, 600);
    });
  }

  /* Preview hook: ?static=1 freezes entrance animations so every section
     is visible at once (useful for proof-reading the translation). */
  if (new URLSearchParams(location.search).get("static") === "1") {
    var st = document.createElement("style");
    st.textContent =
      ".sg-static *, .sg-static *::before, .sg-static *::after{opacity:1!important;" +
      "transform:none!important;transition:none!important;animation:none!important}" +
      /* the intro curtain and scroll-progress rule are overlays, not content */
      ".sg-static [class*='z-[90]'],.sg-static [class*='z-[75]']{display:none!important}";
    document.head.appendChild(st);
    document.documentElement.classList.add("sg-static");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
