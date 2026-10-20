/* ============================================================================
   Singularity — UI v2 behaviour layer
   No framework, no build step. Everything is progressive: markup and copy are
   in the HTML, this file only adds language, motion and state feedback.
   ========================================================================== */

(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ══════════════════════════════════════════════════════════════════════
     1. Copy
     ══════════════════════════════════════════════════════════════════════ */

  var META = {
    en: {
      title: "Singularity — The End of Approximation",
      desc: "Singularity is a private medical practice built on total-resolution diagnostics: whole-genome sequencing, continuous physiology, and one physician accountable for every variable in your body."
    },
    zh: {
      title: "Singularity — 排除不确定性",
      desc: "Singularity 是一家以全分辨诊断为基石的私人医疗诊所：全基因组测序、连续生理监测，以及一位对您身体中每一个变量负责的医生。"
    }
  };

  var DICT = {
    en: {
      "a11y.skip": "Skip to content",
      "a11y.home": "Singularity — home",
      "a11y.primaryNav": "Primary",
      "a11y.mobileNav": "Sections",
      "a11y.lang": "Language",
      "a11y.openMenu": "Open menu",
      "a11y.tabs": "Signal source",
      "a11y.affiliations": "Research affiliations",
      "a11y.footerNav": "Footer",

      "nav.science": "Science",
      "nav.instruments": "Instruments",
      "nav.protocol": "Protocol",
      "nav.journal": "Journal",

      "cta.request": "Request an introduction",
      "cta.protocol": "See the protocol",

      "hero.eyebrow": "Private medical practice — Est. 2031",
      "hero.title": "The end of<br /><em>approximation.</em>",
      "hero.deck": "Singularity is a private medical practice built on total-resolution diagnostics: whole-genome sequencing, continuous physiology, and one physician accountable for every variable in your body.",
      "hero.meta": "By referral only · 240 members · 11 physicians",
      "hero.stat1.label": "Imaging resolution",
      "hero.stat2.label": "Sequenced per member",
      "hero.stat3.label": "Physiological latency",
      "plate.title": "Plate 01 · Event horizon",

      "s1.eyebrow": "Doctrine",
      "s1.meta": "Zürich · MMXXXI",
      "s1.statement": "Medicine has spent a century describing the average patient. We were built to resolve the individual — one body, measured without interruption, understood without remainder.",
      "s1.c1.label": "Definition",
      "s1.c1.body": "A singularity is the point at which a function stops behaving incrementally — where resolution becomes absolute rather than proportional.",
      "s1.c1.note": "We took the word as an obligation, not a metaphor.",
      "s1.c2.label": "Practice",
      "s1.c2.body": "Founded 2031. Eleven physicians. Two hundred and forty members. No insurance accepted, no volume model, no queue.",
      "s1.c3.label": "Mandate",
      "s1.c3.body": "To know one body as completely as medicine currently allows — and then to keep knowing it.",
      "s1.c3.role": "Chief physician",

      "s2.eyebrow": "Instruments",
      "s2.meta": "Four systems",
      "s2.title": "Four instruments.<br /><em>One body.</em>",
      "s2.note": "None of this is a device subscription. Each instrument exists to remove one specific kind of uncertainty — and to leave nothing that requires your interpretation.",
      "s2.c1.title": "Genome, whole",
      "s2.c1.body": "3.2 gigabases read at 60× depth, re-annotated each quarter against the full literature and every prior report we hold on you.",
      "s2.c1.meta": "3.2 Gb · 60× depth",
      "s2.c2.title": "Physiology, continuous",
      "s2.c2.body": "A clinical-grade array reads 1,400 signals a day. Your physician sees the deviation long before you would feel it.",
      "s2.c2.meta": "1,400 signals · daily",
      "s2.c3.title": "Imaging, sub-cellular",
      "s2.c3.body": "0.4 μm magnetic and opto-acoustic imaging, read independently by two radiologists and one model, then reconciled.",
      "s2.c3.meta": "0.4 μm · sub-cellular",
      "s2.c4.title": "Reasoning, clinical",
      "s2.c4.body": "One physician holds the entire record. Not a portal, not a dashboard — a person who knows the shape of your baseline.",
      "s2.c4.meta": "1 physician · 22 members",

      "s3.eyebrow": "The protocol",
      "s3.meta": "12 weeks",
      "s3.title": "Twelve weeks<br /><em>to a baseline.</em>",
      "s3.note": "Membership begins with measurement, not with treatment. We do not accept a member we cannot first describe completely.",
      "s3.spec1": "Residency",
      "s3.spec1.v": "4 days",
      "s3.spec2": "Data points",
      "s3.spec2.v": "2.8 M",
      "s3.spec3": "Recalibration",
      "s3.spec3.v": "Quarterly",
      "s3.st1.when": "Days 1–4",
      "s3.st1.title": "Baseline",
      "s3.st1.body": "Four days in residence at Zürich or Shanghai. Forty blood draws across one circadian cycle, an uninterrupted imaging session, and a full neurocognitive map.",
      "s3.st2.when": "Weeks 2–5",
      "s3.st2.title": "Model",
      "s3.st2.body": "We build a physiological twin — a simulated body calibrated to your data. Every intervention is tested against the model before it is ever offered to you.",
      "s3.st3.when": "Weeks 6–12",
      "s3.st3.title": "Intervention",
      "s3.st3.body": "Therapeutics, nutrition, sleep architecture, surgical referral. Each decision is made against your model, never against the population mean.",
      "s3.st4.when": "Ongoing",
      "s3.st4.title": "Continuity",
      "s3.st4.body": "Quarterly recalibration, twenty-four-hour physician access, and a standing review of every new finding that touches your genome.",

      "s4.eyebrow": "Telemetry",
      "s4.meta": "Continuous",
      "s4.title": "A practice that<br /><em>never stops measuring.</em>",
      "s4.note": "The instruments leave the clinic with you. Between visits, 1,400 signals a day arrive at your physician’s desk — not at an app you are expected to interpret.",
      "s4.tab1": "Cardiac",
      "s4.tab2": "Metabolic",
      "s4.tab3": "Neural",
      "s4.live": "Live · member 0192",
      "s4.loc": "Zürich",
      "s4.quality": "Signal quality 99.4%",
      "s4.open": "Open record",

      "s5.eyebrow": "Outcomes",
      "s5.meta": "Cohort 2029–2035",
      "s5.title": "The result of measuring properly is not more data. It is <em>time.</em>",
      "s5.u1": "members",
      "s5.l1": "By referral",
      "s5.n1": "Forty new members a year. Never more.",
      "s5.l2": "Imaging",
      "s5.n2": "Sub-cellular resolution, read twice.",
      "s5.l3": "Earlier detection",
      "s5.n3": "Versus standard annual care, cohort 2029–2035.",
      "s5.u4": "hours",
      "s5.l4": "Physician access",
      "s5.n4": "Direct line. No triage, no queue.",
      "s5.disclaimer": "Figures drawn from internal longitudinal records. Outcomes are individual; no clinical result is guaranteed or implied.",

      "s6.eyebrow": "Journal",
      "s6.all": "All entries",
      "s6.read": "Read",
      "s6.c1.cat": "Research",
      "s6.c1.time": "8 min",
      "s6.c1.title": "On the arithmetic of early detection",
      "s6.c1.date": "March 2036",
      "s6.c2.cat": "Practice",
      "s6.c2.time": "5 min",
      "s6.c2.title": "Why we refuse to scale",
      "s6.c2.date": "January 2036",
      "s6.c3.cat": "Protocol",
      "s6.c3.time": "12 min",
      "s6.c3.title": "The physiology of a single day",
      "s6.c3.date": "November 2035",

      "q.kicker": "From the membership",
      "q.text": "“Eleven years of annual physicals had walked past it. Singularity found it in the first <em>four days.</em>”",
      "q.meta": "Member 0141 · 44 · Joined 2034",

      "s7.eyebrow": "Membership",
      "s7.meta": "By referral",
      "s7.title": "Request an<br /><em>introduction.</em>",
      "s7.note": "We accept forty members a year. Introductions are made by an existing member or by your physician — never by application alone.",
      "s7.p1": "Four days in residence, Zürich or Shanghai",
      "s7.p2": "A single named physician for the duration",
      "s7.p3": "No insurance, no billing department, no queue",
      "s7.cities": "Zürich · Shanghai · New York",
      "s7.f1": "Email address",
      "s7.f1.ph": "you@domain.com",
      "s7.f2": "Referred by — optional",
      "s7.f2.ph": "Member name or physician",
      "s7.submit": "Submit request",
      "s7.submit.busy": "Sending",
      "s7.submit.done": "Request received",
      "s7.reply": "Reply within",
      "s7.reply.v": "two business days",
      "s7.disclaimer": "This form is a request for contact, not a medical intake. No clinical information should be submitted here.",
      "s7.err.required": "An email address is required.",
      "s7.err.email": "Enter an address we can reply to, such as you@domain.com.",
      "s7.ok": "Thank you. Your request has reached the Zürich office — we will reply within two business days.",
      "s7.fail": "The request could not be sent. Please try again, or write to office@singularity.health.",

      "footer.studio": "Zürich · Shanghai · New York",
      "footer.desc": "A private medical practice built on total-resolution diagnostics. By referral only.",
      "footer.addr1": "Bahnhofstrasse 42",
      "footer.addr2": "8001 Zürich, Switzerland",
      "footer.h1": "Practice",
      "footer.h2": "Access",
      "footer.h3": "Legal",
      "footer.membership": "Membership",
      "footer.physicians": "Physicians",
      "footer.residencies": "Residencies",
      "footer.contact": "Contact",
      "footer.privacy": "Privacy",
      "footer.terms": "Terms",
      "footer.compliance": "Compliance",
      "footer.access": "Accessibility",
      "footer.entity": "Singularity Medical AG",
      "footer.backTop": "Back to top",
      "footer.rights": "All rights reserved · Made in Zürich"
    },

    zh: {
      "a11y.skip": "跳至主要内容",
      "a11y.home": "Singularity — 首页",
      "a11y.primaryNav": "主导航",
      "a11y.mobileNav": "页面导航",
      "a11y.lang": "语言",
      "a11y.openMenu": "打开菜单",
      "a11y.tabs": "信号来源",
      "a11y.affiliations": "研究机构",
      "a11y.footerNav": "页脚导航",

      "nav.science": "科学",
      "nav.instruments": "仪器",
      "nav.protocol": "流程",
      "nav.journal": "期刊",

      "cta.request": "申请引荐",
      "cta.protocol": "查看诊疗流程",

      "hero.eyebrow": "私人医疗诊所 — 创立于 2031",
      "hero.title": "排除<br /><em>不确定性。</em>",
      "hero.deck": "Singularity 是一家以全分辨诊断为基石的私人医疗诊所：全基因组测序、连续生理监测，以及一位对您身体中每一个变量负责的医生。",
      "hero.meta": "仅接受转介 · 240 位会员 · 11 位医生",
      "hero.stat1.label": "成像分辨率",
      "hero.stat2.label": "单人测序量",
      "hero.stat3.label": "生理信号延迟",
      "plate.title": "图版 01 · 事件视界",

      "s1.eyebrow": "信条",
      "s1.meta": "苏黎世 · MMXXXI",
      "s1.statement": "医学用了一个世纪来描述“平均”的病人。我们为分辨个体而生——一具身体，不间断地测量，无剩余地理解。",
      "s1.c1.label": "定义",
      "s1.c1.body": "奇点，是函数不再渐进变化的那个点——在那里，分辨率成为绝对，而不再是比例。",
      "s1.c1.note": "我们把这个词当作一种义务，而非一个比喻。",
      "s1.c2.label": "诊所",
      "s1.c2.body": "创立于 2031 年。十一位医生，二百四十位会员。不接受保险，不做规模，不设排队。",
      "s1.c3.label": "使命",
      "s1.c3.body": "以医学今日之所能，尽可能完整地了解一具身体——并且持续地了解下去。",
      "s1.c3.role": "首席医生",

      "s2.eyebrow": "仪器",
      "s2.meta": "四套系统",
      "s2.title": "四台仪器。<br /><em>一具身体。</em>",
      "s2.note": "这里没有设备订阅。每一台仪器，都只为消除一种特定的不确定性——并且不留下任何需要您自行解读的东西。",
      "s2.c1.title": "基因组 · 完整",
      "s2.c1.body": "以 60× 深度读取 32 亿碱基，每季度对照全部文献与我们持有的历次报告，重新注释。",
      "s2.c1.meta": "3.2 Gb · 60× 深度",
      "s2.c2.title": "生理 · 连续",
      "s2.c2.body": "临床级阵列每日读取 1,400 个信号。在您尚不能感知之前，您的医生已经看见了那个偏移。",
      "s2.c2.meta": "每日 1,400 个信号",
      "s2.c3.title": "影像 · 亚细胞",
      "s2.c3.body": "0.4 μm 磁成像与光声成像，由两位放射科医生与一个模型独立阅片，再行校对。",
      "s2.c3.meta": "0.4 μm · 亚细胞",
      "s2.c4.title": "判断 · 临床",
      "s2.c4.body": "一位医生持有完整档案。不是门户，不是仪表盘——而是一个人，熟悉您基线的形状。",
      "s2.c4.meta": "1 位医生 · 22 位会员",

      "s3.eyebrow": "流程",
      "s3.meta": "12 周",
      "s3.title": "十二周<br /><em>抵达基线。</em>",
      "s3.note": "会员身份始于测量，而非治疗。若无法先完整描述一位会员，我们不会接纳他。",
      "s3.spec1": "驻留",
      "s3.spec1.v": "4 天",
      "s3.spec2": "数据点",
      "s3.spec2.v": "280 万",
      "s3.spec3": "重校准",
      "s3.spec3.v": "每季度",
      "s3.st1.when": "第 1–4 天",
      "s3.st1.title": "基线",
      "s3.st1.body": "在苏黎世或上海驻留四天。跨越一个昼夜节律的四十次采血，一次不间断的成像，以及完整的神经认知图谱。",
      "s3.st2.when": "第 2–5 周",
      "s3.st2.title": "模型",
      "s3.st2.body": "我们构建一个生理孪生体——一具以您的数据校准的模拟身体。每一项干预在提供给您之前，都先在这个模型上验证。",
      "s3.st3.when": "第 6–12 周",
      "s3.st3.title": "干预",
      "s3.st3.body": "治疗、营养、睡眠结构、外科转介。每一个决定都以您的模型为依据，而从不以人群均值为依据。",
      "s3.st4.when": "持续",
      "s3.st4.title": "连续性",
      "s3.st4.body": "每季度重校准，全天候医生可及，并对每一项涉及您基因组的新发现保持常设复核。",

      "s4.eyebrow": "遥测",
      "s4.meta": "连续",
      "s4.title": "一家诊所，<br /><em>从不停止测量。</em>",
      "s4.note": "仪器随您离开诊所。在两次就诊之间，每日 1,400 个信号抵达您医生的案头——而不是抵达一个需要您自行解读的应用。",
      "s4.tab1": "心脏",
      "s4.tab2": "代谢",
      "s4.tab3": "神经",
      "s4.live": "实时 · 会员 0192",
      "s4.loc": "苏黎世",
      "s4.quality": "信号质量 99.4%",
      "s4.open": "查看档案",

      "s5.eyebrow": "结果",
      "s5.meta": "队列 2029–2035",
      "s5.title": "正确测量的结果，不是更多数据，而是<em>时间。</em>",
      "s5.u1": "位会员",
      "s5.l1": "仅接受转介",
      "s5.n1": "每年四十位新会员。绝不再多。",
      "s5.l2": "影像",
      "s5.n2": "亚细胞分辨率，双重阅片。",
      "s5.l3": "更早发现",
      "s5.n3": "对比标准年度诊疗，队列 2029–2035。",
      "s5.u4": "小时",
      "s5.l4": "医生直通",
      "s5.n4": "直线联系。无分诊，无排队。",
      "s5.disclaimer": "数据取自内部纵向记录。结果因人而异；不保证、亦不暗示任何临床结果。",

      "s6.eyebrow": "期刊",
      "s6.all": "全部",
      "s6.read": "阅读",
      "s6.c1.cat": "研究",
      "s6.c1.time": "8 分钟",
      "s6.c1.title": "论早期发现的算术",
      "s6.c1.date": "2036 年 3 月",
      "s6.c2.cat": "诊所",
      "s6.c2.time": "5 分钟",
      "s6.c2.title": "我们为何拒绝规模化",
      "s6.c2.date": "2036 年 1 月",
      "s6.c3.cat": "流程",
      "s6.c3.time": "12 分钟",
      "s6.c3.title": "单日的生理学",
      "s6.c3.date": "2035 年 11 月",

      "q.kicker": "来自会员",
      "q.text": "“十一年的年度体检都错过了它。Singularity 在最初的<em>四天</em>里发现了它。”",
      "q.meta": "会员 0141 · 44 岁 · 2034 年加入",

      "s7.eyebrow": "会员",
      "s7.meta": "仅接受转介",
      "s7.title": "申请一次<br /><em>引荐。</em>",
      "s7.note": "我们每年接纳四十位会员。引荐来自现有会员或您的医生——从不单凭申请。",
      "s7.p1": "苏黎世或上海的四天驻留",
      "s7.p2": "全程由一位具名医生负责",
      "s7.p3": "不接受保险，无收费部门，无排队",
      "s7.cities": "苏黎世 · 上海 · 纽约",
      "s7.f1": "电子邮箱",
      "s7.f1.ph": "you@domain.com",
      "s7.f2": "引荐人 — 选填",
      "s7.f2.ph": "会员姓名或医生姓名",
      "s7.submit": "提交申请",
      "s7.submit.busy": "正在发送",
      "s7.submit.done": "已收到",
      "s7.reply": "回复时间",
      "s7.reply.v": "两个工作日之内",
      "s7.disclaimer": "此表单仅用于建立联系，并非医疗问诊。请勿在此提交任何临床信息。",
      "s7.err.required": "请填写电子邮箱。",
      "s7.err.email": "请填写可接收回复的邮箱，例如 you@domain.com。",
      "s7.ok": "谢谢。您的申请已送达苏黎世办公室——我们将在两个工作日内回复。",
      "s7.fail": "发送失败，请重试，或致信 office@singularity.health。",

      "footer.studio": "苏黎世 · 上海 · 纽约",
      "footer.desc": "一家以全分辨诊断为基石的私人医疗诊所。仅接受转介。",
      "footer.addr1": "Bahnhofstrasse 42",
      "footer.addr2": "8001 苏黎世，瑞士",
      "footer.h1": "诊所",
      "footer.h2": "会员通道",
      "footer.h3": "法律",
      "footer.membership": "会员",
      "footer.physicians": "医生",
      "footer.residencies": "驻留",
      "footer.contact": "联系",
      "footer.privacy": "隐私",
      "footer.terms": "条款",
      "footer.compliance": "合规",
      "footer.access": "无障碍",
      "footer.entity": "Singularity Medical AG",
      "footer.backTop": "回到顶部",
      "footer.rights": "保留所有权利 · 苏黎世制造"
    }
  };

  /* Telemetry datasets — labels live here because they change with the tab. */
  var TELEMETRY = {
    cardiac: {
      source: { en: "Lead II · 500 Hz", zh: "导联 II · 500 Hz" },
      metrics: [
        { label: { en: "Resting rate", zh: "静息心率" }, value: "54", unit: "bpm" },
        { label: { en: "Variability", zh: "变异性" }, value: "68", unit: "ms" },
        { label: { en: "Saturation", zh: "血氧饱和度" }, value: "99", unit: "%" },
        { label: { en: "Pressure", zh: "血压" }, value: "112/68", unit: "mmHg" }
      ]
    },
    metabolic: {
      source: { en: "Continuous glucose · 5 min", zh: "连续血糖 · 5 分钟" },
      metrics: [
        { label: { en: "Glucose", zh: "血糖" }, value: "5.1", unit: "mmol/L" },
        { label: { en: "VO₂ max", zh: "最大摄氧量" }, value: "51.2", unit: "ml/kg" },
        { label: { en: "Insulin sens.", zh: "胰岛素敏感度" }, value: "8.4", unit: "idx" },
        { label: { en: "Lactate", zh: "乳酸" }, value: "0.9", unit: "mmol/L" }
      ]
    },
    neural: {
      source: { en: "Polysomnography · 250 Hz", zh: "多导睡眠 · 250 Hz" },
      metrics: [
        { label: { en: "Sleep efficiency", zh: "睡眠效率" }, value: "94", unit: "%" },
        { label: { en: "Deep sleep", zh: "深睡时长" }, value: { en: "1h 48", zh: "1 小时 48" }, unit: { en: "", zh: "分" } },
        { label: { en: "REM share", zh: "REM 占比" }, value: "22", unit: "%" },
        { label: { en: "Cognitive load", zh: "认知负荷" }, value: "0.31", unit: "idx" }
      ]
    }
  };

  var lang = "en";

  function t(key) {
    var pack = DICT[lang] || DICT.en;
    return pack[key] !== undefined ? pack[key] : DICT.en[key];
  }

  function pick(v) {
    if (v && typeof v === "object") return v[lang] || v.en;
    return v;
  }

  /* ══════════════════════════════════════════════════════════════════════
     2. Language
     ══════════════════════════════════════════════════════════════════════ */

  /* v2 key: the previous key could hold a value written by the old
     auto-detect, which would keep resurrecting Chinese. */
  var STORE = "singularity.lang.v2";
  var LEGACY_STORE = "singularity.lang";

  /* Returns { lang, explicit }. "explicit" means the visitor (or the URL)
     asked for that language, so only then is it written back to storage. */
  function resolveLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "zh" || q === "en") return { lang: q, explicit: true };

    try {
      var s = localStorage.getItem(STORE);
      if (s === "zh" || s === "en") return { lang: s, explicit: true };
      localStorage.removeItem(LEGACY_STORE);
    } catch (e) {}

    /* English by default: the site never opens in a language the visitor
       did not ask for. Chinese is opt-in via the header switch or ?lang=zh. */
    return { lang: "en", explicit: false };
  }

  function applyLang(next, persist) {
    lang = next;
    root.setAttribute("lang", next === "zh" ? "zh-CN" : "en");
    root.setAttribute("data-lang", next);

    doc.title = META[next].title;
    var desc = doc.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", META[next].desc);

    each("[data-i18n]", function (el) {
      var key = el.getAttribute("data-i18n");
      var val = t(key);
      if (val !== undefined) el.textContent = val;
    });

    each("[data-i18n-html]", function (el) {
      var key = el.getAttribute("data-i18n-html");
      var val = t(key);
      if (val !== undefined) el.innerHTML = val;
    });

    each("[data-i18n-attr]", function (el) {
      var spec = el.getAttribute("data-i18n-attr").split("|");
      var val = t(spec[1]);
      if (val !== undefined) el.setAttribute(spec[0], val);
    });

    each("[data-lang-btn]", function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang-btn") === next));
    });

    /* Copy that is rebuilt by script must be re-derived after a swap. */
    initLines();
    splitStatement();
    renderTelemetry(currentTab);
    syncMenuLabel();

    if (persist) {
      try {
        localStorage.setItem(STORE, next);
      } catch (e) {}
    }
  }

  function each(sel, fn) {
    var list = doc.querySelectorAll(sel);
    for (var i = 0; i < list.length; i++) fn(list[i], i);
  }

  /* ══════════════════════════════════════════════════════════════════════
     3. Header: scroll state + inverted theme over dark sections
     ══════════════════════════════════════════════════════════════════════ */

  var header = doc.querySelector("[data-header]");
  var darkSections = doc.querySelectorAll('[data-theme="dark"]');

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 6);

    var probe = header.offsetHeight * 0.55 + 1;
    var isDark = false;
    for (var i = 0; i < darkSections.length; i++) {
      var r = darkSections[i].getBoundingClientRect();
      if (r.top <= probe && r.bottom >= probe) {
        isDark = true;
        break;
      }
    }
    header.setAttribute("data-on-dark", isDark ? "true" : "false");

    /* On the first screen no section is current yet — clear the marker so
       the last-visited section does not stay underlined at the top. */
    if (window.scrollY < window.innerHeight * 0.55) {
      each("[data-nav]", function (a) {
        a.removeAttribute("aria-current");
      });
    }
  }

  /* ══════════════════════════════════════════════════════════════════════
     4. Mobile menu
     ══════════════════════════════════════════════════════════════════════ */

  var menu = doc.querySelector("[data-menu]");
  var menuBtn = doc.querySelector("[data-menu-toggle]");
  var menuLabel = menuBtn ? menuBtn.querySelector(".sr-only") : null;

  function syncMenuLabel() {
    if (!menuLabel) return;
    var open = menuBtn.getAttribute("aria-expanded") === "true";
    menuLabel.textContent = open
      ? lang === "zh" ? "关闭菜单" : "Close menu"
      : t("a11y.openMenu");
  }

  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    doc.body.classList.toggle("is-locked", open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(function () {
        menu.classList.add("is-open");
      });
      var first = menu.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    } else {
      menu.classList.remove("is-open");
      window.setTimeout(function () {
        menu.hidden = true;
      }, 260);
    }
    syncMenuLabel();
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
  }

  if (menu) {
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }

  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuBtn && menuBtn.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuBtn.focus();
    }
    /* focus trap while the menu is open */
    if (e.key === "Tab" && menu && !menu.hidden) {
      var f = menu.querySelectorAll("a, button");
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && doc.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  var mq = window.matchMedia("(min-width: 901px)");
  var onMq = function (e) {
    if (e.matches && menuBtn && menuBtn.getAttribute("aria-expanded") === "true") setMenu(false);
  };
  if (mq.addEventListener) mq.addEventListener("change", onMq);
  else if (mq.addListener) mq.addListener(onMq);

  /* ══════════════════════════════════════════════════════════════════════
     5. Reveals, word-by-word statement, counters
     ══════════════════════════════════════════════════════════════════════ */

  var revealIO = "IntersectionObserver" in window
    ? new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            revealIO.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
      )
    : null;

  each(".reveal, .reveal-lines", function (el) {
    if (revealIO) revealIO.observe(el);
    else el.classList.add("is-in");
  });

  /* Split multi-line display headings into lines so each line can wipe in
     on its own. Runs after every language swap because the dictionary
     replaces the whole innerHTML (with <br> separators). */
  function initLines() {
    each("[data-lines]", function (el) {
      var html = el.innerHTML;
      var parts = html.split(/<br\s*\/?>/i);
      var base = parseInt(el.getAttribute("data-line-delay") || "0", 10) || 0;
      var out = "";
      for (var i = 0; i < parts.length; i++) {
        out +=
          '<span class="line" style="--ld:' +
          (base + i * 90) +
          'ms">' +
          parts[i].trim() +
          "</span>";
      }
      el.innerHTML = out;
    });
  }

  /* Split the doctrine statement into words once, and again after a
     language swap (the dictionary replaces the whole node). */
  function splitStatement() {
    var el = doc.querySelector("[data-reveal-words]");
    if (!el) return;

    var text = (lang === "zh" ? DICT.zh : DICT.en)["s1.statement"] || el.textContent;
    var parts;
    var glue;

    if (lang === "zh") {
      /* Chinese is unspaced: animate clause by clause at punctuation. */
      parts = text.match(/[^，。；：、—]+[，。；：、—]?/g) || [text];
      glue = "";
    } else {
      parts = text.split(/\s+/).filter(Boolean);
      glue = " ";
    }

    var out = "";
    for (var i = 0; i < parts.length; i++) {
      if (i) out += glue;
      out += '<span class="w" style="--wd:' + Math.round(i * 24) + 'ms">' + parts[i] + "</span>";
    }

    el.innerHTML = out;

    if (el.classList.contains("is-in") || !revealIO) {
      el.classList.add("is-in");
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          el.classList.add("is-in");
          io.disconnect();
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
    );
    io.observe(el);
  }

  /* Counters */
  function animateCount(el) {
    var to = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    if (isNaN(to)) return;

    if (reduced.matches) {
      el.textContent = to.toFixed(dec);
      return;
    }

    var start = performance.now();
    var dur = 1200;
    function frame(now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = to.toFixed(dec);
    }
    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window) {
    var countIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    each("[data-count]", function (el) {
      countIO.observe(el);
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     6. Hero plate (canvas)
     ══════════════════════════════════════════════════════════════════════ */

  function initPlate() {
    var canvas = doc.querySelector("[data-plate]");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var TAU = Math.PI * 2;
    var INK = [17, 48, 86];   /* 捣蓝色 */
    var ACC = [18, 46, 138];  /* 深海蓝 */
    var SIG = [233, 63, 128]; /* 甜酷粉 */

    var size = 0;
    var dashes = [];
    var ticks = [];
    var visible = true;
    var start = 0;

    /* deterministic pseudo-random so the field is identical on every load */
    var seed = 0;
    function rnd() {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    function angDist(a, b) {
      var d = Math.abs(a - b) % TAU;
      return d > Math.PI ? TAU - d : d;
    }

    /* ink -> accent, so a dash brightens in hue as the scanner reaches it */
    function mix(t) {
      var r = Math.round(INK[0] + (ACC[0] - INK[0]) * t);
      var g = Math.round(INK[1] + (ACC[1] - INK[1]) * t);
      var b = Math.round(INK[2] + (ACC[2] - INK[2]) * t);
      return r + "," + g + "," + b;
    }

    function build() {
      seed = 20261020;
      dashes = [];
      ticks = [];
      var i;
      /* density follows the rendered size so phones do not pay for
         desktop stroke counts */
      var n = Math.max(150, Math.min(460, Math.round(size * 0.92)));
      for (i = 0; i < n; i++) {
        dashes.push({
          u: 0.10 + 0.78 * Math.sqrt(rnd()),
          a: rnd() * TAU,
          len: 1.8 + rnd() * 5.2,
          tilt: (rnd() - 0.5) * 1.05,
          base: 0.15 + rnd() * 0.2,
          ph: rnd() * TAU
        });
      }
      var tn = size < 360 ? 48 : 72;
      for (i = 0; i < tn; i++) ticks.push((i / tn) * TAU);
    }

    function resize() {
      var box = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = Math.max(1, Math.min(box.width, box.height));
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw(reduced.matches ? 0 : (performance.now() - start) / 1000);
    }

    function draw(t) {
      if (!size) return;
      var c = size / 2;
      var R = size * 0.5;
      var sweep = t * 0.5; /* one revolution ≈ 12.5s */

      ctx.clearRect(0, 0, size, size);

      /* 1 · cool wash so the field sits on its own light disc */
      var disc = ctx.createRadialGradient(c, c, R * 0.08, c, c, R * 0.92);
      disc.addColorStop(0, "rgba(145,207,213,0.15)");
      disc.addColorStop(0.55, "rgba(145,207,213,0.06)");
      disc.addColorStop(1, "rgba(145,207,213,0)");
      ctx.fillStyle = disc;
      ctx.beginPath();
      ctx.arc(c, c, R * 0.92, 0, TAU);
      ctx.fill();

      /* 2 · sonar rings travelling out from the centre */
      for (var k = 0; k < 2; k++) {
        var p = (t * 0.19 + k * 0.5) % 1;
        ctx.beginPath();
        ctx.arc(c, c, (0.12 + p * 0.78) * R, 0, TAU);
        ctx.strokeStyle = "rgba(18,46,138," + ((1 - p) * (1 - p) * 0.28).toFixed(3) + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* 3 · outer scale + inner hairline */
      ctx.beginPath();
      ctx.arc(c, c, R * 0.905, 0, TAU);
      ctx.strokeStyle = "rgba(17,48,86,0.28)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(c, c, R * 0.335, 0, TAU);
      ctx.strokeStyle = "rgba(17,48,86,0.08)";
      ctx.stroke();

      /* inner ring carries four focus brackets, like a reticle */
      for (var b = 0; b < 4; b++) {
        var ba = (Math.PI / 2) * b + Math.PI / 4;
        var br = R * 0.335;
        ctx.beginPath();
        ctx.arc(c, c, br, ba - 0.045, ba + 0.045);
        ctx.strokeStyle = "rgba(17,48,86,0.32)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      /* 4 · tick ring, lit as the scanner passes */
      for (var i = 0; i < ticks.length; i++) {
        var ang = ticks[i];
        var long = i % 6 === 0;
        var lit = Math.exp(-Math.pow(angDist(ang, sweep) / 0.5, 2));
        var r0 = R * 0.905;
        var r1 = R * (long ? 0.866 : 0.883);
        ctx.beginPath();
        ctx.moveTo(c + Math.cos(ang) * r1, c + Math.sin(ang) * r1);
        ctx.lineTo(c + Math.cos(ang) * r0, c + Math.sin(ang) * r0);
        ctx.strokeStyle = "rgba(" + (lit > 0.35 ? "18,46,138" : "17,48,86") + "," + (0.12 + lit * 0.5).toFixed(3) + ")";
        ctx.stroke();
      }

      /* 5 · the dash field: each stroke brightens as the beam reaches it,
         and a radial wave lifts a ring of strokes outward every 3.8s */
      var wave = (t * 0.26) % 1;
      var waveR = 0.10 + wave * 0.78;
      for (i = 0; i < dashes.length; i++) {
        var d = dashes[i];
        var glow = Math.exp(-Math.pow(angDist(d.a, sweep) / 0.62, 2));
        var dw = (d.u - waveR) / 0.075;
        var pulse = Math.exp(-dw * dw);
        var shimmer = 0.85 + 0.15 * Math.sin(d.u * 22 - t * 1.3 + d.ph);
        /* a readable floor everywhere, so the field still reads as a field,
           plus a lift inside the beam and a stronger one on the wave */
        var al = d.base * (1.02 + 1.3 * glow + 1.7 * pulse) * shimmer;
        if (al < 0.008) continue;

        var rad = d.u * R;
        var x = c + Math.cos(d.a) * rad;
        var y = c + Math.sin(d.a) * rad;
        var dir = d.a + Math.PI / 2 + d.tilt;
        var hx = Math.cos(dir) * d.len * 0.5;
        var hy = Math.sin(dir) * d.len * 0.5;

        ctx.beginPath();
        ctx.moveTo(x - hx, y - hy);
        ctx.lineTo(x + hx, y + hy);
        ctx.strokeStyle =
          "rgba(" +
          mix(Math.min(1, glow * 1.1 + pulse * 0.55)) +
          "," +
          Math.min(al, 0.82).toFixed(3) +
          ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* 6 · the scanner itself: a tapering arc with a magenta head */
      var tail = 0.92;
      var seg = 16;
      for (var si = 0; si < seg; si++) {
        var f = (si + 1) / seg;
        var a0 = sweep - tail * (1 - f);
        var a1 = a0 + tail / seg + 0.006;
        ctx.beginPath();
        ctx.arc(c, c, R * 0.905, a0, a1);
        ctx.strokeStyle = "rgba(18,46,138," + (0.95 * Math.pow(f, 1.9)).toFixed(3) + ")";
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      var hx2 = c + Math.cos(sweep) * R * 0.905;
      var hy2 = c + Math.sin(sweep) * R * 0.905;
      var halo = ctx.createRadialGradient(hx2, hy2, 0, hx2, hy2, R * 0.075);
      halo.addColorStop(0, "rgba(233,63,128,0.42)");
      halo.addColorStop(1, "rgba(233,63,128,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(hx2, hy2, R * 0.075, 0, TAU);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(hx2, hy2, 2.4, 0, TAU);
      ctx.fillStyle = "rgba(233,63,128,0.95)";
      ctx.fill();

      /* 7 · a single slow satellite on an inner orbit */
      var oa = -t * 0.31 + 1.1;
      var ox = c + Math.cos(oa) * R * 0.46;
      var oy = c + Math.sin(oa) * R * 0.46;
      ctx.beginPath();
      ctx.arc(ox, oy, 1.7, 0, TAU);
      ctx.fillStyle = "rgba(18,46,138,0.7)";
      ctx.fill();

      /* 8 · centre: fixed dot with a breathing ring */
      var breath = 0.5 + 0.5 * Math.sin(t * 1.7);
      ctx.beginPath();
      ctx.arc(c, c, 2.2, 0, TAU);
      ctx.fillStyle = "rgba(17,48,86,0.82)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(c, c, 5 + 2.4 * breath, 0, TAU);
      ctx.strokeStyle = "rgba(18,46,138," + (0.24 - 0.12 * breath).toFixed(3) + ")";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function loop(now) {
      if (!start) start = now;
      if (visible && !reduced.matches) draw((now - start) / 1000);
      requestAnimationFrame(loop);
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }).observe(canvas);
    }

    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener("resize", resize);

    resize();
    reduced.addEventListener("change", function () {
      if (reduced.matches) draw(0);
    });
    requestAnimationFrame(loop);
  }

  /* ══════════════════════════════════════════════════════════════════════
     7. Telemetry: tabs + live trace
     ══════════════════════════════════════════════════════════════════════ */

  var currentTab = "cardiac";
  var ecg = null;

  function initEcg() {
    var canvas = doc.querySelector("[data-ecg]");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var w = 0;
    var h = 0;
    var visible = true;
    var dpr = 1;

    function resize() {
      var box = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(box.width));
      h = Math.max(1, Math.round(box.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      frame(performance.now());
    }

    /* waveform generators, time in seconds */
    function cardiac(time) {
      var period = 0.94;
      var p = ((time % period) + period) % period / period;
      var v = 0;
      if (p > 0.50 && p < 0.585) v = 0.1 * Math.sin(((p - 0.50) / 0.085) * Math.PI);
      if (p > 0.10 && p < 0.135) v = -0.16 * Math.sin(((p - 0.10) / 0.035) * Math.PI);
      if (p >= 0.135 && p < 0.163) v = 1.0 * Math.sin(((p - 0.135) / 0.028) * Math.PI);
      if (p >= 0.163 && p < 0.196) v = -0.3 * Math.sin(((p - 0.163) / 0.033) * Math.PI);
      if (p > 0.30 && p < 0.44) v = 0.22 * Math.sin(((p - 0.30) / 0.14) * Math.PI);
      return v + Math.sin(time * 9.1) * 0.012;
    }

    function metabolic(time) {
      return (
        0.14 * Math.sin(time * 0.42) +
        0.06 * Math.sin(time * 1.31 + 1.2) +
        0.035 * Math.sin(time * 3.1 + 0.4) +
        0.012 * Math.sin(time * 8.7)
      );
    }

    function neural(time) {
      return (
        0.11 * Math.sin(time * 6.1) +
        0.07 * Math.sin(time * 13.7 + 1.1) +
        0.05 * Math.sin(time * 27.3 + 2.3) +
        0.03 * Math.sin(time * 41.9 + 0.7) +
        0.02 * Math.sin(time * 63.1)
      );
    }

    var gen = { cardiac: cardiac, metabolic: metabolic, neural: neural };
    var amp = { cardiac: 0.42, metabolic: 0.6, neural: 0.62 };

    function frame(now) {
      requestAnimationFrame(frame);
      if (!visible) return;

      var mode = currentTab;
      var fn = gen[mode];
      var scale = amp[mode];
      var speed = 76; /* px per second */
      var t = now / 1000;
      var mid = h / 2;

      ctx.clearRect(0, 0, w, h);

      /* baseline guides */
      ctx.strokeStyle = "rgba(245,239,234,0.06)";
      ctx.lineWidth = 1;
      for (var g = 1; g <= 3; g++) {
        var gy = (h / 4) * g;
        ctx.beginPath();
        ctx.moveTo(0, Math.round(gy) + 0.5);
        ctx.lineTo(w, Math.round(gy) + 0.5);
        ctx.stroke();
      }

      /* two passes: soft halo + crisp trace. The last 26px are held back
         for the live cursor at the head of the trace. */
      var headGap = 26;
      for (var pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        for (var x = 0; x <= w - headGap; x += 1) {
          var ts = t - (w - x) / speed;
          var y = mid - fn(ts) * h * scale * 0.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = pass === 0 ? "rgba(145,207,213,0.16)" : "rgba(183,229,233,0.95)";
        ctx.lineWidth = pass === 0 ? 3 : 1.15;
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      /* live cursor: scan bar + magenta pulse at the trace head */
      var headX = w - headGap;
      var headY = mid - fn(t - headGap / speed) * h * scale * 0.5;

      ctx.beginPath();
      ctx.moveTo(headX, 0);
      ctx.lineTo(headX, h);
      ctx.strokeStyle = "rgba(145,207,213,0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      var glow = ctx.createRadialGradient(headX, headY, 0, headX, headY, 16);
      glow.addColorStop(0, "rgba(233,63,128,0.5)");
      glow.addColorStop(1, "rgba(233,63,128,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(headX, headY, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(headX, headY, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,242,247,0.96)";
      ctx.fill();
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }).observe(canvas);
    }

    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener("resize", resize);

    resize();
    ecg = { resize: resize };
  }

  var tabsRoot = doc.querySelector("[data-tabs]");
  var tabButtons = tabsRoot ? tabsRoot.querySelectorAll("[data-tab]") : [];
  var metricsRoot = doc.querySelector("[data-metrics]");
  var sourceEl = doc.querySelector("[data-tab-source]");
  var panel = doc.querySelector("#panel-telemetry");

  function renderTelemetry(tab) {
    if (!metricsRoot) return;
    var data = TELEMETRY[tab];
    if (!data) return;

    var cells = metricsRoot.querySelectorAll("div");
    for (var i = 0; i < cells.length; i++) {
      var m = data.metrics[i];
      if (!m) continue;
      var dt = cells[i].querySelector("dt");
      var v = cells[i].querySelector('[data-m="' + i + '.v"]');
      var u = cells[i].querySelector('[data-m="' + i + '.u"]');
      if (dt) dt.textContent = pick(m.label);
      if (v) v.textContent = pick(m.value);
      if (u) u.textContent = pick(m.unit);
    }
    if (sourceEl) sourceEl.textContent = pick(data.source);

    var activeBtn = doc.querySelector('[data-tab="' + tab + '"]');
    if (activeBtn && panel) panel.setAttribute("aria-labelledby", activeBtn.id);
  }

  var swapEls = [metricsRoot, doc.querySelector(".monitor-chart"), sourceEl];

  function swapTelemetry(tab) {
    if (reduced.matches) {
      renderTelemetry(tab);
      return;
    }
    /* fade the readouts down, swap the numbers while they are dim,
       then let them settle back — 160ms out, 240ms in */
    swapEls.forEach(function (el) {
      if (el) el.classList.add("is-swapping");
    });
    window.setTimeout(function () {
      renderTelemetry(tab);
      swapEls.forEach(function (el) {
        if (el) el.classList.remove("is-swapping");
      });
    }, 160);
  }

  function selectTab(tab, focus) {
    currentTab = tab;
    for (var i = 0; i < tabButtons.length; i++) {
      var b = tabButtons[i];
      var on = b.getAttribute("data-tab") === tab;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    }
    swapTelemetry(tab);
  }

  if (tabsRoot) {
    tabsRoot.addEventListener("click", function (e) {
      var b = e.target.closest("[data-tab]");
      if (!b) return;
      selectTab(b.getAttribute("data-tab"), false);
    });

    tabsRoot.addEventListener("keydown", function (e) {
      var keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
      if (keys.indexOf(e.key) === -1) return;
      e.preventDefault();
      var list = Array.prototype.slice.call(tabButtons);
      var idx = list.indexOf(doc.activeElement);
      if (idx < 0) idx = 0;
      var next = idx;
      if (e.key === "ArrowRight") next = (idx + 1) % list.length;
      if (e.key === "ArrowLeft") next = (idx - 1 + list.length) % list.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = list.length - 1;
      selectTab(list[next].getAttribute("data-tab"), true);
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     8. Membership form
     ══════════════════════════════════════════════════════════════════════ */

  function initForm() {
    var form = doc.querySelector("[data-form]");
    if (!form) return;

    var email = form.querySelector("#email");
    var card = form.querySelector('[data-error-for="email"]');
    var submit = form.querySelector("[data-submit]");
    var label = form.querySelector(".btn-label");
    var status = form.querySelector("[data-status]");
    var field = email ? email.closest(".field") : null;

    function showError(msg) {
      if (field) field.classList.add("has-error");
      if (card) card.textContent = msg;
      if (email) email.setAttribute("aria-invalid", "true");
    }

    function clearError() {
      if (field) field.classList.remove("has-error");
      if (card) card.textContent = "";
      if (email) email.removeAttribute("aria-invalid");
    }

    if (email) email.addEventListener("input", clearError);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.classList.contains("is-done") || form.classList.contains("is-busy")) return;

      var value = (email && email.value ? email.value : "").trim();
      if (!value) {
        showError(t("s7.err.required"));
        if (email) email.focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        showError(t("s7.err.email"));
        if (email) email.focus();
        return;
      }
      clearError();

      form.classList.add("is-busy");
      submit.disabled = true;
      submit.classList.add("is-loading");
      if (label) label.textContent = t("s7.submit.busy");
      if (status) {
        status.className = "form-status";
        status.textContent = "";
      }

      /* Demo endpoint: there is no backend, so we resolve on a short delay.
         Replace with a real fetch() when a submission endpoint exists. */
      window.setTimeout(function () {
        form.classList.remove("is-busy");
        form.classList.add("is-done");
        submit.classList.remove("is-loading");
        if (label) label.textContent = t("s7.submit.done");
        if (status) {
          status.className = "form-status is-visible is-ok";
          status.textContent = t("s7.ok");
        }
        form.reset();
      }, 900);
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     9. Scroll-linked motion
     ══════════════════════════════════════════════════════════════════════ */

  /* The plate drifts at a fraction of the scroll speed while the hero is
     on screen; the hero copy eases back a little so the transition out of
     the first screen is gradual rather than a hard cut. Transform and
     opacity only — no layout work per frame. */
  function initParallax() {
    var plate = doc.querySelector(".hero-plate .plate");
    var grid = doc.querySelector(".hero-grid");
    if (!plate || !grid) return;

    var vh = window.innerHeight;
    var ticking = false;
    var engaged = true;

    function update() {
      ticking = false;
      if (reduced.matches) return;

      var y = window.pageYOffset || doc.documentElement.scrollTop;

      if (y > vh * 1.2) {
        if (engaged) {
          plate.style.transform = "";
          grid.style.opacity = "";
          engaged = false;
        }
        return;
      }

      engaged = true;
      plate.style.transform = "translate3d(0," + (y * 0.08).toFixed(2) + "px,0)";
      grid.style.opacity = Math.max(0, 1 - (y / (vh * 1.05)) * 0.55).toFixed(3);
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "resize",
      function () {
        vh = window.innerHeight;
      },
      { passive: true }
    );

    update();
  }

  /* Marks the step closest to a reading line at 45% of the viewport.
     A scroll handler rather than an IntersectionObserver: with four tall
     elements and a narrow band, IO reports several targets at once and the
     marker jumps. Comparing distances is deterministic and cheap. */
  function initSteps() {
    var steps = Array.prototype.slice.call(doc.querySelectorAll(".step"));
    if (!steps.length) return;

    var ticking = false;

    function update() {
      ticking = false;
      var line = window.innerHeight * 0.45;
      var best = -1;
      var bestDist = Infinity;

      for (var i = 0; i < steps.length; i++) {
        var r = steps[i].getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        var mid = r.top + Math.min(r.height, window.innerHeight * 0.5) / 2;
        var d = Math.abs(mid - line);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }

      for (var j = 0; j < steps.length; j++) {
        steps[j].classList.toggle("is-active", j === best);
      }
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    update();
  }

  /* ══════════════════════════════════════════════════════════════════════
     10. Section-aware navigation
     ══════════════════════════════════════════════════════════════════════ */

  function initNavHighlight() {
    if (!("IntersectionObserver" in window)) return;
    var links = doc.querySelectorAll("[data-nav]");
    if (!links.length) return;

    var map = {};
    each("[data-nav]", function (a) {
      map[a.getAttribute("data-nav")] = a;
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var key = entry.target.id;
          var link = map[key];
          if (!link) return;
          if (entry.isIntersecting) {
            each("[data-nav]", function (a) {
              a.removeAttribute("aria-current");
            });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    ["science", "instruments", "protocol", "journal"].forEach(function (id) {
      var el = doc.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     10. Boot
     ══════════════════════════════════════════════════════════════════════ */

  function switchLang(next) {
    var run = function () {
      applyLang(next, true);
    };
    /* Cross-fade the whole page so a language swap does not snap. */
    if (doc.startViewTransition && !reduced.matches) {
      try {
        doc.startViewTransition(run);
        return;
      } catch (e) {}
    }
    run();
  }

  each("[data-lang-btn]", function (btn) {
    btn.addEventListener("click", function () {
      switchLang(btn.getAttribute("data-lang-btn"));
    });
  });

  var initial = resolveLang();
  applyLang(initial.lang, initial.explicit);
  initPlate();
  initEcg();
  initForm();
  initNavHighlight();
  initParallax();
  initSteps();

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Keep the header state honest after a resize. */
  window.addEventListener("resize", onScroll, { passive: true });
})();
