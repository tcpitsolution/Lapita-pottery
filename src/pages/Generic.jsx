import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import ExperienceCard from "../components/ExperienceCard";
import ReviewsBlock from "../components/ReviewsBlock";
import useReveal from "../useReveal";
import { experiences } from "../data/experiences";
import { reviews } from "../data/reviews";
import potteryImage from "../images/WhatsApp Image 2026-09-29 at 11.45.57 (2).jpeg";
import vesselImage from "../images/images.jpg";
import tablewareImage from "../images/images (1).jpg";
import smallPiecesImage from "../images/WhatsApp Image 2026-09-29 at 11.45.56 (1).jpeg";
import ourStoryVideo from "../images/ourstyory.mp4";

export function About() {
  const storyRef = useReveal();
  const imageRef = useReveal();
  return (
    <>
      <PageHero title="A place for pottery & connection" kicker="EFFIE LAPITA POTTERY" image={potteryImage} imageFit="portrait" />
      <section className="section">
        <div className="split">
          <div ref={storyRef} className="split-text reveal-left">
            <span className="eyebrow">Nakabuta · Sigatoka · Fiji</span>
            <h2>Craft, culture <em>&amp; hospitality.</em></h2>
            <p className="lead">
              Effie Lapita Pottery welcomes visitors to discover pottery and village life in Nakabuta.
            </p>
            <p>
              Explore the collection, learn more about visiting, or get in touch with a question. We keep the details personal and confirm arrangements directly.
            </p>
            <Link className="btn btn-primary" to="/booking">
              Plan a visit <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <figure ref={imageRef} className="split-img reveal-right">
            <img src={vesselImage} alt="Geometric patterns on a handcrafted pottery vessel" loading="lazy" />
            <figcaption className="image-caption">Pottery from Nakabuta</figcaption>
          </figure>
        </div>
      </section>
      <section className="our-story-video-section" aria-label="Effie Lapita Pottery video">
        <video
          className="our-story-video"
          src={ourStoryVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </section>
      <ReviewsBlock />
    </>
  );
}

export function Experiences() {
  const headingRef = useReveal();
  return (
    <>
      <PageHero title="Time well spent in Nakabuta" kicker="VISIT & DISCOVER" image={tablewareImage} />
      <section className="section">
        <div className="container">
          <div ref={headingRef} className="section-heading reveal">
            <div>
              <span className="eyebrow">Discover at your own pace</span>
              <h2>Experiences shaped by <em>place.</em></h2>
            </div>
            <p className="section-intro">
              Ask us about visiting, pottery and island-tour arrangements. Details are confirmed directly.
            </p>
          </div>
          <div className="experience-grid">
            {experiences.map((item) => <ExperienceCard item={item} key={item.title} />)}
          </div>
          <div className="section-cta">
            <Link className="text-link" to="/booking">Send a visit request <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function Pottery() {
  const copyRef = useReveal();
  const imageRef = useReveal();
  return (
    <>
      <PageHero title="Pottery, made in Nakabuta" kicker="THE COLLECTION" image={vesselImage} />
      <section className="section">
        <div className="split">
          <div ref={copyRef} className="split-text reveal-left">
            <span className="eyebrow">Browse & enquire</span>
            <h2>Each piece has <em>its own character.</em></h2>
            <p className="lead">
              Discover handmade pottery through the shapes, patterns and finishes in our collection.
            </p>
            <p>
              Pieces, availability and prices may vary. Get in touch with a photo or description and we can confirm the details.
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" to="/gallery">View the gallery</Link>
              <Link className="text-link" to="/order">Enquire about pottery <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
          <figure ref={imageRef} className="split-img reveal-right">
            <img src={potteryImage} alt="A handmade clay vessel with a glazed finish" loading="lazy" />
            <figcaption className="image-caption">Handmade pottery</figcaption>
          </figure>
        </div>
      </section>
      <section className="section collection-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">The gallery</span>
              <h2>Look a little <em>closer.</em></h2>
            </div>
            <Link className="text-link" to="/gallery">See all photographs <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <div className="collection-grid collection-grid-two">
            <Link className="collection-card" to="/gallery">
              <div className="collection-image"><img src={tablewareImage} alt="A collection of decorated handmade pottery" loading="lazy" /></div>
              <div className="collection-card-caption"><h3>Forms &amp; patterns</h3><ArrowRight size={16} aria-hidden="true" /></div>
            </Link>
            <Link className="collection-card" to="/gallery">
              <div className="collection-image"><img src={smallPiecesImage} alt="Small handmade clay keepsakes" loading="lazy" /></div>
              <div className="collection-card-caption"><h3>Small keepsakes</h3><ArrowRight size={16} aria-hidden="true" /></div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function IslandHopping() {
  const ref = useReveal();
  return (
    <>
      <PageHero title="Ask us about island tours" kicker="EXPLORE FIJI" />
      <section className="section">
        <div className="container narrow">
          <div ref={ref} className="story-panel reveal">
            <span className="eyebrow">Island visits</span>
            <h2>Make an enquiry <em>directly.</em></h2>
            <p>
              Contact Effie Lapita Pottery to ask about island-tour arrangements. Destinations, availability, timing and prices can be confirmed with the team.
            </p>
            <p className="notice">
              Tour details are not listed here; please confirm them before making plans.
            </p>
            <Link className="btn btn-primary" to="/contact">
              Contact us <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function Reviews() {
  return (
    <>
      <PageHero title="Notes from our guests" kicker="GUEST REVIEWS" image={tablewareImage} />
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Shared by visitors</span>
              <h2>Guest <em>experiences.</em></h2>
            </div>
          </div>
          <div className="all-reviews-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-card-stars" aria-hidden="true">★★★★★</div>
                <p>“{review.text}”</p>
                <span className="review-card-author">{review.name}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <PageHero title="This page isn’t here" kicker="404 · PAGE NOT FOUND" image={smallPiecesImage} imageFit="portrait" />
      <section className="section">
        <div className="container narrow story-panel">
          <p>Try returning to the home page or browse the pottery gallery.</p>
          <div className="button-row">
            <Link className="btn btn-primary" to="/">Go home</Link>
            <Link className="text-link" to="/gallery">Open the gallery <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
