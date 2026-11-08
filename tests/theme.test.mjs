import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const en = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
const zh = await readFile(new URL("../out/zh/index.html", import.meta.url), "utf8");
const init = en.match(/<script\b[^>]*id="theme-init"[^>]*>([\s\S]*?)<\/script>/)?.[1];

test("exports a light no-script fallback and localized theme buttons beside the language link", () => {
  for (const [html, label] of [[en, "Switch to dark mode"], [zh, "切换到夜间模式"]]) {
    assert.match(html, /<html[^>]*data-theme="light"/);
    const actions = html.match(/<div class="nav-actions">([\s\S]*?)<\/div>/)?.[1];
    assert.ok(actions);
    assert.match(actions, /class="language-switch"/);
    assert.match(actions, /<button[^>]*class="theme-toggle"[^>]*type="button"/);
    assert.ok(actions.includes(`aria-label="${label}"`));
    assert.ok(actions.indexOf("language-switch") < actions.indexOf("theme-toggle"));
    assert.ok(html.indexOf('id="theme-init"') < html.indexOf("<body"));
  }
});

function initialTheme(hour, savedValue = null, storageBlocked = false) {
  assert.ok(init);
  const document = { documentElement: { dataset: { theme: "light" } } };
  vm.runInNewContext(init, {
    document,
    Date: class { getHours() { return hour; } },
    localStorage: {
      getItem(key) {
        if (storageBlocked) throw new Error("Storage unavailable");
        assert.equal(key, "kun-liu-theme");
        return savedValue;
      },
    },
    matchMedia() { throw new Error("System appearance must not override the local clock"); },
  });
  return document.documentElement.dataset.theme;
}

test("uses the visitor's local hour at both day/night boundaries", () => {
  for (let hour = 0; hour < 24; hour++) {
    assert.equal(initialTheme(hour), hour >= 7 && hour < 19 ? "light" : "dark", `Hour ${hour}`);
  }
});

test("restores either explicit choice before the page paints", () => {
  assert.equal(initialTheme(12, "dark"), "dark");
  assert.equal(initialTheme(23, "light"), "light");
});

test("uses the local clock when browser storage is unavailable or invalid", () => {
  for (const [hour, theme] of [[12, "light"], [23, "dark"]]) {
    assert.equal(initialTheme(hour, null, true), theme);
    assert.equal(initialTheme(hour, "invalid"), theme);
  }
});
