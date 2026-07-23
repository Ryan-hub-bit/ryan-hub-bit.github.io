import {
  BookOpenText,
  FileText,
  Handshake,
  Mail,
  Newspaper,
  UserRound,
} from "lucide-react";

const news = [
  {
    date: "Jul. 2026",
    text: "One paper was directly accepted to ACM CCS 2026 (Cycle 2).",
  },
  {
    date: "Jul. 2026",
    text: "One poster was accepted to USENIX Security 2026. See you in Baltimore!",
  },
];

const publications = [
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
    venue: "to appear in ACM Conference on Computer and Communications Security",
    venueDate: "November 2026",
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
          <h1 id="profile-name">Kun Liu [刘坤]</h1>
          <p className="position">Ph.D. Student</p>
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
            <a
              className="social-link"
              href="mailto:kliu14@tulane.edu"
              aria-label="Email Kun Liu"
              title="Email"
            >
              <Mail className="social-icon" aria-hidden="true" />
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

        <img
          className="portrait"
          src="/profile.jpeg"
          alt="Portrait of Kun Liu"
          width="220"
          height="220"
        />
      </header>

      <div className="content-column">
        <section className="introduction" id="about" aria-label="Biography">
          <p>
            I am a Ph.D. student in{" "}
            <a href="https://sse.tulane.edu/cs" target="_blank" rel="noreferrer">
              Computer Science
            </a>{" "}
            at Tulane University, advised by{" "}
            <a href="https://cs.tulane.edu/~jming/" target="_blank" rel="noreferrer">
              Dr. Jiang Ming
            </a>
            . Prior to joining Tulane, I received my master&apos;s degree from{" "}
            <a href="https://isi.jhu.edu/" target="_blank" rel="noreferrer">
              Johns Hopkins University
            </a>
            . My research focuses on developing AI techniques for software
            security, particularly binary code analysis. I am always open to
            research collaborations and discussions—please feel free to contact
            me at <a href="mailto:kliu14@tulane.edu">kliu14@tulane.edu</a>.
          </p>
        </section>

        <section className="content-section" id="news">
          <h2>News</h2>
          <div
            className={`news-scroll${news.length > 3 ? " is-scrollable" : ""}`}
            tabIndex={news.length > 3 ? 0 : undefined}
            aria-label={news.length > 3 ? "Scrollable news list" : undefined}
          >
            <ul className="news-list">
              {news.map((item) => (
                <li key={`${item.date}-${item.text}`}>
                  <span>[{item.date}]</span> {item.text}
                </li>
              ))}
            </ul>
          </div>
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
                  <p className="venue">
                    <em>{publication.venue}</em>, {publication.venueDate}
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
              <strong>Research Assistant</strong>, Department of Computer Science,
              Tulane University — Jan 2023 – Present
            </li>
            <li>
              <strong>Course Assistant</strong>, Computer Networks, Johns Hopkins
              University — Sep 2020 – Dec 2020
            </li>
            <li>
              <strong>External Reviewer</strong>: USENIX Security Symposium
              2024–2026; PLDI 2026
            </li>
          </ul>
        </section>

        <footer>
          <p>Last updated July 2026</p>
        </footer>
      </div>
    </main>
  );
}
