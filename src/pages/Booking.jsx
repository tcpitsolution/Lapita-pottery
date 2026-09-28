import React, {useState} from "react";
import useReveal from "../useReveal";
import PageHero from "../components/PageHero";

export default function Booking(){
  const [sent,setSent]=useState(false);
  const formRef=useReveal();
  if(sent) return <><PageHero title="Request Received" image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90"/>
  <section className="section container narrow center">
    <div ref={formRef} className="reveal"><div className="success">✓</div><h2>Your booking request has been received.</h2><p>We'll contact you to confirm availability. This message does not mean the booking is confirmed.</p></div>
  </section></>;
  return <><PageHero title="Plan Your Experience" kicker="BOOKING REQUEST" image="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1800&q=90"/>
  <section className="section container">
    <form ref={formRef} className="form reveal" onSubmit={e=>{e.preventDefault();setSent(true)}}>
      <label>Full Name<input required name="name"/></label>
      <label>Email<input required type="email" name="email"/></label>
      <label>Phone / WhatsApp<input name="phone"/></label>
      <label>Number of Guests<input required type="number" min="1" name="guests"/></label>
      <label>Preferred Date<input type="date" name="date"/></label>
      <label>Preferred Time<input type="time" name="time"/></label>
      <label>Experience<select name="experience"><option>Lapita Pottery Experience</option><option>Village Experience</option><option>Cultural Experience</option><option>Island Hopping</option><option>Pottery / Souvenir Visit</option><option>Other</option></select></label>
      <label className="full">Special Requests<textarea rows="6" name="requests"/></label>
      <button className="button fullbtn">REQUEST A BOOKING</button>
    </form>
  </section></>
}
