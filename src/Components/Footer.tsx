import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faDiscord,
  faTwitch,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const footerLinks = {
  Store: ["Featured Games", "New Releases", "Top Sellers", "VR Games", "Browse All"],
  Support: ["Help Center", "Refund Policy", "System Requirements", "Contact Us"],
  Company: ["About Us", "Careers", "Press Kit", "Privacy Policy"],
};

const socials = [
  { icon: faTwitter, label: "Twitter" },
  { icon: faDiscord, label: "Discord" },
  { icon: faTwitch, label: "Twitch" },
  { icon: faYoutube, label: "YouTube" },
];

function Footer() {
  return (
    <footer className="footer">
      {/* Top border glow */}
      <div className="footer__border" />

      <div className="footer__inner">
        {/* Brand column */}
        <div className="footer__brand">
          <a href="/" className="footer__logo">
            <span className="footer__logo-main">CYBERPUNK</span>
            <span className="footer__logo-sub">Gaming Store</span>
          </a>
          <p className="footer__tagline">
            The ultimate destination for next-gen gaming experiences. Explore thousands of titles across all platforms.
          </p>
          <div className="footer__socials">
            {socials.map(({ icon, label }) => (
              <a key={label} href="#" className="footer__social" aria-label={label}>
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category} className="footer__col">
            <h4 className="footer__col-title">{category}</h4>
            <ul className="footer__col-links">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="footer__link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copy">
            &copy; 2024 CYBERPUNK Gaming Store. All rights reserved.
          </p>
          <p className="footer__credit">
            Designed with <span className="footer__heart">♥</span> for gamers
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;