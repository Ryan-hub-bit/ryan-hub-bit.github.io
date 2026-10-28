"use client";

import { ChevronDown } from "lucide-react";
import { useId, useMemo, useState } from "react";

type NewsItem = {
  date: string;
  dateTime: string;
  text: string;
  emphasis?: string;
  link?: {
    text: string;
    url: string;
  };
};

const VISIBLE_ITEMS = 3;

function NewsContent({ item, language }: { item: NewsItem; language: "en" | "zh" }) {
  const emphasisIndex = item.emphasis ? item.text.indexOf(item.emphasis) : -1;

  return (
    <span>
      {item.emphasis && emphasisIndex >= 0 ? (
        <>
          {item.text.slice(0, emphasisIndex)}
          <strong>{item.emphasis}</strong>
          {item.text.slice(emphasisIndex + item.emphasis.length)}
        </>
      ) : item.text}
      {item.link && (
        <>
          {" "}
          <a href={item.link.url} target="_blank" rel="noreferrer">
            {item.link.text}
          </a>
          {language === "zh" ? "。" : "."}
        </>
      )}
    </span>
  );
}

export default function NewsList({ items, language = "en" }: { items: NewsItem[]; language?: "en" | "zh" }) {
  const [expanded, setExpanded] = useState(false);
  const archiveId = useId();
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => b.dateTime.localeCompare(a.dateTime)),
    [items],
  );
  const recentItems = sortedItems.slice(0, VISIBLE_ITEMS);
  const earlierItems = sortedItems.slice(VISIBLE_ITEMS);

  return (
    <div className="news-feed">
      <ul className="news-list">
        {recentItems.map((item) => (
          <li key={`${item.dateTime}-${item.text}`}>
            <time dateTime={item.dateTime}>[{item.date}]</time>
            <NewsContent item={item} language={language} />
          </li>
        ))}
      </ul>
      <div id={archiveId} hidden={!expanded}>
        {earlierItems.length > 0 ? (
          <ul className="news-list">
            {earlierItems.map((item) => (
              <li key={`${item.dateTime}-${item.text}`}>
                <time dateTime={item.dateTime}>[{item.date}]</time>
                <NewsContent item={item} language={language} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="news-empty">{language === "zh" ? "暂无更早的动态。" : "No earlier news to display."}</p>
        )}
      </div>
      <button
        className="news-toggle"
        type="button"
        aria-expanded={expanded}
        aria-controls={archiveId}
        onClick={() => setExpanded((current) => !current)}
      >
        {language === "zh" ? (expanded ? "收起动态" : "更多动态") : (expanded ? "Less news" : "More news")}
        <ChevronDown aria-hidden="true" />
      </button>
    </div>
  );
}
