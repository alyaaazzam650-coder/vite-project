import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faPlay, faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import "./Hero.css";
import GameImg from "../assets/imgs/gamePand.webp";

function Hero() {
  return (
    <section className="hero">
      {/* Background image layer */}
      <div
        className="hero__bg"
        style={{ backgroundImage: `url(${GameImg})` }}
      />
      {/* Gradient overlays */}
      <div className="hero__overlay" />
      <div className="hero__overlay-left" />

      {/* Floating grid lines decoration */}
      <div className="hero__grid" />

      <div className="hero__content">
        {/* Badge */}
        <div className="hero__badge">
          <FontAwesomeIcon icon={faBolt} className="hero__badge-icon" />
          <span>Featured Game</span>
        </div>

        {/* Title */}
        <h1 className="hero__title">
          <span className="hero__title-line1">NEON</span>
          <span className="hero__title-line2">ODYSSEY</span>
          <span className="hero__title-year">2077</span>
        </h1>

        {/* Rating */}
        <div className="hero__rating">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className={i < 4 ? "star--lit" : "star--dim"} />
          ))}
          <span className="hero__rating-text">4.8 / 5 · 12.4K Reviews</span>
        </div>

        <p className="hero__desc">
          Dive into a dystopian future where technology and humanity collide.
          Experience the most immersive open-world RPG of the decade.
        </p>

        {/* Meta info */}
        <div className="hero__meta">
          <div className="hero__meta-item">
            <span className="hero__meta-label">Release Date</span>
            <span className="hero__meta-value">Dec 25, 2025</span>
          </div>
          <div className="hero__meta-divider" />
          <div className="hero__meta-item">
            <span className="hero__meta-label">Genre</span>
            <span className="hero__meta-value">Open World RPG</span>
          </div>
          <div className="hero__meta-divider" />
          <div className="hero__meta-item">
            <span className="hero__meta-label">Price</span>
            <span className="hero__meta-value hero__meta-price">$59.99</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary">
            <FontAwesomeIcon icon={faShoppingCart} />
            Pre-Order Now
          </button>
          <button className="hero__btn hero__btn--secondary">
            <FontAwesomeIcon icon={faPlay} />
            Watch Trailer
          </button>
        </div>

        {/* Tags */}
        <div className="hero__tags">
          {["Cyberpunk", "Open World", "RPG", "4K Ready", "Ray Tracing"].map((tag) => (
            <span key={tag} className="hero__tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

export default Hero;