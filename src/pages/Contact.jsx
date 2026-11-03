import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { config } from "../config";
import PageHero from "../components/PageHero";
import video2 from "../images/2nd.mp4";
import potteryImage from "../images/WhatsApp Image 2026-09-29 at 11.46.06.jpeg";
import useReveal from "../useReveal";

export default function Contact() {
  const detailsRef = useReveal();
  const visitRef = useReveal();
  const locationUrl = config.maps || "https://www.google.com/maps/search/?api=1&query=Nakabuta+-+Lapita+Pottery+Village,+VGQF%2BF24,+Sigatoka,+Fiji";
  const whatsappNumber = config.whatsapp.replace(/\D/g, "");
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "";

  return (
    <>
      <PageHero title="We would love to hear from you" kicker="CONTACT" video={video2} />
      <section className="section contact-section">
        <div className="container contact-grid">
          <div ref={detailsRef} className="contact-copy reveal-left">
            <span className="eyebrow">Get in touch</span>
            <h2>Let’s make <em>an introduction.</em></h2>
            <p className="lead">
              Ask about pottery, visiting Nakabuta or current arrangements. We’ll be glad to hear from you.
            </p>

            <div className="contact-list">
              <div className="contact-item">
                <span className="contact-icon"><MapPin size={19} aria-hidden="true" /></span>
                <div>
                  <h3>Find us</h3>
                  <p>Nakabuta Village<br />Sigatoka, Fiji</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><Phone size={19} aria-hidden="true" /></span>
                <div><h3>Call</h3><a href="tel:+6799665633">+679 966 5633</a></div>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><Mail size={19} aria-hidden="true" /></span>
                <div><h3>Email</h3><a href={`mailto:${config.email}`}>{config.email}</a></div>
              </div>
              {whatsappUrl && (
                <div className="contact-item">
                  <span className="contact-icon"><MessageCircle size={19} aria-hidden="true" /></span>
                  <div>
                    <h3>WhatsApp</h3>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Start a conversation</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div ref={visitRef} className="contact-visit reveal-right">
            <img src={potteryImage} alt="Traditional pottery displayed at Effie Lapita Pottery" loading="lazy" />
            <div className="contact-visit-card">
              <iframe
                title="Effie Lapita Pottery – Nakabuta Village, Sigatoka, Fiji"
                src="https://maps.google.com/maps?q=VGQF%2BF24+Sigatoka+Fiji&output=embed&z=16"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
