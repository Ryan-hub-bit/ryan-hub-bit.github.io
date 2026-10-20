"use client";

import { ChevronDown } from "lucide-react";
import { useId, useMemo, useState } from "react";

type NewsItem = {
  date: string;
  dateTime: string;
  text: string;
};

const VISIBLE_ITEMS = 3;

export default function NewsList({ items }: { items: NewsItem[] }) {
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
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <div id={archiveId} hidden={!expanded}>
        {earlierItems.length > 0 ? (
          <ul className="news-list">
            {earlierItems.map((item) => (
              <li key={`${item.dateTime}-${item.text}`}>
                <time dateTime={item.dateTime}>[{item.date}]</time>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="news-empty">No earlier news to display.</p>
        )}
      </div>
      <button
        className="news-toggle"
        type="button"
        aria-expanded={expanded}
        aria-controls={archiveId}
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? "Less news" : "More news"}
        <ChevronDown aria-hidden="true" />
      </button>
    </div>
  );
}
