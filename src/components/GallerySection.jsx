import { useEffect, useRef, useState } from "react";
import { weddingData } from "../data/wedding-data";
import Modal from "./Modal";
import { SectionHeading } from "./InvitationCard";

function Arrow({ direction }) {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "left" ? "m15 18-6-6 6-6" : "m9 6 6 6-6 6"}
      />
    </svg>
  );
}

function circularOffset(index, activeIndex, length) {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

export default function GallerySection() {
  const images = weddingData.gallery;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const pointerStart = useRef(null);

  const goTo = (nextIndex) => setActiveIndex((nextIndex + images.length) % images.length);
  const previous = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section aria-labelledby="gallery-heading" className="relative z-10 overflow-hidden px-6 pb-10 pt-14 md:pt-18">
      <img alt="" aria-hidden="true" className="section-watermark top-[-5%]" src="/assets/castle-background.webp" />
      <div className="relative z-10 flex flex-col items-center">
        <SectionHeading>
          <span id="gallery-heading">Album ảnh</span>
        </SectionHeading>

        <div className="relative mt-5 w-full max-w-[380px] md:max-w-[600px]">
          <div
            className="relative flex h-[340px] touch-pan-y items-center justify-center md:h-[520px]"
            style={{ perspective: "1000px" }}
            onPointerDown={(event) => {
              pointerStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (pointerStart.current === null) return;
              const distance = event.clientX - pointerStart.current;
              pointerStart.current = null;
              if (Math.abs(distance) < 45) return;
              if (distance > 0) previous();
              else next();
            }}
          >
            <button
              type="button"
              aria-label="Ảnh trước"
              className="absolute left-0 z-[60] hidden size-11 cursor-pointer place-items-center rounded-full bg-ivory/90 text-burgundy shadow-md transition-transform duration-200 hover:scale-105 md:grid"
              onClick={previous}
            >
              <Arrow direction="left" />
            </button>
            <button
              type="button"
              aria-label="Ảnh tiếp theo"
              className="absolute right-0 z-[60] hidden size-11 cursor-pointer place-items-center rounded-full bg-ivory/90 text-burgundy shadow-md transition-transform duration-200 hover:scale-105 md:grid"
              onClick={next}
            >
              <Arrow direction="right" />
            </button>

            {images.map((src, index) => {
              const offset = circularOffset(index, activeIndex, images.length);
              const distance = Math.abs(offset);
              const isActive = distance === 0;
              const translate = offset * 60;
              const rotate = offset * 45;
              const opacity = Math.max(0, 1 - distance * 0.24);
              const scale = distance === 0 ? 1 : distance === 1 ? 0.85 : 0.7;

              return (
                <button
                  type="button"
                  key={src}
                  aria-label={isActive ? `Mở ảnh cưới ${index + 1}` : `Xem ảnh cưới ${index + 1}`}
                  className="absolute h-[92%] cursor-pointer overflow-hidden rounded-2xl bg-white p-0 shadow-xl ring-2 ring-white/30 transition-[transform,opacity] duration-700 [transform-style:preserve-3d]"
                  style={{
                    aspectRatio: "2 / 3",
                    opacity,
                    pointerEvents: distance > 3 ? "none" : "auto",
                    transform: `translateX(${translate}%) translateZ(${-distance * 150}px) rotateY(${rotate}deg) scale(${scale})`,
                    zIndex: 50 - distance,
                  }}
                  onClick={() => {
                    if (isActive) setLightboxOpen(true);
                    else setActiveIndex(index);
                  }}
                >
                  <img
                    alt={`Ảnh cưới ${index + 1} của ${weddingData.couple.groom.shortName} và ${weddingData.couple.bride.shortName}`}
                    className="h-full w-full object-cover"
                    loading={isActive ? "eager" : "lazy"}
                    src={src}
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-1 flex justify-center" aria-label="Chọn ảnh cưới">
            {images.map((src, index) => (
              <button
                type="button"
                key={src}
                aria-label={`Đi tới ảnh ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className="group grid size-10 cursor-pointer place-items-center"
                onClick={() => setActiveIndex(index)}
              >
                <span
                  className={`h-2 rounded-full bg-burgundy transition-all duration-300 ${index === activeIndex ? "w-6 opacity-75" : "w-2 opacity-25 group-hover:opacity-50"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={`Ảnh cưới ${activeIndex + 1} / ${images.length}`}
        panelClassName="sm:max-w-4xl"
      >
        <div className="bg-[#26090c] p-3 sm:p-5">
          <div className="relative flex min-h-[60dvh] items-center justify-center">
            <button
              type="button"
              onClick={previous}
              className="absolute left-1 z-10 grid size-11 cursor-pointer place-items-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65 sm:left-3"
              aria-label="Ảnh trước"
            >
              <Arrow direction="left" />
            </button>
            <img
              src={images[activeIndex]}
              alt={`Ảnh cưới ${activeIndex + 1}`}
              className="max-h-[70dvh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={next}
              className="absolute right-1 z-10 grid size-11 cursor-pointer place-items-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65 sm:right-3"
              aria-label="Ảnh tiếp theo"
            >
              <Arrow direction="right" />
            </button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.map((src, index) => (
              <button
                type="button"
                key={src}
                aria-label={`Xem ảnh ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className={`size-14 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-opacity ${index === activeIndex ? "border-antique-gold opacity-100" : "border-transparent opacity-55 hover:opacity-90"}`}
              >
                <img alt="" src={src} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </section>
  );
}
