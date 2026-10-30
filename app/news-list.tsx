"use client";

import { ChevronDown, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";

type NewsItem = {
  date: string;
  dateTime: string;
  text: string;
  emphasis?: string;
  link?: {
    text: string;
    url: string;
  };
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

type NewsImage = NonNullable<NewsItem["image"]>;

const VISIBLE_ITEMS = 3;

function NewsContent({ item, language, onPreview }: {
  item: NewsItem;
  language: "en" | "zh";
  onPreview: (image: NewsImage, trigger: HTMLButtonElement) => void;
}) {
  const emphasisIndex = item.emphasis ? item.text.indexOf(item.emphasis) : -1;
  const itemImage = item.image;

  return (
    <span className="news-entry-content">
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
      {itemImage && (
        <>
          {" "}
          <button
            className="news-thumbnail"
            type="button"
            aria-haspopup="dialog"
            aria-label={`${language === "zh" ? "查看图片" : "View image"}: ${itemImage.alt}`}
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
            <span className="news-thumbnail-cue">
              <ZoomIn aria-hidden="true" />
              {language === "zh" ? "查看图片" : "View image"}
            </span>
          </button>
        </>
      )}
    </span>
  );
}

export default function NewsList({ items, language = "en" }: { items: NewsItem[]; language?: "en" | "zh" }) {
  const [expanded, setExpanded] = useState(false);
  const [activeImage, setActiveImage] = useState<NewsImage | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);
  const archiveId = useId();
  const imageTitleId = useId();
  const imageHintId = useId();
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => b.dateTime.localeCompare(a.dateTime)),
    [items],
  );
  const recentItems = sortedItems.slice(0, VISIBLE_ITEMS);
  const earlierItems = sortedItems.slice(VISIBLE_ITEMS);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!activeImage || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = previewTriggerRef.current;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [activeImage]);

  function openPreview(image: NewsImage, trigger: HTMLButtonElement) {
    previewTriggerRef.current = trigger;
    setZoomed(false);
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
      <dialog
        ref={dialogRef}
        className="news-image-dialog"
        aria-labelledby={imageTitleId}
        aria-describedby={imageHintId}
        onClose={() => {
          setActiveImage(null);
          setZoomed(false);
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom
          ) {
            event.currentTarget.close();
          }
        }}
      >
        {activeImage && (
          <>
            <div className="news-image-toolbar">
              <h3 id={imageTitleId} className="news-image-title">
                {activeImage.alt}
              </h3>
              <div className="news-image-actions">
                <button
                  className="news-image-zoom"
                  type="button"
                  aria-pressed={zoomed}
                  onClick={() => setZoomed((current) => !current)}
                >
                  {language === "zh" ? "原始尺寸" : "Actual size"}
                </button>
                <a
                  className="news-image-original"
                  href={activeImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={language === "zh" ? "在新标签页中打开原图" : "Open original image in a new tab"}
                >
                  {language === "zh" ? "打开原图" : "Open original"}
                </a>
                <button
                  className="news-image-close"
                  ref={closeButtonRef}
                  type="button"
                  autoFocus
                  onClick={() => dialogRef.current?.close()}
                >
                  {language === "zh" ? "关闭" : "Close"}
                </button>
              </div>
            </div>
            <div
              className={`news-image-viewport${zoomed ? " is-zoomed" : ""}`}
              tabIndex={zoomed ? 0 : undefined}
              role={zoomed ? "region" : undefined}
              aria-label={zoomed ? (language === "zh" ? "原始尺寸图片，可滚动查看" : "Actual-size image; scroll to explore") : undefined}
            >
              <Image
                className={`news-image-full${zoomed ? " is-zoomed" : ""}`}
                src={activeImage.src}
                alt={activeImage.alt}
                width={activeImage.width}
                height={activeImage.height}
                loading="eager"
                unoptimized
              />
            </div>
            <p id={imageHintId} className="news-image-hint">
              {language === "zh"
                ? "选择“原始尺寸”后可滚动查看细节。按 Esc 键或点击图片框外关闭。"
                : "Select Actual size and scroll to inspect details. Press Escape or click outside to close."}
            </p>
          </>
        )}
      </dialog>
    </div>
  );
}
