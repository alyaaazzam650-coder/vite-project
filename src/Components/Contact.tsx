import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPaperPlane,
  faBolt,
  faShield,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import "./contact.css";

function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="newsletter">
      {/* Background glow orbs */}
      <div className="newsletter__orb newsletter__orb--left" />
      <div className="newsletter__orb newsletter__orb--right" />

      <div className="newsletter__inner">
        <div className="newsletter__content">
          {/* Icon */}
          <div className="newsletter__icon-wrap">
            <FontAwesomeIcon icon={faEnvelope} className="newsletter__icon" />
          </div>

          <h2 className="newsletter__title">Stay Connected</h2>
          <p className="newsletter__subtitle">
            Get exclusive deals, early access to new releases, and cyberpunk gaming news.
          </p>

          {/* Perks */}
          <div className="newsletter__perks">
            {[
              { icon: faBolt, text: "Early access to new releases" },
              { icon: faGift, text: "Exclusive subscriber discounts" },
              { icon: faShield, text: "No spam, unsubscribe anytime" },
            ].map(({ icon, text }) => (
              <div key={text} className="newsletter__perk">
                <FontAwesomeIcon icon={icon} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="newsletter__form-wrap">
          {submitted ? (
            <div className="newsletter__success">
              <div className="newsletter__success-icon">
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
              <h3>You're in!</h3>
              <p>Welcome to the crew. Check your inbox for a confirmation.</p>
            </div>
          ) : (
            <form className="newsletter__form" onSubmit={handleSubmit}>
              <label className="newsletter__label">Email Address</label>
              <div className="newsletter__input-row">
                <div className="newsletter__input-wrap">
                  <FontAwesomeIcon icon={faEnvelope} className="newsletter__input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter__input"
                    required
                  />
                </div>
                <button type="submit" className="newsletter__submit">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Subscribe
                </button>
              </div>
              <p className="newsletter__disclaimer">
                By subscribing you agree to receive marketing emails from CYBERPUNK Gaming Store.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;