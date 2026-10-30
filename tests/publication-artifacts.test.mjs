import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const CCS_TITLE = "Long-Range Indirect Control-Flow Prediction in Stripped Binaries via Dual Virtual Hubs and Multi-Task Graph Learning";
const ICSE_TITLE = "Beyond Tokens: NumAnchor for Address-Grounded Numeric Operand Representation in Assembly Language Models";
const ARTIFACT_TEXT = "🎀 ACM Artifact Badges: Available, Functional";
const ARTIFACT_URL = "https://cs.tulane.edu/~jming/publication/icflownet-ccs26/";

const attributes = (tag) => Object.fromEntries(
  [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]),
);
const withoutComments = (html) => html.replace(/<!--[\s\S]*?-->/g, "");
const visibleText = (html) => withoutComments(html).replace(/<[^>]+>/g, "").trim();
const artifactLinks = (html) => [...html.matchAll(/(<a\b[^>]*>)([\s\S]*?)<\/a>/g)]
  .map((match) => ({ attributes: attributes(match[1]), text: visibleText(match[2]), index: match.index }))
  .filter((link) => link.attributes.class?.split(/\s+/).includes("artifact-badge-link"));

for (const [locale, file] of [["English", "index.html"], ["Chinese", "zh/index.html"]]) {
  test(`${locale} adds the English artifact badge link only after the CCS title`, async () => {
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
    assert.equal(artifactLinks(main).length, 1, "Only the CCS publication should have an artifact badge link");
    assert.equal(artifactLinks(icse).length, 0, "The ICSE publication must remain without an artifact badge link");

    const heading = ccs.match(/(<h3\b[^>]*>)([\s\S]*?)<\/h3>/);
    assert.ok(heading, "Missing CCS publication heading");
    assert.equal(attributes(heading[1]).lang, "en", "The title and artifact badge text stay English in both locales");
    const links = artifactLinks(heading[2]);
    assert.equal(links.length, 1, "The artifact link must be inside the same heading as the CCS title");
    const [link] = links;
    assert.equal(link.text, ARTIFACT_TEXT);
    assert.equal(link.attributes.href, ARTIFACT_URL);
    assert.equal(link.attributes.target, "_blank");
    const rel = new Set((link.attributes.rel ?? "").split(/\s+/));
    assert.ok(rel.has("noopener") || rel.has("noreferrer"), "The new-tab link must prevent access to its opener");

    const titleIndex = heading[2].indexOf(CCS_TITLE);
    assert.ok(titleIndex >= 0, "The original CCS title must remain in its heading");
    const titleEnd = titleIndex + CCS_TITLE.length;
    assert.ok(link.index >= titleEnd, "The artifact link must follow the CCS title");
    assert.equal(withoutComments(heading[2].slice(titleEnd, link.index)).trim(), "", "Only inline whitespace may separate the CCS title and artifact link");
    const authors = ccs.match(/<p\b[^>]*class="authors"[^>]*>/);
    assert.ok(authors, "Missing CCS authors");
    assert.ok(authors.index >= heading.index + heading[0].length, "The artifact link and title must precede the authors");

    const icseHeading = icse.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/)?.[1];
    assert.ok(icseHeading && visibleText(icseHeading).endsWith(ICSE_TITLE), "The ICSE title must remain unchanged");
  });
}
