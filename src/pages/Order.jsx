import { useRef, useState } from "react";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import PageHero from "../components/PageHero";
import { config } from "../config";
import video3 from "../images/3rd.mp4";
import { products } from "../data/products";
import useReveal from "../useReveal";

const initialForm = { name: "", phone: "", email: "", message: "" };

export default function Order() {
  const [form, setForm] = useState(initialForm);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [status, setStatus] = useState("");
  const formRef = useRef(null);
  const headingRef = useReveal();
  const gridRef = useReveal();
  const orderFormRef = useReveal();
  const selectedProductNames = products
    .filter((product) => selectedProducts.includes(product.id))
    .map((product) => product.name);

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setStatus("");
  };

  const message = [
    "Hello, I would like to ask about pottery.",
    "",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Interested in: ${selectedProductNames.join(", ") || "As described in the message below"}`,
    `Message: ${form.message || "Please share availability and pricing."}`,
  ].join("\n");
  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = config.whatsapp.replace(/\D/g, "");
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : "";
  const emailUrl = `mailto:${config.email}?subject=${encodeURIComponent("Pottery enquiry — Effie Lapita Pottery")}&body=${encodedMessage}`;

  const validateBeforeOpening = (event) => {
    if (!formRef.current?.reportValidity()) {
      event.preventDefault();
      return;
    }
    if (!selectedProducts.length && !form.message.trim()) {
      event.preventDefault();
      setStatus("Choose a style above or describe the pottery you are looking for.");
      document.getElementById("order-message")?.focus();
      return;
    }
    setStatus("Your message should open in the selected app. Please send it there to complete your enquiry.");
  };

  const toggleProduct = (productId) => {
    setSelectedProducts((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId]);
    setStatus("");
  };

  return (
    <>
      <PageHero title="Enquire about pottery" kicker="THE COLLECTION" video={video3} />
      <section className="section order-section">
        <div className="container">
          <div ref={headingRef} className="section-heading reveal">
            <div>
              <span className="eyebrow">Made by hand in Nakabuta</span>
              <h2>Which piece caught <em>your eye?</em></h2>
            </div>
            <p className="section-intro">
              Select a style or describe what you are looking for. The team can confirm availability and pricing directly.
            </p>
          </div>

          <div ref={gridRef} className="product-grid reveal">
            {products.map((product) => (
              <article className={`product-card ${selectedProducts.includes(product.id) ? "selected" : ""}`} key={product.id}>
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="product-card-body">
                  <span className="product-card-kicker">Pottery</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => toggleProduct(product.id)}
                    aria-pressed={selectedProducts.includes(product.id)}
                  >
                    {selectedProducts.includes(product.id) ? "Remove from enquiry" : "Add to enquiry"}
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {selectedProducts.length > 0 && (
            <div className="order-selection" aria-live="polite">
              <div>
                <span className="eyebrow">Your enquiry list</span>
                <h3>{selectedProducts.length} style{selectedProducts.length === 1 ? "" : "s"} selected</h3>
              </div>
              <ul>
                {products.filter((product) => selectedProducts.includes(product.id)).map((product) => (
                  <li key={product.id}>
                    <span>{product.name}</span>
                    <button type="button" onClick={() => toggleProduct(product.id)} aria-label={`Remove ${product.name}`}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <a className="text-link" href="#order-form">Continue to enquiry <ArrowRight size={15} aria-hidden="true" /></a>
            </div>
          )}

          <div ref={orderFormRef} className="reveal">
          <form
            ref={formRef}
            id="order-form"
            className="luxury-form order-form"
            onChange={updateForm}
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="form-intro full">
              <span className="eyebrow">Send an enquiry</span>
              <h2>Let’s start a <em>conversation.</em></h2>
              <p>Product availability and prices are confirmed by the team.</p>
            </div>
            <div className="form-field">
              <label htmlFor="order-name">Name <span aria-hidden="true">*</span></label>
              <input id="order-name" required name="name" autoComplete="name" />
            </div>
            <div className="form-field">
              <label htmlFor="order-phone">Phone <span aria-hidden="true">*</span></label>
              <input id="order-phone" required name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="form-field full">
              <label htmlFor="order-email">Email <span aria-hidden="true">*</span></label>
              <input id="order-email" required type="email" name="email" autoComplete="email" />
            </div>
            <div className="form-field full">
              <label htmlFor="order-message">Tell us about what you have in mind</label>
              <textarea id="order-message" name="message" rows="4" />
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
                  <MessageCircle size={16} aria-hidden="true" /> Enquire by WhatsApp
                </a>
              ) : (
                <span className="channel-unavailable">WhatsApp is not configured.</span>
              )}
              <a className="btn btn-outline" href={emailUrl} onClick={validateBeforeOpening}>
                <Mail size={16} aria-hidden="true" /> Enquire by email
              </a>
            </div>
            <p className="form-note full">
              Your enquiry is not submitted until you send the message in the selected app.
            </p>
            <p className="form-status full" role="status" aria-live="polite">{status}</p>
          </form>
          </div>
        </div>
      </section>
    </>
  );
}
