import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useReveal from "../useReveal";
import ReviewsBlock from "../components/ReviewsBlock";
import vesselImage from "../images/images.jpg";
import tablewareImage from "../images/images (1).jpg";
import smallPiecesImage from "../images/WhatsApp Image 2026-09-29 at 11.45.56 (1).jpeg";
import craftImage from "../images/images (2).jpg";
import potteryImage from "../images/WhatsApp Image 2026-09-29 at 11.45.57 (3).jpeg";
import ctaImage from "../images/WhatsApp Image 2026-09-29 at 11.45.59.jpeg";
import homeVideo from "../images/home.mp4";

const collection = [
  {
    number: "01",
    title: "Vessels & forms",
    image: vesselImage,
    alt: "Hand-decorated pottery vessel with geometric patterns",
  },
  {
    number: "02",
    title: "Tableware",
    image: tablewareImage,
    alt: "Decorated pottery arranged as a serving set",
  },
  {
    number: "03",
    title: "Small keepsakes",
    image: smallPiecesImage,
    alt: "Small handcrafted clay keepsakes",
  },
];

export default function Home() {
  const introRef = useReveal();
  const imageRef = useReveal();
  const storyRef = useReveal();
  const collectionRef = useReveal();
  const collectionGridRef = useReveal();
  const editorialRef = useReveal();

  return (
    <>
      <section
        className="hero"
        aria-label="Effie Lapita Pottery"
      >
        <img className="hero-image" src={vesselImage} alt="" fetchPriority="high" decoding="async" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="hero-kicker-line" aria-hidden="true" />
              Nakabuta <span aria-hidden="true">·</span> Sigatoka <span aria-hidden="true">·</span> Fiji
            </div>
            <h1>Made by hand.<br /><em>Rooted in place.</em></h1>
            <p className="hero-desc">
              Discover handmade pottery and the people and place behind it in Nakabuta, Fiji.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-gold" to="/pottery">
                Explore the pottery <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link className="btn btn-outline-light" to="/booking">Plan a visit</Link>
            </div>
          </div>
        </div>
        <a className="hero-scroll" href="#welcome">
          <span>Discover</span><ArrowDown size={15} aria-hidden="true" />
        </a>
        <span className="hero-caption">EFFIE LAPITA POTTERY <i aria-hidden="true">/</i> FIJI</span>
      </section>

      <section className="section intro-section" id="welcome">
        <div className="split">
          <div ref={introRef} className="split-text reveal-left">
            <span className="eyebrow">A place for craft & connection</span>
            <h2>Clay, culture <em>&amp; a warm welcome.</em></h2>
            <p className="lead">
              Effie Lapita Pottery invites visitors to discover handmade pottery and village life in Nakabuta, Sigatoka.
            </p>
            <p>
              Take time to look closely at the forms, patterns and finishes of the pottery, then get in touch to arrange a visit.
            </p>
            <Link className="text-link" to="/about">
              Learn about Effie Lapita Pottery <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div ref={imageRef} className="split-img reveal-right">
            <img src={craftImage} alt="Handcrafted pottery displayed together" loading="lazy" />
            <span className="image-caption">The pottery collection</span>
          </div>
        </div>
        <div className="place-note">
          <span className="place-note-mark" aria-hidden="true">✳</span>
          <p><strong>Nakabuta, Sigatoka</strong><span>Fiji Islands</span></p>
          <Link to="/contact">Find us <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="section collection-section">
        <div className="container">
          <div ref={collectionRef} className="section-heading reveal">
            <div>
              <span className="eyebrow">From the collection</span>
              <h2>Objects with <em>a sense of place.</em></h2>
            </div>
            <Link className="text-link" to="/gallery">
              View the gallery <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div ref={collectionGridRef} className="collection-grid reveal">
            {collection.map((item) => (
              <Link className="collection-card" to="/gallery" key={item.number}>
                <div className="collection-image">
                  <img src={item.image} alt={item.alt} loading="lazy" />
                  <span className="collection-number">{item.number}</span>
                </div>
                <div className="collection-card-caption">
                  <h3>{item.title}</h3>
                  <ArrowRight size={16} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div ref={editorialRef} className="editorial-image reveal-left">
          <img src={potteryImage} alt="Handmade pottery pieces arranged together" loading="lazy" />
        </div>
        <div ref={storyRef} className="editorial-copy reveal">
          <span className="eyebrow">See it up close</span>
          <h2>Every curve.<br /><em>Every mark.</em></h2>
          <p>
            Browse the gallery for a closer look at the pottery. To ask about a particular piece, send an enquiry and the team can confirm what is available.
          </p>
          <Link className="btn btn-primary" to="/order">
            Ask about a piece <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <span className="editorial-index" aria-hidden="true">01 — 03</span>
      </section>

      <section className="our-story-video-section" aria-label="Effie Lapita Pottery video">
        <video
          className="our-story-video"
          src={homeVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </section>

      <ReviewsBlock />

      <section className="cta-section" style={{ "--cta-image": `url("${ctaImage}")` }}>
        <div className="cta-section-content">
          <span className="eyebrow">Visit Nakabuta</span>
          <h2>Come and experience it <em>for yourself.</em></h2>
          <p>Send a visit request and get in touch with Effie Lapita Pottery.</p>
          <Link className="btn btn-gold" to="/booking">
            Plan your visit <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
