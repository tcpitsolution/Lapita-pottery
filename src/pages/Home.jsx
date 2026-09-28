import React from "react";
import useReveal from "../useReveal";
import {Link} from "react-router-dom";
import {ArrowRight, ChevronDown, Sparkles} from "lucide-react";
import {experiences} from "../data/experiences";
import ExperienceCard from "../components/ExperienceCard";
import ReviewsBlock from "../components/ReviewsBlock";

const hero="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=2200&q=90";

export default function Home(){
  const heroRef=useReveal();
  const introRef=useReveal();
  const statsRef=useReveal();
  const expRef=useReveal();
  const featureImgRef=useReveal();
  const featureTxtRef=useReveal();
  const quoteRef=useReveal();
  const ctaRef=useReveal();

  return <>
<section className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(20,13,9,.72),rgba(20,13,9,.18)),url(${hero})`}}>
  <div className="hero-inner">
    <div ref={heroRef} className="reveal">
      <div className="eyebrow">AUTHENTIC • CULTURAL • HANDCRAFTED • FIJIAN</div>
      <h1>Where Fiji's<br/><em>Heritage Lives</em><br/>in Clay</h1>
      <p>Discover the traditions, craftsmanship and warm hospitality behind Lapita pottery in the heart of Fiji.</p>
      <div className="actions">
        <Link className="button" to="/experiences">EXPLORE THE EXPERIENCE <ArrowRight/></Link>
        <Link className="button light" to="/booking">BOOK YOUR VISIT</Link>
      </div>
    </div>
  </div>
  <div className="scroll"><ChevronDown/></div>
</section>

<section className="intro section">
  <div className="split">
    <div ref={introRef} className="reveal reveal-left">
      <div className="eyebrow">A LIVING TRADITION</div>
      <h2>More Than Pottery.<br/><em>A Living Tradition.</em></h2>
      <p>Step into an experience shaped by handmade pottery, village culture, craftsmanship and genuine Fijian hospitality.</p>
      <p>From the clay in skilled hands to the warmth of a village welcome, every visit offers a closer connection to the culture and people of Fiji.</p>
      <Link className="textlink" to="/about">MEET EFFIE <ArrowRight/></Link>
    </div>
    <img ref={featureImgRef} className="editorial reveal reveal-right" src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1300&q=85" alt="Handmade pottery" loading="lazy"/>
  </div>
  <div ref={statsRef} className="stats reveal">
    <div><b>38+</b><span>Google Reviews</span></div>
    <div><b>4.6</b><span>Google Rating</span></div>
    <div><b>Fiji</b><span>Nakabuta / Sigatoka</span></div>
    <div><b>24h</b><span>Listed Opening Hours</span></div>
  </div>
</section>

<section className="dark section">
  <div className="container">
    <div ref={expRef} className="sectionhead reveal">
      <div><div className="eyebrow">THE EXPERIENCE</div><h2>Culture you can <em>feel.</em></h2></div>
      <Link className="textlink lightlink" to="/experiences">VIEW ALL <ArrowRight/></Link>
    </div>
    <div className="expgrid">{experiences.map(x=><ExperienceCard item={x} key={x.title}/>)}</div>
  </div>
</section>

<section className="feature section">
  <div className="split reverse">
    <img ref={featureTxtRef} className="editorial tall reveal reveal-left" src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1400&q=85" alt="Pottery craftsmanship" loading="lazy"/>
    <div ref={featureImgRef} className="reveal reveal-right">
      <div className="eyebrow">CRAFTSMANSHIP</div>
      <h2>Shaped by Hand.<br/><em>Rooted in Heritage.</em></h2>
      <p>Pottery brings together material, touch and tradition. Discover handmade pieces and the people behind the craft without leaving the experience to a resort brochure.</p>
      <Link className="button" to="/pottery">DISCOVER OUR POTTERY <ArrowRight/></Link>
    </div>
  </div>
</section>

<section className="quote">
  <div ref={quoteRef} className="container reveal reveal-scale">
    <Sparkles/>
    <p>"A place where visitors don't just see Fiji — they experience it."</p>
    <span>MEMORIES MADE IN FIJI</span>
  </div>
</section>

<ReviewsBlock/>

<section className="cta">
  <div ref={ctaRef} className="reveal">
    <div className="eyebrow">PLAN YOUR VISIT</div>
    <h2>Come closer to the culture.</h2>
    <p>Request a visit and we'll contact you to confirm availability.</p>
    <Link className="button light" to="/booking">REQUEST A BOOKING <ArrowRight/></Link>
  </div>
</section>
</>}
