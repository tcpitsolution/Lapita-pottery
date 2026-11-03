import { useRef, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { config } from "../config";
import PageHero from "../components/PageHero";
import useReveal from "../useReveal";
import vesselImage from "../images/WhatsApp Image 2026-09-29 at 11.45.57 (2).jpeg";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  guests: "",
  date: "",
  time: "",
  experience: "Lapita Pottery Experience",
  requests: "",
};

function buildMessage(form) {
  return [
    "Hello, I would like to ask about arranging a visit.",
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone / WhatsApp: ${form.phone || "Not provided"}`,
    `Number of guests: ${form.guests}`,
    `Preferred date: ${form.date || "Flexible"}`,
    `Preferred time: ${form.time || "Flexible"}`,
    `Experience: ${form.experience}`,
    `Additional requests: ${form.requests || "None"}`,
  ].join("\n");
}

export default function Booking() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const formRef = useRef(null);
  const headingRef = useReveal();
  const formRevealRef = useReveal();
  const message = buildMessage(form);
  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = config.whatsapp.replace(/\D/g, "");
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : "";
  const emailUrl = `mailto:${config.email}?subject=${encodeURIComponent("Visit request — Effie Lapita Pottery")}&body=${encodedMessage}`;

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setStatus("");
  };

  const validateBeforeOpening = (event) => {
    if (!formRef.current?.reportValidity()) {
      event.preventDefault();
      return;
    }
    setStatus("Your message should open in the selected app. Please send it there to complete your request.");
  };

  return (
    <>
      <PageHero title="Plan a visit" kicker="VISIT NAKABUTA" image={vesselImage} imageFit="portrait" />
      <section className="section booking-section">
        <div className="container">
          <div ref={headingRef} className="section-heading booking-heading reveal">
            <div>
              <span className="eyebrow">A personal enquiry</span>
              <h2>Tell us what you <em>have in mind.</em></h2>
            </div>
            <p className="section-intro">
              Complete the form, then send your request by email or WhatsApp. Your visit is not confirmed until arrangements are agreed directly.
            </p>
          </div>

          <div ref={formRevealRef} className="reveal">
          <form
            ref={formRef}
            className="luxury-form"
            onChange={updateForm}
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="form-field">
              <label htmlFor="booking-name">Full name <span aria-hidden="true">*</span></label>
              <input id="booking-name" required name="name" autoComplete="name" />
            </div>
            <div className="form-field">
              <label htmlFor="booking-email">Email <span aria-hidden="true">*</span></label>
              <input id="booking-email" required type="email" name="email" autoComplete="email" />
            </div>
            <div className="form-field">
              <label htmlFor="booking-phone">Phone / WhatsApp</label>
              <input id="booking-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="form-field">
              <label htmlFor="booking-guests">Number of guests <span aria-hidden="true">*</span></label>
              <input id="booking-guests" required type="number" min="1" name="guests" />
            </div>
            <div className="form-field">
              <label htmlFor="booking-date">Preferred date</label>
              <input id="booking-date" type="date" name="date" />
            </div>
            <div className="form-field">
              <label htmlFor="booking-time">Preferred time</label>
              <input id="booking-time" type="time" name="time" />
            </div>
            <div className="form-field full">
              <label htmlFor="booking-experience">What are you interested in?</label>
              <select id="booking-experience" name="experience" value={form.experience}>
                <option>Lapita Pottery Experience</option>
                <option>Village Experience</option>
                <option>Cultural Experience</option>
                <option>Island Hopping</option>
                <option>Pottery / Souvenir Visit</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-field full">
              <label htmlFor="booking-requests">Anything else you would like us to know?</label>
              <textarea id="booking-requests" rows="4" name="requests" />
            </div>
            <div className="form-actions full">
              {whatsappUrl ? (
                <a
                  className="btn btn-primary"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={validateBeforeOpening}
                >
                  <MessageCircle size={16} aria-hidden="true" /> Send by WhatsApp
                </a>
              ) : (
                <span className="channel-unavailable">WhatsApp is not configured.</span>
              )}
              <a className="btn btn-outline" href={emailUrl} onClick={validateBeforeOpening}>
                <Mail size={16} aria-hidden="true" /> Send by email
              </a>
            </div>
            <p className="form-note full">Fields marked * are required. The message is not sent until you send it in your email app or WhatsApp.</p>
            <p className="form-status full" role="status" aria-live="polite">{status}</p>
          </form>
          </div>
          <p className="booking-contact">
            Prefer to speak with us? Call <a href="tel:+6799665633">+679 966 5633</a>.
          </p>
        </div>
      </section>
    </>
  );
}
