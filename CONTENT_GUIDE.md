# Content guide

The shared English and Chinese homepage content is kept in `app/home-content.tsx`. `app/page.tsx` renders the English homepage, and `app/zh/page.tsx` renders the Chinese version at `/zh/`. Keep both languages in sync when editing the biography, news, teaching, or service entries. Paper titles, author lists, and acceptance counts are shared between both versions.

The top-right language link switches between the two static pages, so the selected language remains available when the page is refreshed. Chinese content is marked with `lang="zh-CN"`; original English paper titles, author lists, and proceedings names retain `lang="en"`.

News images are stored in `public/news/`. Each news item's `image` contains its path, English description, and original pixel dimensions; `imageAltZh` supplies the Chinese description. Keep the inline image preview small and include its visible zoom icon and localized View image label. The preview button opens a full-image dialog that fits the image to the window by default, with an actual-size toggle and a link to the original. Only the three newest news items are initially shown; older images appear when More news is expanded. Images in this folder are publicly downloadable, so review screenshots for private information before adding them.

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
