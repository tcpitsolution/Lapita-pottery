import { useEffect, useRef, useState } from "react";
import { config } from "../config";
import "./Chatbot.css";

const BOT = "bot";
const USER = "user";

const FAQ = [
  {
    keys: ["pottery", "piece", "buy", "purchase", "order", "vessel", "tableware", "keepsake"],
    answer: "We make handcrafted pottery including decorated vessels, tableware sets, and small keepsakes. You can enquire about a specific piece on our Order page, or message us directly on WhatsApp.",
  },
  {
    keys: ["visit", "tour", "come", "trip", "island", "booking", "book"],
    answer: "We welcome visitors to Nakabuta, Sigatoka, Fiji! You can plan a visit or request an island tour through our Booking page. We'd love to have you.",
  },
  {
    keys: ["price", "cost", "how much", "fj$", "fjd", "dollar"],
    answer: "Pricing varies by piece. Please use our Order page or contact us directly and we'll be happy to share current pricing.",
  },
  {
    keys: ["location", "address", "where", "find", "map", "directions", "sigatoka", "nakabuta", "fiji"],
    answer: "We're located in Nakabuta, Sigatoka, Fiji Islands. You can get directions from the Contact page or via Google Maps.",
  },
  {
    keys: ["contact", "phone", "email", "call", "reach", "whatsapp"],
    answer: `You can reach us by phone at +679 966 5633, by email at ${config.email}, or on WhatsApp. We're happy to help!`,
  },
  {
    keys: ["gallery", "photo", "picture", "image", "see", "look"],
    answer: "Check out our Gallery page to see photos of the pottery collection — vessels, tableware, and more.",
  },
  {
    keys: ["story", "about", "effie", "lapita", "history", "who"],
    answer: "Effie Lapita Pottery is rooted in the craft and culture of Nakabuta village. Visit our 'Our Story' page to learn more about the people and traditions behind the pottery.",
  },
  {
    keys: ["experience", "workshop", "class", "make", "try"],
    answer: "We offer experiences including pottery discovery and village visits. Head to our Experiences page or get in touch to find out what's available.",
  },
];

const LEAD_STEPS = ["name", "email", "phone", "done"];

function getBotReply(text) {
  const lower = text.toLowerCase();
  for (const faq of FAQ) {
    if (faq.keys.some((k) => lower.includes(k))) return faq.answer;
  }
  return "Thanks for your message! For the best help, please contact us directly at +679 966 5633 or use the Contact page. Is there anything else I can help with?";
}

function msg(role, text) {
  return { role, text, id: Date.now() + Math.random() };
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    msg(BOT, "👋 Hi, I'm here! I'm the Effie Lapita Pottery assistant. Ask me about our pottery, visits, location, or anything else!"),
    msg(BOT, "I can also connect you with our team — just say \"contact\" or ask your question below."),
  ]);
  const [input, setInput] = useState("");
  const [leadStep, setLeadStep] = useState(null); // null | 'name' | 'email' | 'phone' | 'done'
  const [leadData, setLeadData] = useState({});
  const [greeted, setGreeted] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Show greeting bubble after 3s
  useEffect(() => {
    const t = setTimeout(() => setGreeted(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function addMsg(role, text) {
    setMessages((prev) => [...prev, msg(role, text)]);
  }

  function forwardToAdmin(data) {
    const text = `New enquiry from website chatbot:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}`;
    const waNumber = config.whatsapp.replace(/\D/g, "");
    if (waNumber) {
      window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank");
    }
  }

  function handleLeadInput(value) {
    if (leadStep === "name") {
      const updated = { ...leadData, name: value };
      setLeadData(updated);
      setLeadStep("email");
      addMsg(USER, value);
      setTimeout(() => addMsg(BOT, `Nice to meet you, ${value}! What's your email address?`), 400);
    } else if (leadStep === "email") {
      const updated = { ...leadData, email: value };
      setLeadData(updated);
      setLeadStep("phone");
      addMsg(USER, value);
      setTimeout(() => addMsg(BOT, "And your phone number (optional — press Enter to skip)?"), 400);
    } else if (leadStep === "phone") {
      const updated = { ...leadData, phone: value || "Not provided" };
      setLeadData(updated);
      setLeadStep("done");
      addMsg(USER, value || "(skipped)");
      setTimeout(() => {
        addMsg(BOT, "Thank you! Your details have been forwarded to our team. We'll be in touch soon. 🙏");
        forwardToAdmin(updated);
      }, 400);
    }
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");

    if (leadStep && leadStep !== "done") {
      handleLeadInput(text);
      return;
    }

    addMsg(USER, text);

    const lower = text.toLowerCase();
    if (lower.includes("leave") || lower.includes("my detail") || lower.includes("contact me") || lower.includes("call me") || lower.includes("reach me")) {
      setLeadStep("name");
      setTimeout(() => addMsg(BOT, "Sure! I'll pass your details to our team. What's your name?"), 400);
      return;
    }

    setTimeout(() => addMsg(BOT, getBotReply(text)), 500);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const placeholder =
    leadStep === "name" ? "Your name…"
    : leadStep === "email" ? "Your email…"
    : leadStep === "phone" ? "Your phone (or press Enter to skip)…"
    : "Ask me anything…";

  return (
    <>
      {/* Greeting bubble */}
      {!open && greeted && (
        <button className="chatbot-bubble" onClick={() => setOpen(true)} aria-label="Open chat">
          Hi, I'm here! 👋
        </button>
      )}

      {/* Robot toggle button */}
      <button
        className={`chatbot-toggle ${open ? "chatbot-toggle-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20"><path d="M18 6 6 18M6 6l12 12"/></svg>
        ) : (
          <span className="robot-face" aria-hidden="true">
            <span className="robot-antenna" />
            <span className="robot-head">
              <span className="robot-eyes">
                <span className="robot-eye" />
                <span className="robot-eye" />
              </span>
              <span className="robot-mouth" />
            </span>
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="chatbot-window" role="dialog" aria-label="Chat with Effie Lapita Pottery">
          <div className="chatbot-header">
            <span className="robot-face robot-face-sm" aria-hidden="true">
              <span className="robot-antenna" />
              <span className="robot-head">
                <span className="robot-eyes">
                  <span className="robot-eye" />
                  <span className="robot-eye" />
                </span>
                <span className="robot-mouth" />
              </span>
            </span>
            <div>
              <div className="chatbot-name">Lapita Bot</div>
              <div className="chatbot-status">● Online &amp; ready to help</div>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((m) => (
              <div key={m.id} className={`chatbot-msg chatbot-msg-${m.role}`}>
                {m.text}
              </div>
            ))}
            {leadStep === null && (
              <button
                className="chatbot-lead-btn"
                onClick={() => {
                  setLeadStep("name");
                  addMsg(BOT, "Sure! I'll pass your details to our team. What's your name?");
                }}
              >
                📋 Leave my details for the team
              </button>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chatbot-input-row">
            <input
              ref={inputRef}
              className="chatbot-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={placeholder}
              aria-label="Type a message"
            />
            <button className="chatbot-send" onClick={handleSend} aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
