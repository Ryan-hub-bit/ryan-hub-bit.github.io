"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useId, useMemo, useRef, useState, type ReactNode } from "react";
import ImagePreview, { type PreviewImage } from "./image-preview";

type NewsItem = {
  date: string;
  dateTime: string;
  text: string;
  emphasis?: string;
  inlineLinks?: { text: string; url: string }[];
  link?: {
    text: string;
    url: string;
  };
  emphasisLink?: {
    text: string;
    url: string;
  };
  image?: PreviewImage;
};

const VISIBLE_ITEMS = 4;

function linkedText(text: string, links: NewsItem["inlineLinks"]) {
  if (!links?.length) return text;

  const matches = links
    .map((link) => ({ ...link, index: text.indexOf(link.text) }))
    .filter((link) => link.index >= 0)
    .sort((a, b) => a.index - b.index);
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const link of matches) {
    if (link.index < cursor) continue;
    parts.push(text.slice(cursor, link.index));
    parts.push(
      <a key={`${link.index}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
        {link.text}
      </a>,
    );
    cursor = link.index + link.text.length;
  }
  parts.push(text.slice(cursor));
  return parts;
}

function NewsContent({ item, language, onPreview }: {
  item: NewsItem;
  language: "en" | "zh";
  onPreview: (image: PreviewImage, trigger: HTMLButtonElement) => void;
}) {
  const emphasisIndex = item.emphasis ? item.text.indexOf(item.emphasis) : -1;
  const itemImage = item.image;

  return (
    <span className="news-entry-content">
      {itemImage && (
        <button
          className="news-thumbnail"
          type="button"
          aria-haspopup="dialog"
          aria-label={`${language === "zh" ? "查看图片" : "View image"}: ${itemImage.alt}`}
          title={language === "zh" ? "查看完整图片" : "View full-size image"}
          onClick={(event) => onPreview(itemImage, event.currentTarget)}
        >
          <Image
            className="news-thumbnail-image"
            src={itemImage.src}
            alt=""
            width={itemImage.width}
            height={itemImage.height}
            unoptimized
          />
        </button>
      )}
      {item.emphasis && emphasisIndex >= 0 ? (
        <>
          {linkedText(item.text.slice(0, emphasisIndex), item.inlineLinks)}
          <strong>{item.emphasis}</strong>
          {item.emphasisLink && (
            <>
              {language === "zh" ? "（" : " ("}
              <a href={item.emphasisLink.url} target="_blank" rel="noreferrer">
                {item.emphasisLink.text}
              </a>
              {language === "zh" ? "）" : ")"}
            </>
          )}
          {linkedText(item.text.slice(emphasisIndex + item.emphasis.length), item.inlineLinks)}
        </>
      ) : linkedText(item.text, item.inlineLinks)}
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
  const [activeImage, setActiveImage] = useState<PreviewImage | null>(null);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);
  const archiveId = useId();
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => b.dateTime.localeCompare(a.dateTime)),
    [items],
  );
  const recentItems = sortedItems.slice(0, VISIBLE_ITEMS);
  const earlierItems = sortedItems.slice(VISIBLE_ITEMS);

  function openPreview(image: PreviewImage, trigger: HTMLButtonElement) {
    previewTriggerRef.current = trigger;
    setActiveImage(image);
  }

  return (
    <div className="news-feed">
      <ul className="news-list">
        {recentItems.map((item) => (
          <li key={`${item.dateTime}-${item.text}`}>
            <time dateTime={item.dateTime}>[{item.date}]</time>
            <NewsContent item={item} language={language} onPreview={openPreview} />
          </li>
        ))}
      </ul>
      <div id={archiveId} hidden={!expanded}>
        {earlierItems.length > 0 ? (
          <ul className="news-list">
            {earlierItems.map((item) => (
              <li key={`${item.dateTime}-${item.text}`}>
                <time dateTime={item.dateTime}>[{item.date}]</time>
                <NewsContent item={item} language={language} onPreview={openPreview} />
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
      <ImagePreview
        image={activeImage}
        language={language}
        triggerRef={previewTriggerRef}
        onClose={() => setActiveImage(null)}
      />
    </div>
  );
}
