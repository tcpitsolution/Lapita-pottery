import React from "react";
import useReveal from "../useReveal";
import {Link} from "react-router-dom";
import PageHero from "../components/PageHero";
import {experiences} from "../data/experiences";
import ExperienceCard from "../components/ExperienceCard";
import ReviewsBlock from "../components/ReviewsBlock";

const pottery="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1800&q=90";

export function About(){
  const ref=useReveal();
  return <><PageHero title="Meet Effie" image={pottery}/>
  <section className="section container narrow">
    <div ref={ref} className="reveal">
      <div className="eyebrow">EFFIE POTTERY</div>
      <h2>Craftsmanship, culture & hospitality.</h2>
      <p>Effie Lapita Pottery & Island Hopping offers visitors a chance to connect with pottery, village life and cultural experiences in Nakabuta / Sigatoka, Fiji.</p>
      <p className="placeholder">[Add Effie's personal story here when supplied by the owner.]</p>
      <div className="callout">We have intentionally avoided inventing personal biography or unsupported historical claims.</div>
    </div>
  </section></>
}

export function Experiences(){
  const ref=useReveal();
  return <><PageHero title="The Experience" image={experiences[1].image}/>
  <section className="section container">
    <div ref={ref} className="sectionhead reveal">
      <div><div className="eyebrow">DISCOVER</div><h2>Fiji, beyond the postcard.</h2></div>
    </div>
    <div className="expgrid">{experiences.map(x=><ExperienceCard item={x} key={x.title}/>)}</div>
  </section></>
}

export function Pottery(){
  const txtRef=useReveal();
  const imgRef=useReveal();
  return <><PageHero title="Shaped by Hand" kicker="LAPITA POTTERY" image={pottery}/>
  <section className="section container">
    <div className="split">
      <div ref={txtRef} className="reveal reveal-left">
        <div className="eyebrow">POTTERY</div>
        <h2>Clay, touch and <em>craftsmanship.</em></h2>
        <p>Explore handmade pottery and local souvenirs while learning more about the craft through the experience itself.</p>
        <p>Product details, prices and availability can be added when confirmed by the business.</p>
      </div>
      <img ref={imgRef} className="editorial reveal reveal-right" src={pottery} alt="Pottery"/>
    </div>
  </section></>
}

export function IslandHopping(){
  const ref=useReveal();
  return <><PageHero title="Discover Fiji Beyond the Shore" kicker="ISLAND HOPPING" image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90"/>
  <section className="section container narrow">
    <div ref={ref} className="reveal">
      <div className="eyebrow">ISLAND EXPERIENCES</div>
      <h2>Ocean. Islands. Connection.</h2>
      <p>Explore tropical landscapes, boats and cultural experiences through configurable island-hopping offerings.</p>
      <div className="callout">Specific islands, routes, prices and durations have not been invented and can be configured when confirmed.</div>
      <Link className="button" to="/booking">REQUEST A BOOKING</Link>
    </div>
  </section></>
}

export function Reviews(){
  return <><PageHero title="What Guests Say" kicker="GOOGLE REVIEWS" image={pottery}/><ReviewsBlock/></>
}
