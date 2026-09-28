import React from "react";
import useReveal from "../useReveal";
import {MapPin,Phone,Mail,MessageCircle,ExternalLink} from "lucide-react";
import {config} from "../config";
import PageHero from "../components/PageHero";

export default function Contact(){
  const leftRef=useReveal();
  const rightRef=useReveal();
  return <><PageHero title="Visit Us" kicker="CONTACT" image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90"/>
  <section className="section container contactgrid">
    <div ref={leftRef} className="reveal reveal-left">
      <div className="contactitem"><MapPin/><div><b>Visit Us</b><p>VGQF+F24, Sigatoka, Fiji</p></div></div>
      <div className="contactitem"><Phone/><div><b>Phone</b><p>+679 966 5633</p></div></div>
      <div className="contactitem"><Mail/><div><b>Email</b><p>{config.email||"Email to be configured"}</p></div></div>
      <div className="contactitem"><MessageCircle/><div><b>WhatsApp</b><p>{config.whatsapp?"Configured":"WhatsApp number to be configured"}</p></div></div>
      <div className="contactitem"><span className="clock">24</span><div><b>Opening Hours</b><p>Open 24 hours</p></div></div>
    </div>
    <div ref={rightRef} className="mapbox reveal reveal-right">
      <MapPin size={40}/><h3>Nakabuta / Sigatoka</h3>
      <p>Use the configured Google Maps link for directions.</p>
      {config.maps?<a className="button" href={config.maps} target="_blank" rel="noreferrer">DIRECTIONS <ExternalLink/></a>:<span className="muted">Maps link not configured yet.</span>}
    </div>
  </section></>
}
