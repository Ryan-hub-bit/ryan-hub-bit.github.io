import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { formatLastUpdated } from "../app/site-updated.mjs";

test("formats the update month in English and Chinese", () => {
  assert.deepEqual(formatLastUpdated(new Date("2026-11-10T18:00:00.000Z")), {
    dateTime: "2026-11",
    en: "Last updated November 2026",
    zh: "最近更新：2026 年 11 月",
  });
});

test("changes the month and year at Chicago midnight in winter", () => {
  assert.deepEqual(formatLastUpdated(new Date("2027-01-01T05:59:59.999Z")), {
    dateTime: "2026-12",
    en: "Last updated December 2026",
    zh: "最近更新：2026 年 12 月",
  });
  assert.deepEqual(formatLastUpdated(new Date("2027-01-01T06:00:00.000Z")), {
    dateTime: "2027-01",
    en: "Last updated January 2027",
    zh: "最近更新：2027 年 1 月",
  });
});

test("changes the month at Chicago midnight during daylight saving time", () => {
  assert.deepEqual(formatLastUpdated(new Date("2026-07-01T04:59:59.999Z")), {
    dateTime: "2026-06",
    en: "Last updated June 2026",
    zh: "最近更新：2026 年 6 月",
  });
  assert.deepEqual(formatLastUpdated(new Date("2026-07-01T05:00:00.000Z")), {
    dateTime: "2026-07",
    en: "Last updated July 2026",
    zh: "最近更新：2026 年 7 月",
  });
});

test("exports matching bilingual footer dates without depending on the test-run month", async () => {
  const exportedMonths = [];
  for (const [path, language] of [
    ["../out/index.html", "en"],
    ["../out/zh/index.html", "zh"],
  ]) {
    const html = await readFile(new URL(path, import.meta.url), "utf8");
    const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
    assert.ok(footer, language + " footer");
    const times = [...footer.matchAll(/<time\b([^>]*)>([\s\S]*?)<\/time>/g)];
    assert.equal(times.length, 1, language + " update time");
    const [, attributes, content] = times[0];
    const dateTime = attributes.match(/\bdatetime="([^"]*)"/i)?.[1];
    assert.match(dateTime ?? "", /^\d{4}-(0[1-9]|1[0-2])$/);
    const expected = formatLastUpdated(new Date(dateTime + "-01T12:00:00.000Z"));
    assert.equal(expected.dateTime, dateTime);
    assert.equal(content.replace(/<!--.*?-->|<[^>]+>/g, ""), expected[language]);
    exportedMonths.push(dateTime);
  }
  assert.equal(exportedMonths[0], exportedMonths[1]);
});
