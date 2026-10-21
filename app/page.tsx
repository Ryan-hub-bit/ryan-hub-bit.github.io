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
    text: "Three papers were accepted to ICSE 2027, including one as first author and one as co-first author.",
  },
  {
    date: "Jul. 2026",
    dateTime: "2026-07",
    text: "One paper was directly accepted to ACM CCS 2026 (Cycle B).",
  },
  {
    date: "Jul. 2026",
    dateTime: "2026-07",
    text: "One poster was accepted to USENIX Security 2026. See you in Baltimore!",
  },
  {
    date: "Apr. 2026",
    dateTime: "2026-04",
    text: "One poster was accepted to the PLDI Student Research Competition (SRC). See you in Denver!",
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
    venueDate: "2027",
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
    venue: "Proceedings of the ACM Conference on Computer and Communications Security",
    venueDate: "November 2026",
    acceptance: {
      cycle: "Cycle B",
      // Direct-acceptance count supplied by the site owner.
      directAcceptances: 107,
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
    url: "https://pldi26.sigplan.org/details/pldi-2026-src/16/Towards-Taming-Indirect-Control-Flow-in-Binaries-with-Multi-Task-Graph-Learning",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <nav className="top-nav" aria-label="Page navigation">
        <div className="nav-inner">
          <a
            className="university-mark"
            href="https://tulane.edu/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Tulane University"
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
              <small>Department of Computer Science</small>
            </span>
          </a>

          <div className="nav-links">
            <a href="#about">
              <UserRound className="nav-icon" aria-hidden="true" />
              <span>About</span>
            </a>
            <a href="#news">
              <Newspaper className="nav-icon" aria-hidden="true" />
              <span>News</span>
            </a>
            <a href="#publications">
              <BookOpenText className="nav-icon" aria-hidden="true" />
              <span>Publications</span>
            </a>
            <a href="#service">
              <Handshake className="nav-icon" aria-hidden="true" />
              <span>Service</span>
            </a>
          </div>
        </div>
      </nav>

      <header className="profile" aria-labelledby="profile-name">
        <div className="identity">
          <p className="name-pronunciation">Pronounced “Koon Lee-oh”</p>
          <h1 id="profile-name">
            Kun Liu{" "}
            <span className="chinese-name" lang="zh-Hans">刘坤</span>
          </h1>
          <p className="position">Ph.D. Student</p>
          <p className="profile-email email-address">kliu14 [AT] tulane.edu</p>
          <p className="affiliation">Department of Computer Science</p>
          <p className="affiliation">Tulane University</p>

          <div className="social-links" aria-label="Profile links">
            <a
              className="social-link"
              href="https://www.linkedin.com/in/kun-liu-6b2397192/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
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
              aria-label="GitHub profile"
              title="GitHub"
            >
              <span className="social-icon github-icon" aria-hidden="true" />
            </a>
            <span
              className="social-link social-link-disabled"
              role="img"
              aria-label="CV coming soon"
              title="CV coming soon"
            >
              <FileText className="social-icon" aria-hidden="true" />
            </span>
          </div>
        </div>

        <aside className="opportunity-notice" aria-label="Academic job market availability">
          <p>
            I am actively seeking postdoctoral and tenure-track assistant professor positions.
          </p>
        </aside>

        <div className="portrait">
          <img
            className="portrait-image"
            src="/profile.png"
            alt="Portrait of Kun Liu"
            width="200"
            height="200"
          />
        </div>
      </header>

      <div className="content-column">
        <section className="introduction" id="about" aria-labelledby="about-heading">
          <h2 id="about-heading">About Me</h2>
          <p>
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
            <span className="research-underline">agentic approaches</span> at the
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
          </p>
          <div className="research-interests">
            <h2>Recent Research Interests</h2>
            <ul>
              <li>
                <strong>AI-driven program analysis</strong> for software security and binary analysis.
              </li>
              <li>
                <strong>Agentic AI systems</strong> for software engineering and security automation.
              </li>
            </ul>
          </div>
        </section>

        <section className="content-section" id="news">
          <h2 id="news-heading">News</h2>
          <NewsList items={news} />
        </section>

        <section className="content-section" id="publications">
          <div className="section-heading">
            <h2>Publications</h2>
          </div>

          <div className="publication-list">
            {publications.map((publication) => (
              <article className="publication" key={publication.title}>
                <div className="paper-details">
                  <h3>
                    <span className="publication-tag">[{publication.venueLabel}]</span>
                    {" "}
                    {publication.title}
                  </h3>
                  {publication.authors.length > 0 && (
                    <p className="authors">
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
                    To appear in <em>{publication.venue}</em>, {publication.venueDate}
                    {publication.acceptance && (
                      <span className="acceptance-statistics">
                        {" (Direct acceptance rate: "}
                        <strong>
                          {(publication.acceptance.directAcceptances / publication.acceptance.submissions * 100).toFixed(2)}%
                        </strong>
                        {" = "}{publication.acceptance.directAcceptances}/{publication.acceptance.submissions.toLocaleString("en-US")}
                        {publication.acceptance.cycle && <> ({publication.acceptance.cycle})</>}
                        {")"}
                      </span>
                    )}.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="posters" aria-labelledby="posters-heading">
          <div className="section-heading">
            <h2 id="posters-heading">Posters</h2>
          </div>

          <div className="publication-list">
            {posters.map((poster) => (
              <article className="publication" key={poster.title}>
                <div className="paper-details">
                  <h3>
                    <span className="publication-tag">[{poster.venueLabel}]</span>
                    {" "}
                    <a href={poster.url} target="_blank" rel="noreferrer">
                      {poster.title}
                    </a>
                  </h3>
                  <p className="authors">
                    <strong>{poster.author}</strong>, <em>{poster.affiliation}</em>
                  </p>
                  <p className="venue">
                    <em>{poster.venue}</em>, {poster.venueDate}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section service" id="service">
          <h2>Academic Service</h2>
          <ul className="experience-list">
            <li>
              Research Assistant, Department of Computer Science,
              Tulane University — Jan 2023 – Present
            </li>
            <li>
              Course Assistant, Computer Networks, Johns Hopkins
              University — Sep 2020 – Dec 2020
            </li>
            <li>
              External Reviewer: USENIX Security Symposium
              2024–2027; PLDI 2026
            </li>
          </ul>
        </section>

        <footer>
          <p>Last updated October 2026</p>
          <div className="visitor-map" aria-label="Visitor map">
            <a
              className="visitor-map-link"
              href="https://info.flagcounter.com/FwqY"
              target="_blank"
              rel="noreferrer"
              aria-label="View public visitor statistics on Flag Counter"
            >
              <img
                src="https://s05.flagcounter.com/map/FwqY/size_s/txt_005F4A/border_FFFFFF/pageviews_0/viewers_0/flags_0/"
                alt="World map showing visitors by country and region"
                width="400"
                height="205"
                decoding="async"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </a>
            <p className="visitor-map-caption">
              <a href="https://info.flagcounter.com/FwqY" target="_blank" rel="noreferrer">
                Visitor statistics
              </a>
              {" · "}
              <a href="https://www.flagcounter.com/privacy.html" target="_blank" rel="noreferrer">
                Privacy
              </a>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
