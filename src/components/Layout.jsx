import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Menu,
  MessageCircle,
  Music2,
  Twitter,
  X,
} from "lucide-react";
import { config } from "../config";
import WelcomePopup from "./WelcomePopup";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Chatbot from "./Chatbot";
import logoImg from "../images/logo.jpeg";

const primaryLinks = [
  ["Our story", "/about"],
  ["Pottery", "/pottery"],
  ["Experiences", "/experiences"],
  ["Gallery", "/gallery"],
];

const footerLinks = [
  ["Island visits", "/island-hopping"],
  ["Guest reviews", "/reviews"],
  ["Order pottery", "/order"],
  ["Contact", "/contact"],
  ["Request a visit", "/booking"],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const whatsappNumber = config.whatsapp.replace(/\D/g, "");
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "";

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 32);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`nav ${scrolled ? "nav-scrolled" : "nav-top"}`}>
        <div className="nav-inner">
          <Link className="brand" to="/" aria-label="Effie Lapita Pottery home">
            <img src={logoImg} alt="Effie Lapita Pottery" className="brand-logo" />
          </Link>

          <nav
            className={`navlinks ${open ? "open" : ""}`}
            id="primary-navigation"
            aria-label="Main navigation"
          >
            <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>Our story</NavLink>
            <NavLink to="/gallery" onClick={() => setOpen(false)}>Gallery</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>Contact us</NavLink>
            <Link className="nav-order" to="/order" onClick={() => setOpen(false)}>
              Enquire about a piece
            </Link>
            <Link className="nav-book" to="/booking" onClick={() => setOpen(false)}>
              Plan a visit
            </Link>
          </nav>

          <button
            className="menubtn"
            type="button"
            onClick={() => {
              setOpen((isOpen) => !isOpen);
              setDiscoverOpen(false);
            }}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="primary-navigation"
            aria-expanded={open}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="main-content"><Outlet /></main>

      <FloatingWhatsApp />
      <Chatbot />

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-about">
            <Link className="footer-brand" to="/" aria-label="Effie Lapita Pottery home">
              <img src={logoImg} alt="Effie Lapita Pottery" className="footer-brand-logo" />
            </Link>
            <p className="footer-tagline">
              Handmade pottery and a warm welcome in Nakabuta, Sigatoka.
            </p>
            <div className="social-row" aria-label="Social media">
              {config.facebook && (
                <a className="social-btn" href={config.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <Facebook size={16} />
                </a>
              )}
              {config.instagram && (
                <a className="social-btn" href={config.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <Instagram size={16} />
                </a>
              )}
              {config.tiktok && (
                <a className="social-btn" href={config.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                  <Music2 size={16} />
                </a>
              )}
              {config.twitter && (
                <a className="social-btn" href={config.twitter} aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
                  <Twitter size={16} />
                </a>
              )}
              {whatsappUrl && (
                <a className="social-btn" href={whatsappUrl} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h2 className="footer-heading">Explore</h2>
            <div className="footer-links">
              {primaryLinks.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
            </div>
          </div>

          <div>
            <h2 className="footer-heading">More</h2>
            <div className="footer-links">
              {footerLinks.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
            </div>
          </div>

          <div>
            <h2 className="footer-heading">Find us</h2>
            <div className="footer-contact">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Nakabuta+-+Lapita+Pottery+Village,+VGQF%2BF24,+Sigatoka,+Fiji"
                target="_blank"
                rel="noopener noreferrer"
              >Nakabuta Village<br />Sigatoka, Fiji</a>
              <a href="tel:+6799665633">+679 966 5633</a>
              <a href={`mailto:${config.email}`}>{config.email}</a>
              <a
                className="footer-direction"
                href={config.maps || "https://www.google.com/maps/search/?api=1&query=Nakabuta+-+Lapita+Pottery+Village,+VGQF%2BF24,+Sigatoka,+Fiji"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} Effie Lapita Pottery</span>
          <span className="footer-credit">
            Crafted with care by{" "}
            <a href={config.tcp} target="_blank" rel="noopener noreferrer">TCP IT Solution</a>
          </span>
        </div>
      </footer>

      <WelcomePopup />
    </div>
  );
}
