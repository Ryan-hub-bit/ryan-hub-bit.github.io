import {
  BookOpenText,
  FileText,
  Handshake,
  Newspaper,
  UserRound,
} from "lucide-react";
import NewsList from "./news-list";

const news = [
  {
    date: "Oct. 2026",
    dateTime: "2026-10",
    text: "I won 1st place in the Ph.D. Student Research Competition at",
    emphasis: "1st place",
    image: { src: "/news/RSTCON.jpg", alt: "RSTCON 2026 first-place certificate", width: 1420, height: 1017 },
    imageAltZh: "RSTCON 2026 博士生科研竞赛第一名获奖证书",
    zh: { text: "我在博士生科研竞赛中获得第一名，赛事：", emphasis: "第一名" },
    link: {
      text: "RSTCON 2026",
      url: "https://rstcon.org/2026",
    },
  },
  {
    date: "Oct. 2026",
    dateTime: "2026-10",
    text: "One paper was directly accepted to ICSE 2027.",
    emphasis: "directly accepted",
    image: { src: "/news/ICSE2027.png", alt: "ICSE 2027 acceptance email", width: 2833, height: 735 },
    imageAltZh: "ICSE 2027 论文录用邮件",
    zh: { text: "一篇论文被 ICSE 2027 直接录用。", emphasis: "直接录用" },
  },
  {
    date: "Jul. 2026",
    dateTime: "2026-07",
    text: "One paper was directly accepted to ACM CCS 2026 (Cycle B).",
    emphasis: "directly accepted",
    image: { src: "/news/CCS2026.png", alt: "ACM CCS 2026 acceptance email", width: 2835, height: 445 },
    imageAltZh: "ACM CCS 2026 论文录用邮件",
    zh: { text: "一篇论文被 ACM CCS 2026（Cycle B）直接录用。", emphasis: "直接录用" },
  },
  {
    date: "Jul. 2026",
    dateTime: "2026-07",
    text: "One poster was accepted to USENIX Security 2026. See you in Baltimore!",
    image: { src: "/news/Usenix26.png", alt: "USENIX Security 2026 poster notification email", width: 2821, height: 478 },
    imageAltZh: "USENIX Security 2026 海报通知邮件",
    zh: { text: "一项海报展示被 USENIX Security 2026 接收。巴尔的摩见！" },
  },
  {
    date: "Apr. 2026",
    dateTime: "2026-04",
    text: "One poster was accepted to the PLDI Student Research Competition (SRC). See you in Denver!",
    image: { src: "/news/PLDISRC.png", alt: "PLDI 2026 SRC poster acceptance email", width: 2835, height: 475 },
    imageAltZh: "PLDI 2026 SRC 海报录用邮件",
    zh: { text: "一项海报展示被 PLDI 学生科研竞赛（SRC）接收。丹佛见！" },
  },
];

const publications = [
  {
    venueLabel: "ICSE '27",
    title:
      "Beyond Tokens: NumAnchor for Address-Grounded Numeric Operand Representation in Assembly Language Models",
    authors: [
      "Kun Liu",
      "Keith Mitchell",
      "Xin Hu",
      "Jiangcheng Yu",
      "Chenke Luo",
      "Zhengming Ding",
      "Haotian Zhang",
      "Jiang Ming",
    ],
    venue: "Proceedings of the 49th IEEE/ACM International Conference on Software Engineering",
    // Conference dates and location: https://conf.researchr.org/home/icse-2027
    venueLocation: "Dublin, Ireland",
    venueDate: "April 25–May 1, 2027",
    venueLocationZh: "爱尔兰都柏林",
    venueDateZh: "2027 年 4 月 25 日至 5 月 1 日",
    acceptance: {
      // Initial direct acceptances, excluding major-revision decisions, from the owner's acceptance notice.
      directAcceptances: 119,
      submissions: 2375,
    },
  },
  {
    venueLabel: "CCS '26",
    title:
      "Long-Range Indirect Control-Flow Prediction in Stripped Binaries via Dual Virtual Hubs and Multi-Task Graph Learning",
    authors: [
      "Kun Liu",
      "Zhengming Ding",
      "Chenke Luo",
      "Tianyi Xu",
      "Zizhan Zheng",
      "Haotian Zhang",
      "Jiang Ming",
    ],
    venue: "Proceedings of the 33rd ACM Conference on Computer and Communications Security",
    // Conference dates and location: https://www.sigsac.org/ccs/CCS2026/
    venueLocation: "The Hague, the Netherlands",
    venueDate: "November 15–19, 2026",
    venueLocationZh: "荷兰海牙",
    venueDateZh: "2026 年 11 月 15–19 日",
    acceptance: {
      cycle: "Cycle B",
      // Count supplied by the site owner: 107 direct acceptances + 76 with shepherding.
      directAcceptances: 183,
      // Submission count supplied by the site owner; not independently verified.
      submissions: 2188,
    },
  },
];

const posters = [
  {
    venueLabel: "USENIX Security '26",
    title:
      "Addresses Are Not Tokens: Grounding Numeric Operands in Learned Binary Analysis",
    author: "Kun Liu",
    affiliation: "Tulane University",
    venue: "USENIX Security 2026 Poster Session",
    venueDate: "August 2026",
    venueZh: "USENIX Security 2026 海报展示",
    venueDateZh: "2026 年 8 月",
    url: "https://www.usenix.org/conference/usenixsecurity26/poster-session",
  },
  {
    venueLabel: "PLDI '26 SRC",
    title:
      "Towards Taming Indirect Control Flow in Binaries with Multi-Task Graph Learning",
    author: "Kun Liu",
    affiliation: "Tulane University",
    venue: "PLDI Student Research Competition",
    venueDate: "June 2026",
    venueZh: "PLDI 学生科研竞赛",
    venueDateZh: "2026 年 6 月",
    url: "https://pldi26.sigplan.org/details/pldi-2026-src/16/Towards-Taming-Indirect-Control-Flow-in-Binaries-with-Multi-Task-Graph-Learning",
  },
];

export default function HomeContent({ language = "en" }: { language?: "en" | "zh" }) {
  const isChinese = language === "zh";
  const t = (english: string, chinese: string) => isChinese ? chinese : english;
  const localizedNews = news.map(({ zh, imageAltZh, ...item }) => ({
    ...item,
    ...(isChinese ? zh : {}),
    image: { ...item.image, alt: isChinese ? imageAltZh : item.image.alt },
    date: isChinese
      ? `${item.dateTime.slice(0, 4)}年${Number(item.dateTime.slice(5))}月`
      : item.date,
  }));

  return (
    <main className="page-shell" lang={isChinese ? "zh-CN" : "en"}>
      <nav className="top-nav" aria-label={t("Page navigation", "页面导航")}>
        <div className="nav-inner">
          <a
            className="university-mark"
            href="https://tulane.edu/"
            target="_blank"
            rel="noreferrer"
            aria-label={t("Visit Tulane University", "访问杜兰大学官网")}
          >
            <img
              className="tulane-shield"
              src="https://communications.tulane.edu/sites/default/files/2024-03/tu_new_shield.svg"
              alt=""
            />
            <span className="university-copy">
              <img
                className="tulane-wordmark"
                src="https://communications.tulane.edu/sites/default/files/2024-03/tulane-text-only-white.svg"
                alt="Tulane University"
              />
              <small>{t("Department of Computer Science", "计算机科学系")}</small>
            </span>
          </a>

          <div className="nav-links">
            <a href="#about">
              <UserRound className="nav-icon" aria-hidden="true" />
              <span>{t("About", "关于我")}</span>
            </a>
            <a href="#news">
              <Newspaper className="nav-icon" aria-hidden="true" />
              <span>{t("News", "最新动态")}</span>
            </a>
            <a href="#publications">
              <BookOpenText className="nav-icon" aria-hidden="true" />
              <span>{t("Publications", "学术论文")}</span>
            </a>
            <a href="#service">
              <Handshake className="nav-icon" aria-hidden="true" />
              <span>{t("Service", "学术服务")}</span>
            </a>
          </div>
          <a
            className="language-switch"
            href={isChinese ? "/" : "/zh/"}
            hrefLang={isChinese ? "en" : "zh-CN"}
            lang={isChinese ? "en" : "zh-CN"}
            aria-label={t("切换到中文", "Switch to English")}
            title={t("切换到中文", "Switch to English")}
          >
            {isChinese ? "EN" : "中"}
          </a>
        </div>
      </nav>

      <header className="profile" aria-labelledby="profile-name">
        <div className="identity">
          <p className="name-pronunciation">{t("Pronounced “Koon Lee-oh”", "英文发音：“Koon Lee-oh”")}</p>
          <h1 id="profile-name">
            Kun Liu{" "}
            <span className="chinese-name" lang="zh-Hans">刘坤</span>
          </h1>
          <p className="position">{t("Ph.D. Student", "博士研究生")}</p>
          <p className="profile-email email-address">kliu14 [AT] tulane.edu</p>
          <p className="affiliation">{t("Department of Computer Science", "计算机科学系")}</p>
          <p className="affiliation">{t("Tulane University", "杜兰大学")}</p>

          <div className="social-links" aria-label={t("Profile links", "个人资料链接")}>
            <a
              className="social-link"
              href="https://www.linkedin.com/in/kun-liu-6b2397192/"
              target="_blank"
              rel="noreferrer"
              aria-label={t("LinkedIn profile", "LinkedIn 个人资料")}
              title="LinkedIn"
            >
              <span className="social-icon linkedin-icon" aria-hidden="true">
                in
              </span>
            </a>
            <a
              className="social-link"
              href="https://github.com/Ryan-hub-bit"
              target="_blank"
              rel="noreferrer"
              aria-label={t("GitHub profile", "GitHub 个人主页")}
              title="GitHub"
            >
              <span className="social-icon github-icon" aria-hidden="true" />
            </a>
            <span
              className="social-link social-link-disabled"
              role="img"
              aria-label={t("CV coming soon", "简历即将上线")}
              title={t("CV coming soon", "简历即将上线")}
            >
              <FileText className="social-icon" aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="portrait">
          <img
            className="portrait-image"
            src="/profile.png"
            alt={t("Portrait of Kun Liu", "刘坤的个人照片")}
            width="200"
            height="200"
          />
        </div>
      </header>

      <div className="content-column">
        <section className="introduction" id="about" aria-labelledby="about-heading">
          <div className="introduction-heading">
            <aside className="opportunity-notice" aria-label={t("Academic job market availability", "学术求职意向")}>
              <p>
                {t("I am actively seeking postdoctoral and tenure-track assistant professor positions.", "我正在积极寻找博士后及长聘轨助理教授职位。")}
              </p>
            </aside>
            <h2 id="about-heading">{t("About Me", "关于我")}</h2>
          </div>
          <p>
            {isChinese ? (
              <>
                我是<a href="https://tulane.edu/" target="_blank" rel="noreferrer">杜兰大学</a>
                <a href="https://sse.tulane.edu/cs" target="_blank" rel="noreferrer">计算机科学</a>
                专业的博士生，目前处于博士学习的最后一年，导师是
                <a href="https://cs.tulane.edu/~jming/" target="_blank" rel="noreferrer"> Jiang Ming 博士</a>。
                我也与<a href="https://allanding.github.io/" target="_blank" rel="noreferrer"> Zhengming Ding 博士</a>
                在人工智能方向开展紧密合作。我的研究聚焦于<em>软件安全</em>、<em>程序分析</em>与<em>软件工程</em>{" "}
                的交叉领域，探索<span className="research-underline">人工智能驱动的方法</span>与
                <span className="research-underline">智能体系统</span>。
                加入杜兰大学之前，我曾在<a href="https://www.tencent.com/" target="_blank" rel="noreferrer">腾讯</a>
                短暂工作。我在<a href="https://isi.jhu.edu/" target="_blank" rel="noreferrer">约翰斯·霍普金斯大学</a>
                获得硕士学位，在<a href="https://en.bjtu.edu.cn/" target="_blank" rel="noreferrer">北京交通大学</a>
                获得学士学位。欢迎科研合作、学术交流及同行评审邀请；
                <span className="contact-invitation">欢迎通过邮件联系我。</span>
              </>
            ) : (
              <>
            I am a final-year Ph.D. student in{" "}
            <a href="https://sse.tulane.edu/cs" target="_blank" rel="noreferrer">
              Computer Science
            </a>{" "}
            at{" "}
            <a href="https://tulane.edu/" target="_blank" rel="noreferrer">
              Tulane University
            </a>
            , advised by{" "}
            <a href="https://cs.tulane.edu/~jming/" target="_blank" rel="noreferrer">
              Dr. Jiang Ming
            </a>
            . I also work closely with{" "}
            <a href="https://allanding.github.io/" target="_blank" rel="noreferrer">
              Dr. Zhengming Ding
            </a>{" "}
            on the AI aspects of my research. My research focuses on{" "}
            <span className="research-underline">AI-driven</span> and{" "}
            <span className="research-underline">agentic system</span> at the
            intersection of <em>software security</em>, <em>program analysis</em>, and{" "}
            <em>software engineering</em>.
            Prior to joining Tulane, I briefly worked at{" "}
            <a href="https://www.tencent.com/" target="_blank" rel="noreferrer">
              Tencent
            </a>
            . I received my master&apos;s degree from{" "}
            <a href="https://isi.jhu.edu/" target="_blank" rel="noreferrer">
              Johns Hopkins University
            </a>{" "}
            and my bachelor&apos;s degree from{" "}
            <a href="https://en.bjtu.edu.cn/" target="_blank" rel="noreferrer">
              Beijing Jiaotong University
            </a>
            . I welcome research collaborations, discussions, and peer-review
            invitations from anyone;{" "}
            <span className="contact-invitation">please drop me an email.</span>
              </>
            )}
          </p>
          <div className="research-interests">
            <h2>{t("Recent Research Interests", "近期研究方向")}</h2>
            <ul>
              <li>
                {isChinese ? <><strong>人工智能驱动的程序分析</strong>，面向软件安全与二进制分析。</> : <><strong>AI-driven program analysis</strong> for software security and binary analysis.</>}
              </li>
              <li>
                {isChinese ? <><strong>智能体式 AI 系统</strong>，面向软件工程与安全自动化。</> : <><strong>Agentic AI systems</strong> for software engineering and security automation.</>}
              </li>
            </ul>
          </div>
        </section>

        <section className="content-section" id="news">
          <h2 id="news-heading">{t("News", "最新动态")}</h2>
          <NewsList items={localizedNews} language={language} />
        </section>

        <section className="content-section" id="publications">
          <div className="section-heading">
            <h2>{t("Publications", "学术论文")}</h2>
          </div>

          <div className="publication-list">
            {publications.map((publication) => (
              <article className="publication" key={publication.title}>
                <div className="paper-details">
                  <h3 lang="en">
                    <span className="publication-tag">[{publication.venueLabel}]</span>
                    {" "}
                    {publication.title}
                  </h3>
                  {publication.authors.length > 0 && (
                    <p className="authors" lang="en">
                      {publication.authors.map((author, index) => (
                        <span key={author}>
                          {author === "Kun Liu" ? <strong>{author}</strong> : author}
                          {index < publication.authors.length - 2
                            ? ", "
                            : index === publication.authors.length - 2
                              ? ", and "
                              : ""}
                        </span>
                      ))}
                    </p>
                  )}
                  <p className="venue">
                    {t("To appear in ", "即将发表于 ")}<em lang="en">{publication.venue}</em>, {t(publication.venueLocation, publication.venueLocationZh)}, {t(publication.venueDate, publication.venueDateZh)}
                    {publication.acceptance && (
                      <span className="acceptance-statistics">
                        {t(" (Direct acceptance rate ", "（直接录用率 ")}
                        <strong>
                          {(publication.acceptance.directAcceptances / publication.acceptance.submissions * 100).toFixed(1)}%
                        </strong>
                        {"="}{publication.acceptance.directAcceptances}/{publication.acceptance.submissions}
                        {publication.acceptance.cycle && <> ({publication.acceptance.cycle})</>}
                        {t(")", "）")}
                      </span>
                    )}{t(".", "。")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="posters" aria-labelledby="posters-heading">
          <div className="section-heading">
            <h2 id="posters-heading">{t("Posters", "海报展示")}</h2>
          </div>

          <div className="publication-list">
            {posters.map((poster) => (
              <article className="publication" key={poster.title}>
                <div className="paper-details">
                  <h3 lang="en">
                    <span className="publication-tag">[{poster.venueLabel}]</span>
                    {" "}
                    <a href={poster.url} target="_blank" rel="noreferrer">
                      {poster.title}
                    </a>
                  </h3>
                  <p className="authors">
                    <strong lang="en">{poster.author}</strong>, <em>{t(poster.affiliation, "杜兰大学")}</em>
                  </p>
                  <p className="venue">
                    <em>{t(poster.venue, poster.venueZh)}</em>, {t(poster.venueDate, poster.venueDateZh)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="invited-talks" aria-labelledby="invited-talks-heading">
          <h2 id="invited-talks-heading">{t("Invited Talks", "受邀报告")}</h2>
          <ul className="compact-entry-list">
            <li>
              <span className="entry-title">
                {t("Building More Reliable Program Maps from Stripped Binaries", "从去符号二进制程序中构建更可靠的程序图")}
              </span>
              {" @ "}
              <a
                href="https://rstcon.org/2026/talks#icflownet-building-more-reliable-program-maps-from-stripped-binaries"
                target="_blank"
                rel="noreferrer"
              >
                RSTCON
              </a>
              {t(", Oct. 2026", "，2026 年 10 月")}
            </li>
            <li>
              <span className="entry-title">
                {t(
                  "Can AI Reverse-Engineer Everything? From Incomplete Program Maps to More Reliable Binary Analysis",
                  "AI 能逆向一切吗？从不完整的程序地图到更可靠的二进制分析",
                )}
              </span>
              {" @ "}
              {t("School of Cyber Science and Engineering, Wuhan University", "武汉大学国家网络安全学院")}
              {t(", Oct. 2026", "，2026 年 10 月")}
            </li>
          </ul>
        </section>

        <section className="content-section" id="awards" aria-labelledby="awards-heading">
          <h2 id="awards-heading">{t("Awards", "获奖情况")}</h2>
          <ul className="compact-entry-list">
            <li>
              <span className="entry-title"><strong>{t("1st Place", "第一名")}</strong>{t(" — Ph.D. Student Research Competition", " — 博士生科研竞赛")}</span>
              {", "}
              <a href="https://rstcon.org/2026" target="_blank" rel="noreferrer">
                RSTCON 2026
              </a>
              {t(" (Oct. 2026)", "（2026 年 10 月）")}
            </li>
          </ul>
        </section>

        <section className="content-section teaching" id="teaching" aria-labelledby="teaching-heading">
          <h2 id="teaching-heading">{t("Teaching", "教学经历")}</h2>
          <div className="teaching-group">
            <h3 className="teaching-institution">{t("Tulane University", "杜兰大学")}</h3>
            <ul className="teaching-list">
              <li>{t("Language-Based Security, Teaching Assistant (Fall 2026, Spring 2026)", "基于语言的安全（Language-Based Security），教学助理（2026 年秋季、2026 年春季）")}</li>
            </ul>
          </div>
          <div className="teaching-group">
            <h3 className="teaching-institution">{t("Johns Hopkins University", "约翰斯·霍普金斯大学")}</h3>
            <ul className="teaching-list">
              <li>{t("Computer Networks, Course Assistant (Fall 2020)", "计算机网络，课程助理（2020 年秋季）")}</li>
            </ul>
          </div>
        </section>

        <section className="content-section service" id="service" aria-labelledby="service-heading">
          <h2 id="service-heading">{t("Academic Service", "学术服务")}</h2>
          <ul className="experience-list">
            <li>
              {t("Research Assistant, Department of Computer Science, Tulane University — Jan 2023 – Present", "科研助理，杜兰大学计算机科学系 — 2023 年 1 月至今")}
            </li>
            <li>
              {t("External Reviewer: USENIX Security Symposium 2024–2027; PLDI 2026", "外部审稿人：USENIX Security Symposium 2024–2027；PLDI 2026")}
            </li>
          </ul>
        </section>

        <footer>
          <p>{t("Last updated October 2026", "最近更新：2026 年 10 月")}</p>
          <div className="visitor-map" aria-label={t("Visitor map", "访客地图")}>
            <a
              className="visitor-map-link"
              href="https://info.flagcounter.com/FwqY"
              target="_blank"
              rel="noreferrer"
              aria-label={t("View public visitor statistics on Flag Counter", "在 Flag Counter 查看公开访客统计")}
            >
              <img
                src="https://s05.flagcounter.com/map/FwqY/size_s/txt_005F4A/border_FFFFFF/pageviews_0/viewers_0/flags_0/"
                alt={t("World map showing visitors by country and region", "按国家和地区展示访客分布的世界地图")}
                width="400"
                height="205"
                decoding="async"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </a>
            <p className="visitor-map-caption">
              <a href="https://info.flagcounter.com/FwqY" target="_blank" rel="noreferrer">
                {t("Visitor statistics", "访客统计")}
              </a>
              {" · "}
              <a href="https://www.flagcounter.com/privacy.html" target="_blank" rel="noreferrer">
                {t("Privacy", "隐私政策")}
              </a>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
