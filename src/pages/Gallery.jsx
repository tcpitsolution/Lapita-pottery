import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import PageHero from "../components/PageHero";
import useReveal from "../useReveal";
import vesselImage from "../images/images.jpg";
import tablewareImage from "../images/images (1).jpg";
import keepsakesImage from "../images/WhatsApp Image 2026-09-29 at 11.45.56 (1).jpeg";
import bowlImage from "../images/WhatsApp Image 2026-09-29 at 11.45.56.jpeg";
import figurinesImage from "../images/WhatsApp Image 2026-09-29 at 11.45.57 (1).jpeg";
import vesselDetailImage from "../images/WhatsApp Image 2026-09-29 at 11.45.57 (2).jpeg";
import fishImage from "../images/WhatsApp Image 2026-09-29 at 11.45.57 (3).jpeg";
import displayImage from "../images/WhatsApp Image 2026-09-29 at 11.45.59.jpeg";
import keepsakesDetailImage from "../images/WhatsApp Image 2026-09-29 at 11.46.00 (1).jpeg";
import vesselGroupImage from "../images/WhatsApp Image 2026-09-29 at 11.46.05 (2).jpeg";
import sculpturalImage from "../images/WhatsApp Image 2026-09-29 at 11.46.06 (1).jpeg";

const images = [
  { category: "Vessels", src: vesselImage, alt: "Decorated pottery vessel with geometric patterns" },
  { category: "Tableware", src: tablewareImage, alt: "Handmade pottery arranged as a tableware set" },
  { category: "Small pieces", src: keepsakesImage, alt: "Small terracotta keepsakes on a string", portrait: true },
  { category: "Vessels", src: bowlImage, alt: "A group of handmade pottery bowls" },
  { category: "Small pieces", src: figurinesImage, alt: "Small animal-shaped clay pottery pieces" },
  { category: "Vessels", src: vesselDetailImage, alt: "Glazed pottery vessel with a fitted lid", portrait: true },
  { category: "Small pieces", src: fishImage, alt: "Hand-shaped clay fish ornaments" },
  { category: "Small pieces", src: displayImage, alt: "Pottery keepsakes arranged on display" },
  { category: "Small pieces", src: keepsakesDetailImage, alt: "Decorative clay keepsakes with bead details" },
  { category: "Small pieces", src: vesselGroupImage, alt: "Small pottery pieces displayed together" },
  { category: "Vessels", src: sculpturalImage, alt: "Sculptural pottery pieces displayed outdoors", portrait: true },
];

const filters = ["All", "Vessels", "Tableware", "Small pieces"];

function GalleryItem({ item, onOpen, index }) {
  const ref = useReveal({ threshold: 0.08 });
  return (
    <button
      ref={ref}
      type="button"
      className={`gallery-item reveal-scale ${item.portrait ? "gallery-item-portrait" : ""}`}
      onClick={onOpen}
      aria-label={`Enlarge photo: ${item.alt}`}
      style={{ "--item-index": index }}
    >
      <img src={item.src} alt={item.alt} loading="lazy" />
      <span className="gallery-item-label">
        <span>{item.category}</span>
        <span aria-hidden="true">↗</span>
      </span>
    </button>
  );
}

import video1 from "../images/1st.mp4";

export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [activeImage, setActiveImage] = useState(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const previousFocus = useRef(null);
  const headingRef = useReveal();
  const visibleImages = category === "All"
    ? images
    : images.filter((image) => image.category === category);

  useEffect(() => {
    if (!activeImage) return undefined;
    previousFocus.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKeys = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll(
        'button:not([disabled])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeys);
      previousFocus.current?.focus?.();
    };
  }, [activeImage]);

  return (
    <>
      <PageHero title="A closer look at the collection" kicker="GALLERY" video={video1} />
      <section className="section gallery-section">
        <div className="container">
          <div ref={headingRef} className="section-heading gallery-heading reveal">
            <div>
              <span className="eyebrow">Shapes, patterns &amp; details</span>
              <h2>Made to be <em>looked at.</em></h2>
            </div>
            <p className="section-intro">
              Browse photographs of pottery and keepsakes from Effie Lapita Pottery.
            </p>
          </div>

          <div className="gallery-filters" aria-label="Filter gallery by type">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={category === filter ? "selected" : ""}
                onClick={() => setCategory(filter)}
                aria-pressed={category === filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {visibleImages.map((item, index) => (
              <GalleryItem
                key={item.src}
                item={item}
                index={index}
                onOpen={() => setActiveImage(item)}
              />
            ))}
          </div>
          <p className="gallery-note">Availability and pricing can be confirmed by enquiry.</p>
        </div>
      </section>

      {activeImage && (
        <div
          className="lightbox"
          role="presentation"
          onClick={() => setActiveImage(null)}
        >
          <div
            ref={panelRef}
            className="lightbox-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged pottery photograph"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              className="lightbox-close"
              type="button"
              onClick={() => setActiveImage(null)}
              aria-label="Close enlarged photograph"
            >
              <X size={20} />
            </button>
            <img src={activeImage.src} alt={activeImage.alt} />
            <p>{activeImage.category} <span aria-hidden="true">·</span> Effie Lapita Pottery</p>
          </div>
        </div>
      )}
    </>
  );
}
