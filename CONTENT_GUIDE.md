# Content guide

The shared English and Chinese homepage content is kept in `app/home-content.tsx`. `app/page.tsx` renders the English homepage, and `app/zh/page.tsx` renders the Chinese version at `/zh/`. Keep both languages in sync when editing the biography, news, teaching, or service entries. Paper titles, author lists, and acceptance counts are shared between both versions.

The top-right language link switches between the two static pages, so the selected language remains available when the page is refreshed. Chinese content is marked with `lang="zh-CN"`; original English paper titles, author lists, and proceedings names retain `lang="en"`.

- `Ryan [Full Name]`: full name
- `your.email@university.edu`: email address
- `[your current position]`: current role
- `[University or Institution]`: current affiliation
- The introductory paragraphs: biography and research interests
- `news`: recent academic updates
- `publications`: publication entries
- The Academic Service section: reviewing, teaching, and mentoring

## Portrait and CV

The portrait is stored at `public/profile.png`. The CV control in `app/home-content.tsx` is currently disabled; when a CV is ready, place it at `public/cv.pdf` and replace the disabled control with a link.

## GitHub Pages

Push the project to a GitHub repository, open **Settings → Pages**, and select **GitHub Actions** as the source. Every push to the `main` branch will publish the latest version.
