import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const images = [
  ["RSTCON.jpg", "RSTCON 2026", "RSTCON 2026"],
  ["ICSE2027.jpg", "ICSE 2027", "ICSE 2027"],
  ["CCS2026.jpg", "ACM CCS 2026", "ACM CCS 2026"],
  ["Usenix26.jpg", "USENIX Security 2026", "USENIX Security 2026"],
  ["PLDISRC.jpg", "PLDI Student Research Competition", "PLDI 学生科研竞赛"],
];

for (const [locale, file, textIndex] of [["English", "index.html", 1], ["Chinese", "zh/index.html", 2]]) {
  test(`${locale} news maps all five image previews to the matching entries`, async () => {
    const html = await readFile(new URL(`../out/${file}`, import.meta.url), "utf8");
    const section = html.match(/<section[^>]*id="news"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(section);
    const entries = [...section.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((match) => match[1]);
    assert.equal(entries.length, images.length);
    for (const [index, image] of images.entries()) {
      assert.ok(entries[index].includes(image[textIndex]));
      assert.ok(entries[index].includes(`src="/news/${image[0]}"`));
      const thumbnail = entries[index].match(/(<button[^>]*class="news-thumbnail"[^>]*>)([\s\S]*?)<\/button>/);
      assert.ok(thumbnail, `Missing thumbnail button for ${image[0]}`);
      assert.match(thumbnail[1], /type="button"/);
      assert.match(thumbnail[1], /aria-haspopup="dialog"/);
      assert.match(thumbnail[1], locale === "English" ? /aria-label="View image: [^"]+"/ : /aria-label="查看图片: [^"]+"/);
      assert.match(thumbnail[2], /<img[^>]*class="news-thumbnail-image"/);
      assert.match(thumbnail[2], /<img[^>]*alt=""/);
      assert.match(thumbnail[2], /loading="lazy"/);
      assert.doesNotMatch(thumbnail[2], /<svg\b/);
      const thumbnailContents = thumbnail[2].replace(/<!--[\s\S]*?-->/g, "").trim();
      assert.match(thumbnailContents, /^<img\b[^>]*\/?\s*>$/, "The thumbnail button must contain only its image");
      const visibleText = thumbnailContents.replace(/<[^>]+>/g, "").trim();
      assert.equal(visibleText, "", "The thumbnail must not contain a visible text label");
    }
    assert.match(section, /aria-expanded="false"/);
    assert.match(section, /<div[^>]*hidden=""/);
  });
}

test("all original full-resolution news images are included unchanged in the export", async () => {
  for (const [filename] of images) {
    const original = await readFile(new URL(`../public/news/${filename}`, import.meta.url));
    const exported = await readFile(new URL(`../out/news/${filename}`, import.meta.url));
    assert.ok(original.length > 0);
    assert.deepEqual(exported, original);
  }
});
