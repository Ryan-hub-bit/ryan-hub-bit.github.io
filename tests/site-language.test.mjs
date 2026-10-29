import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const en = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
const zh = await readFile(new URL("../out/zh/index.html", import.meta.url), "utf8");
const main = (html) => html.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0] ?? "";
const text = (html) => main(html).replace(/<!--.*?-->|<[^>]+>/g, "");
const attributes = (tag) => Object.fromEntries(
  [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]),
);
const links = (html) => [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));

test("exports both language pages with reciprocal, accessible switch links", () => {
  for (const [html, lang, target, label, buttonText] of [
    [en, "en", "/zh/", "切换到中文", "中"],
    [zh, "zh-CN", "/", "Switch to English", "EN"],
  ]) {
    assert.match(main(html), new RegExp(`<main[^>]*lang="${lang}"`));
    const switchLink = main(html).match(/<a\b[^>]*class="language-switch"[^>]*>[\s\S]*?<\/a>/)?.[0];
    assert.ok(switchLink);
    assert.equal(attributes(switchLink).href, target);
    assert.equal(attributes(switchLink)["aria-label"], label);
    assert.ok(switchLink.includes(`>${buttonText}</a>`));
  }
});

test("translates every main content section, including the newest remote updates", () => {
  for (const heading of ["关于我", "近期研究方向", "最新动态", "学术论文", "海报展示", "受邀报告", "获奖情况", "教学经历", "学术服务"]) {
    assert.match(zh, new RegExp(`<h2[^>]*>${heading}</h2>`));
  }
  for (const phrase of ["博士学习的最后一年", "智能体系统", "第一名", "长聘轨助理教授", "最近更新：2026 年 10 月"]) {
    assert.ok(text(zh).includes(phrase), phrase);
  }
  assert.ok(text(en).includes("I am a final-year Ph.D. student"));
  assert.ok(text(en).includes("I won 1st place"));
  assert.ok(text(en).includes("Invited Talks"));
  assert.ok(text(en).includes("Teaching"));
});

test("lists the Wuhan University school and October 2026 talk after RSTCON in both languages", () => {
  for (const [html, title, institution, date] of [
    [en, "Can AI Reverse-Engineer Everything? From Incomplete Program Maps to More Reliable Binary Analysis", "School of Cyber Science and Engineering, Wuhan University", "Oct. 2026"],
    [zh, "AI 能逆向一切吗？从不完整的程序地图到更可靠的二进制分析", "武汉大学国家网络安全学院", "2026 年 10 月"],
  ]) {
    const section = main(html).match(/<section[^>]*id="invited-talks"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(section);
    const entries = [...section.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((match) => match[1]);
    assert.equal(entries.length, 2);
    assert.ok(entries[0].includes("RSTCON"));
    assert.ok(entries[0].includes("2026"));
    assert.ok(entries[1].includes(title));
    assert.ok(entries[1].includes(institution));
    assert.ok(entries[1].includes(date));
  }
});

test("keeps original paper titles, publication authors, and numeric evidence shared", () => {
  const titles = (html) => [...html.matchAll(/<h3 lang="en">([\s\S]*?)<\/h3>/g)].map((match) => match[1]);
  const authors = (html) => [...html.matchAll(/<p class="authors" lang="en">([\s\S]*?)<\/p>/g)].map((match) => match[1]);
  assert.equal(titles(en).length, 4);
  assert.deepEqual(titles(zh), titles(en));
  assert.equal(authors(en).length, 2);
  assert.deepEqual(authors(zh), authors(en));
  for (const html of [en, zh]) {
    assert.ok(text(html).includes("5.0%=119/2375"));
    assert.ok(text(html).includes("8.4%=183/2188 (Cycle B)"));
    assert.ok(text(html).includes("kliu14 [AT] tulane.edu"));
    assert.ok(!main(html).includes("mailto:"));
  }
});

test("keeps the news archive collapsed and localizes its controls", () => {
  for (const [html, label] of [[en, "More news"], [zh, "更多动态"]]) {
    const news = main(html).match(/<section[^>]*id="news"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(news);
    assert.equal([...news.matchAll(/<time\b/g)].length, 5);
    assert.match(news, /<div[^>]*hidden=""/);
    assert.match(news, /aria-expanded="false"/);
    assert.ok(news.includes(label));
  }
});

test("exports separate canonical URLs and bilingual search metadata", () => {
  assert.equal(links(zh).find((link) => link.rel === "canonical")?.href, "https://ryan-hub-bit.github.io/zh/");
  assert.match(zh, /<title>刘坤\u2003\|\u2003欢迎！<\/title>/);
  for (const html of [en, zh]) {
    assert.ok(links(html).some((link) => link.hrefLang === "zh-CN" && link.href === "https://ryan-hub-bit.github.io/zh/"));
    assert.ok(links(html).some((link) => link.hrefLang === "en" && link.href === "https://ryan-hub-bit.github.io/"));
  }
});
