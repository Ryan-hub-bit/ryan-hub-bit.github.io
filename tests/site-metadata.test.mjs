import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]),
  );
}

const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
const metadata = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));

test("exports a consistent personal site name and canonical URL", () => {
  const structuredData = [...html.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )].map(([, json]) => JSON.parse(json));
  const websites = structuredData.filter((item) => item["@type"] === "WebSite");

  assert.equal(websites.length, 1);
  assert.equal(websites[0].name, "Kun Liu");
  assert.equal(websites[0].url, "https://ryan-hub-bit.github.io/");
  assert.equal(metadata.find((item) => item.property === "og:site_name")?.content, "Kun Liu");
  assert.equal(metadata.find((item) => item.name === "application-name")?.content, "Kun Liu");
  assert.equal(links.find((item) => item.rel === "canonical")?.href, websites[0].url);
  assert.ok(html.includes("<title>Kun Liu\u2003|\u2003Welcome!</title>"));
});

test("exports the portrait favicon as a square PNG for static hosting", async () => {
  const icons = links.filter((item) => item.rel === "icon");
  assert.equal(icons.length, 1);
  assert.equal(icons[0].href, "/portrait-icon.png");
  assert.equal(icons[0].type, "image/png");
  assert.equal(icons[0].sizes, "96x96");
  assert.ok(!html.includes("blank-icon.svg"));

  const icon = await readFile(new URL("../out/portrait-icon.png", import.meta.url));
  assert.deepEqual([...icon.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(icon.readUInt32BE(16), 96);
  assert.equal(icon.readUInt32BE(20), 96);
});
