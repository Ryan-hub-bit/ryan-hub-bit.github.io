import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const CCS_TITLE = "Long-Range Indirect Control-Flow Prediction in Stripped Binaries via Dual Virtual Hubs and Multi-Task Graph Learning";
const ICSE_TITLE = "Beyond Tokens: NumAnchor for Address-Grounded Numeric Operand Representation in Assembly Language Models";
const ARTIFACT_TEXT = "🎀 ACM Artifact Badges: Available, Functional";
const ARTIFACT_URL = "https://cs.tulane.edu/~jming/publication/icflownet-ccs26/";

const attributes = (tag) => Object.fromEntries(
  [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1].toLowerCase(), match[2]]),
);
const withoutComments = (html) => html.replace(/<!--[\s\S]*?-->/g, "");
const visibleText = (html) => withoutComments(html).replace(/<[^>]+>/g, "").trim();
const artifactBadges = (html) => [...html.matchAll(/(<span\b[^>]*>)([\s\S]*?)<\/span>/g)]
  .map((match) => ({ attributes: attributes(match[1]), openingTag: match[1], content: match[2], text: visibleText(match[2]), index: match.index }))
  .filter((badge) => badge.attributes.class?.split(/\s+/).includes("artifact-badge"));

for (const [locale, file] of [["English", "index.html"], ["Chinese", "zh/index.html"]]) {
  test(`${locale} adds a noninteractive English artifact badge only after the CCS title`, async () => {
    const html = await readFile(new URL(`../out/${file}`, import.meta.url), "utf8");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert.ok(main, "Missing homepage main content");
    const section = main.match(/<section[^>]*id="publications"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(section, "Missing publications section");
    const articles = [...section.matchAll(/<article\b[^>]*class="publication"[^>]*>([\s\S]*?)<\/article>/g)]
      .map((match) => match[1]);
    const ccs = articles.find((article) => article.includes(CCS_TITLE));
    const icse = articles.find((article) => article.includes(ICSE_TITLE));
    assert.ok(ccs, "Missing CCS publication");
    assert.ok(icse, "Missing ICSE publication");
    assert.equal(artifactBadges(main).length, 1, "Only the CCS publication should have an artifact badge span");
    assert.equal(artifactBadges(icse).length, 0, "The ICSE publication must remain without an artifact badge");
    assert.equal(visibleText(main).split(ARTIFACT_TEXT).length - 1, 1, "The artifact badge text should appear only once");
    assert.ok(!main.includes(ARTIFACT_URL), "The former artifact URL must not remain in the main markup");
    assert.doesNotMatch(main, /class="[^"]*\bartifact-badge-link\b[^"]*"/, "The former artifact hyperlink must be removed");
    for (const interactive of main.matchAll(/<(a|button)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
      assert.ok(!visibleText(interactive[2]).includes(ARTIFACT_TEXT), "The badge must not be wrapped in a link or button");
    }

    const heading = ccs.match(/(<h3\b[^>]*>)([\s\S]*?)<\/h3>/);
    assert.ok(heading, "Missing CCS publication heading");
    assert.equal(attributes(heading[1]).lang, "en", "The title and artifact badge text stay English in both locales");
    const badges = artifactBadges(heading[2]);
    assert.equal(badges.length, 1, "The artifact badge span must be inside the same heading as the CCS title");
    const [badge] = badges;
    assert.equal(badge.text, ARTIFACT_TEXT);
    assert.equal(badge.attributes.href, undefined, "The badge must not have an href");
    assert.equal(badge.attributes.tabindex, undefined, "The plain-text badge must not enter the tab order");
    assert.doesNotMatch(badge.openingTag, /\s(?:href|tabindex)(?:\s|=|>)/i);
    assert.doesNotMatch(badge.attributes.role ?? "", /(?:^|\s)(?:link|button)(?:\s|$)/i, "The badge must not have an interactive role");
    assert.doesNotMatch(badge.content, /<(?:a|button)\b/i, "The badge must not contain links or buttons");

    const titleIndex = heading[2].indexOf(CCS_TITLE);
    assert.ok(titleIndex >= 0, "The original CCS title must remain in its heading");
    const titleEnd = titleIndex + CCS_TITLE.length;
    assert.ok(badge.index >= titleEnd, "The artifact badge must follow the CCS title");
    assert.equal(withoutComments(heading[2].slice(titleEnd, badge.index)).trim(), "", "Only inline whitespace may separate the CCS title and artifact badge");
    const authors = ccs.match(/<p\b[^>]*class="authors"[^>]*>/);
    assert.ok(authors, "Missing CCS authors");
    assert.ok(authors.index >= heading.index + heading[0].length, "The artifact badge and title must precede the authors");

    const icseHeading = icse.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/)?.[1];
    assert.ok(icseHeading && visibleText(icseHeading).endsWith(ICSE_TITLE), "The ICSE title must remain unchanged");
  });
}
