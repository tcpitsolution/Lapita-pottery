import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import vesselImage from "../images/images.jpg";

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem("popup_seen")) return undefined;
    const timer = window.setTimeout(() => setVisible(true), 4200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    previousFocus.current = document.activeElement;
    closeRef.current?.focus();
    const handleKeys = (event) => {
      if (event.key === "Escape") {
        setVisible(false);
        sessionStorage.setItem("popup_seen", "1");
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled])',
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
      window.removeEventListener("keydown", handleKeys);
      previousFocus.current?.focus?.();
    };
  }, [visible]);

  const close = () => {
    sessionStorage.setItem("popup_seen", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="popup-overlay"
      role="presentation"
      onClick={close}
    >
      <section
        ref={dialogRef}
        className="popup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="popup-img">
          <img src={vesselImage} alt="A decorated pottery vessel from the collection" />
          <span className="popup-img-caption">NAKABUTA <i aria-hidden="true">·</i> FIJI</span>
        </div>
        <button
          ref={closeRef}
          className="popup-close"
          type="button"
          onClick={close}
          aria-label="Close welcome message"
        >
          <X size={18} aria-hidden="true" />
        </button>
        <div className="popup-body">
          <span className="eyebrow">Welcome</span>
          <h2 id="welcome-title">Effie <em>Lapita Pottery</em></h2>
          <p>
            Discover handmade pottery and plan a visit to Nakabuta, Sigatoka.
          </p>
          <div className="popup-actions">
            <Link to="/gallery" onClick={close} className="btn btn-primary">View the gallery</Link>
            <Link to="/booking" onClick={close} className="text-link">Plan a visit <span aria-hidden="true">→</span></Link>
          </div>
          <button className="popup-dismiss" type="button" onClick={close}>
            Continue browsing
          </button>
        </div>
      </section>
    </div>
  );
}
