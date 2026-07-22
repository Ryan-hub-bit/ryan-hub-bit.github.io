const news = [
  {
    date: "Jul. 2026",
    text: "Add a recent paper acceptance, award, presentation, or research update here.",
  },
  {
    date: "May 2026",
    text: "Add another short academic or professional announcement here.",
  },
  {
    date: "Jan. 2026",
    text: "Add an earlier milestone. Keep each news item to one concise sentence.",
  },
];

const publications = [
  {
    title: "Title of Your Most Recent Research Paper",
    authors: "Ryan [Last Name], Collaborator One, and Collaborator Two",
    venue: "Conference or Journal Name, 2026",
    note: "Featured Paper",
  },
  {
    title: "A Second Publication or Working Paper Title",
    authors: "Collaborator One, Ryan [Last Name], and Collaborator Two",
    venue: "Conference, Journal, or Preprint, 2025",
    note: "Oral Presentation",
  },
  {
    title: "An Earlier Publication That Shows the Development of Your Work",
    authors: "Ryan [Last Name] and Collaborator One",
    venue: "Conference or Journal Name, 2024",
    note: "Published",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <header className="profile" aria-labelledby="profile-name">
        <div className="identity">
          <h1 id="profile-name">Kun Liu [刘坤]</h1>
          <p className="position">Ph.D. Student</p>
          <p className="affiliation">Tulane University / Department of computer science</p>

          <div className="profile-links" aria-label="Academic profile links">
            <a href="https://github.com/Ryan-hub-bit" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="#">Google Scholar</a>
            <a href="#">CV</a>
            <a href="mailto:your.email@university.edu">Email</a>
          </div>
        </div>

        <div className="portrait" role="img" aria-label="Placeholder for Ryan's portrait">
          <span>YOUR PHOTO</span>
        </div>
      </header>

      <div className="content-column">
        <section className="introduction" aria-label="Biography">
          <p>
            I am a Ph.D. student at <strong>[University / Institution]</strong>.
            My work focuses on <strong>[your broad research area]</strong>, with
            particular interests in [research interest one], [research interest
            two], and [research interest three].
          </p>
          <p>
            I study [the central question that motivates your research] using
            methods from [field or method one] and [field or method two]. My goal
            is to develop research that is theoretically grounded, methodologically
            careful, and useful beyond the academy. I welcome conversations and
            collaborations around these topics.
          </p>
        </section>

        <section className="content-section" id="news">
          <h2>News</h2>
          <ul className="news-list">
            {news.map((item) => (
              <li key={item.date}>
                <span>[{item.date}]</span> {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section className="content-section" id="publications">
          <div className="section-heading">
            <h2>Publications</h2>
            <a href="#">Full list on Google Scholar</a>
          </div>

          <div className="publication-list">
            {publications.map((publication) => (
              <article className="publication" key={publication.title}>
                <div className="paper-details">
                  <h3>{publication.title}</h3>
                  <p>{publication.authors}</p>
                  <p className="venue">{publication.venue}</p>
                  <div className="paper-actions" aria-label={`Links for ${publication.title}`}>
                    <a href="#">PDF</a>
                    <a href="#">Code</a>
                    <a href="#">Project</a>
                    <em>{publication.note}</em>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section service" id="service">
          <h2>Academic Service</h2>

          <h3>Conference Reviewers</h3>
          <ul>
            <li>Conference Name — Reviewer, 2025–2026</li>
            <li>Conference Name — Reviewer, 2024–2025</li>
          </ul>

          <h3>Journal Reviewers</h3>
          <ul>
            <li>Journal Name — Reviewer, 2025–Present</li>
            <li>Journal Name — Reviewer, 2024–Present</li>
          </ul>

          <h3>Teaching &amp; Mentoring</h3>
          <ul>
            <li>Course or mentoring role, University / Institution, 2025</li>
          </ul>
        </section>

        <footer>
          <p>Last updated July 2026</p>
          <p>
            <a href="https://github.com/Ryan-hub-bit" target="_blank" rel="noreferrer">
              github.com/Ryan-hub-bit
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
