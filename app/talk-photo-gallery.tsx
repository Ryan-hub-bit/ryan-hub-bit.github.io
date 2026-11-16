"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import ImagePreview, { isBackdropClick, type PreviewImage } from "./image-preview";

type TalkPhoto = PreviewImage & { label: string; thumbnailSrc: string };

export default function TalkPhotoGallery({ photos, language }: {
  photos: TalkPhoto[];
  language: "en" | "zh";
}) {
  const [activeImage, setActiveImage] = useState<PreviewImage | null>(null);
  const galleryRef = useRef<HTMLDialogElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const isChinese = language === "zh";

  return (
    <>
      <button
        className="talk-photos-link"
        type="button"
        aria-haspopup="dialog"
        onClick={(event) => {
          event.currentTarget.focus({ preventScroll: true });
          galleryRef.current?.showModal();
        }}
      >
        {isChinese ? "照片" : "Photos"}
      </button>
      <dialog
        ref={galleryRef}
        className="image-dialog photo-gallery-dialog"
        aria-labelledby={titleId}
        onClick={(event) => {
          if (isBackdropClick(event)) event.currentTarget.close();
        }}
      >
        <div className="image-dialog-toolbar">
          <h3 id={titleId} className="image-dialog-title">{isChinese ? "3MT 照片" : "3MT Photos"}</h3>
          <button className="image-dialog-close" type="button" onClick={() => galleryRef.current?.close()}>
            {isChinese ? "关闭" : "Close"}
          </button>
        </div>
        <div className="photo-gallery-grid">
          {photos.map((photo) => (
            <button
              className="photo-gallery-card"
              type="button"
              aria-haspopup="dialog"
              key={photo.src}
              onClick={(event) => {
                previewTriggerRef.current = event.currentTarget;
                setActiveImage(photo);
              }}
            >
              <Image
                className="photo-gallery-thumbnail"
                src={photo.thumbnailSrc}
                alt=""
                width={photo.width}
                height={photo.height}
                unoptimized
              />
              <span>{photo.label}</span>
            </button>
          ))}
        </div>
      </dialog>
      <ImagePreview
        image={activeImage}
        language={language}
        triggerRef={previewTriggerRef}
        onClose={() => setActiveImage(null)}
      />
    </>
  );
}
