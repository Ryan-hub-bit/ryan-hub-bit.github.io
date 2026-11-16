import Image from "next/image";
import { useEffect, useId, useRef, useState, type MouseEvent, type RefObject } from "react";

export type PreviewImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function isBackdropClick(event: MouseEvent<HTMLDialogElement>) {
  if (event.target !== event.currentTarget) return false;

  const bounds = event.currentTarget.getBoundingClientRect();
  return (
    event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom
  );
}

export default function ImagePreview({ image, language, triggerRef, onClose }: {
  image: PreviewImage | null;
  language: "en" | "zh";
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageTitleId = useId();
  const imageHintId = useId();
  const isChinese = language === "zh";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!image || !dialog) return;

    const trigger = triggerRef.current;
    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) dialog.close();
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [image, triggerRef]);

  function dismiss() {
    setZoomed(false);
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="image-dialog"
      aria-labelledby={imageTitleId}
      aria-describedby={imageHintId}
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (isBackdropClick(event)) dismiss();
      }}
    >
      {image && (
        <>
          <div className="image-dialog-toolbar">
            <h3 id={imageTitleId} className="image-dialog-title">{image.alt}</h3>
            <div className="image-dialog-actions">
              <button
                className="image-dialog-zoom"
                type="button"
                aria-pressed={zoomed}
                onClick={() => setZoomed((current) => !current)}
              >
                {isChinese ? "原始尺寸" : "Actual size"}
              </button>
              <a
                className="image-dialog-original"
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isChinese ? "在新标签页中打开原图" : "Open original image in a new tab"}
              >
                {isChinese ? "打开原图" : "Open original"}
              </a>
              <button
                className="image-dialog-close"
                ref={closeButtonRef}
                type="button"
                autoFocus
                onClick={dismiss}
              >
                {isChinese ? "关闭" : "Close"}
              </button>
            </div>
          </div>
          <div
            className={`image-dialog-viewport${zoomed ? " is-zoomed" : ""}`}
            tabIndex={zoomed ? 0 : undefined}
            role={zoomed ? "region" : undefined}
            aria-label={zoomed ? (isChinese ? "原始尺寸图片，可滚动查看" : "Actual-size image; scroll to explore") : undefined}
          >
            <Image
              className={`image-dialog-full${zoomed ? " is-zoomed" : ""}`}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="eager"
              unoptimized
            />
          </div>
          <p id={imageHintId} className="image-dialog-hint">
            {isChinese
              ? "选择“原始尺寸”后可滚动查看细节。按 Esc 键或点击图片框外关闭。"
              : "Select Actual size and scroll to inspect details. Press Escape or click outside to close."}
          </p>
        </>
      )}
    </dialog>
  );
}
