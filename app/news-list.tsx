"use client";

import { useLayoutEffect, useMemo, useRef } from "react";

type NewsItem = {
  date: string;
  dateTime: string;
  text: string;
};

const VISIBLE_ITEMS = 3;

export default function NewsList({ items }: { items: NewsItem[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => b.dateTime.localeCompare(a.dateTime)),
    [items],
  );

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return;

    const visibleRows = Array.from(list.children).slice(0, VISIBLE_ITEMS);
    const updateHeight = () => {
      const lastRow = visibleRows[visibleRows.length - 1];
      if (!lastRow) return;
      // Measure complete entries, including wrapped text, at every screen size.
      const height = lastRow.getBoundingClientRect().bottom - list.getBoundingClientRect().top;
      viewport.style.maxHeight = `${Math.ceil(height) + viewport.clientTop * 2}px`;
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(list);
    visibleRows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [sortedItems]);

  return (
    <div
      ref={viewportRef}
      className="news-scroll"
      role="region"
      aria-labelledby="news-heading"
      tabIndex={items.length > VISIBLE_ITEMS ? 0 : undefined}
    >
      <ul ref={listRef} className="news-list">
        {sortedItems.map((item) => (
          <li key={`${item.dateTime}-${item.text}`}>
            <time dateTime={item.dateTime}>[{item.date}]</time>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
