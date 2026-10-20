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

  each(".reveal", function (el) {
    if (revealIO) revealIO.observe(el);
    else el.classList.add("is-in");
  });

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
    var ink = "11,15,16";
    var accent = "12,110,99";
    var dashes = [];
    var N = 520;
    var size = 0;
    var started = 0;
    var visible = true;

    for (var i = 0; i < N; i++) {
      var u = i / N;
      /* jitter keeps the field from reading as concentric rings */
      var jitter = 1 + 0.05 * Math.sin(i * 1.71) + 0.03 * Math.sin(i * 4.13);
      var r = (0.06 + 0.36 * Math.sqrt(u)) * jitter;
      var a = i * 2.39996 + u * 5.2;
      var alpha = 0.09 + 0.32 * (0.5 + 0.5 * Math.sin(i * 7.13));
      /* stroke drawn as a short tangential tick, not an arc */
      var tilt = 0.28 * Math.sin(i * 3.37);
      var length = 2.2 + 5.0 * (0.5 + 0.5 * Math.sin(i * 2.11 + 1));
      dashes.push({ r: r, a: a, tilt: tilt, len: length, alpha: alpha });
    }

    function resize() {
      var box = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = Math.max(1, Math.min(box.width, box.height));
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    }

    function draw(t) {
      if (!size) return;
      var c = size / 2;
      var R = size * 0.5;
      ctx.clearRect(0, 0, size, size);

      /* outer ring */
      ctx.beginPath();
      ctx.arc(c, c, R * 0.905, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(" + ink + ",0.16)";
      ctx.lineWidth = 1;
      ctx.stroke();

      /* inner guide ring */
      ctx.beginPath();
      ctx.arc(c, c, R * 0.30, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(" + ink + ",0.06)";
      ctx.stroke();

      /* dash field */
      var rot = t * 0.02;
      for (var i = 0; i < dashes.length; i++) {
        var d = dashes[i];
        var ang = d.a + rot;
        var rad = d.r * R * 1.95;
        var x = c + Math.cos(ang) * rad;
        var y = c + Math.sin(ang) * rad;
        var dir = ang + Math.PI / 2 + d.tilt;
        var hx = Math.cos(dir) * d.len * 0.5;
        var hy = Math.sin(dir) * d.len * 0.5;
        ctx.beginPath();
        ctx.moveTo(x - hx, y - hy);
        ctx.lineTo(x + hx, y + hy);
        ctx.strokeStyle = "rgba(" + ink + "," + d.alpha.toFixed(3) + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* accent marker: arc + dot, upper right */
      var mA0 = -0.72;
      var mA1 = -0.42;
      ctx.beginPath();
      ctx.arc(c, c, R * 0.905, mA0, mA1);
      ctx.strokeStyle = "rgba(" + accent + ",0.85)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(c + Math.cos(mA1) * R * 0.905, c + Math.sin(mA1) * R * 0.905, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + accent + ",0.9)";
      ctx.fill();

      /* centre */
      ctx.beginPath();
      ctx.arc(c, c, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + ink + ",0.75)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(c, c, 5.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(" + ink + ",0.14)";
      ctx.stroke();

      /* cardinal ticks */
      for (var k = 0; k < 4; k++) {
        var ang = (Math.PI / 2) * k + Math.PI / 4;
        var x0 = c + Math.cos(ang) * R * 0.86;
        var y0 = c + Math.sin(ang) * R * 0.86;
        var x1 = c + Math.cos(ang) * R * 0.905;
        var y1 = c + Math.sin(ang) * R * 0.905;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = "rgba(" + ink + ",0.2)";
        ctx.stroke();
      }
    }

    function loop(now) {
      if (!started) started = now;
      if (visible && !reduced.matches) draw((now - started) / 1000);
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
      ctx.strokeStyle = "rgba(244,243,239,0.07)";
      ctx.lineWidth = 1;
      for (var g = 1; g <= 3; g++) {
        var gy = (h / 4) * g;
        ctx.beginPath();
        ctx.moveTo(0, Math.round(gy) + 0.5);
        ctx.lineTo(w, Math.round(gy) + 0.5);
        ctx.stroke();
      }

      /* two passes: soft halo + crisp trace */
      for (var pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        for (var x = 0; x <= w; x += 1) {
          var ts = t - (w - x) / speed;
          var y = mid - fn(ts) * h * scale * 0.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = pass === 0 ? "rgba(92,188,174,0.18)" : "rgba(140,222,209,0.95)";
        ctx.lineWidth = pass === 0 ? 3 : 1.15;
        ctx.lineJoin = "round";
        ctx.stroke();
      }
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

  function selectTab(tab, focus) {
    currentTab = tab;
    for (var i = 0; i < tabButtons.length; i++) {
      var b = tabButtons[i];
      var on = b.getAttribute("data-tab") === tab;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    }
    renderTelemetry(tab);
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
     9. Section-aware navigation
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

  each("[data-lang-btn]", function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang-btn"), true);
    });
  });

  var initial = resolveLang();
  applyLang(initial.lang, initial.explicit);
  initPlate();
  initEcg();
  initForm();
  initNavHighlight();

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Keep the header state honest after a resize. */
  window.addEventListener("resize", onScroll, { passive: true });
})();
