import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const images = [
  ["RSTCON.jpg", "RSTCON 2026", "RSTCON 2026"],
  ["ICSE2027.png", "ICSE 2027", "ICSE 2027"],
  ["CCS2026.png", "ACM CCS 2026", "ACM CCS 2026"],
  ["Usenix26.png", "USENIX Security 2026", "USENIX Security 2026"],
  ["PLDISRC.png", "PLDI Student Research Competition", "PLDI 学生科研竞赛"],
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
      assert.match(entries[index], /<button[^>]*class="news-thumbnail"[^>]*>/);
      assert.match(entries[index], /aria-haspopup="dialog"/);
      assert.match(entries[index], /aria-label="(?:View image|查看图片): [^"]+"/);
      assert.match(entries[index], /<img[^>]*alt=""/);
      assert.match(entries[index], /loading="lazy"/);
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
