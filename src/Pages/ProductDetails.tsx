import  { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faShoppingCart,
  faHome,
  faGamepad,
  faCalendar,
  faCode,
  faBuilding,
  faStar,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../Context/CartContext.tsx";
import "./ProductDetails.css";

interface Game {
  id: number;
  name: string;
  price: number;
  genre: string;
  description: string;
  image: string;
  photos: string[];
}

function GameDetails() {
  const { id } = useParams<{ id: string }>();
  const gameId = Number(id);
  const [game, setGame] = useState<Game | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.games.find((g: Game) => g.id === gameId);
        setGame(found || null);
      });
  }, [gameId]);

  if (!game) {
    return (
      <div className="gd-notfound">
        <FontAwesomeIcon icon={faGamepad} className="gd-notfound__icon" />
        <h2>Game Not Found</h2>
        <p>The game you're looking for doesn't exist in our store.</p>
        <Link to="/" className="gd-btn gd-btn--primary">
          <FontAwesomeIcon icon={faHome} /> Back to Home
        </Link>
      </div>
    );
  }

  const nextPhoto = () => setCurrentPhoto((p) => (p + 1) % game.photos.length);
  const prevPhoto = () => setCurrentPhoto((p) => (p - 1 + game.photos.length) % game.photos.length);

  return (
    <div className="gd">
      {/* Breadcrumb */}
      <div className="gd__breadcrumb">
        <div className="gd__breadcrumb-inner">
          <Link to="/" className="gd__breadcrumb-link">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <span className="gd__breadcrumb-sep">›</span>
          <span className="gd__breadcrumb-current">{game.name}</span>
        </div>
      </div>

      <div className="gd__layout">
        {/* LEFT COLUMN */}
        <div className="gd__left">
          {/* Gallery */}
          <div className="gd__gallery">
            <div className="gd__gallery-main">
              <img
                src={game.photos[currentPhoto]}
                alt={`${game.name} screenshot ${currentPhoto + 1}`}
                className="gd__gallery-img"
              />
              {/* Navigation arrows */}
              <button className="gd__gallery-nav gd__gallery-nav--prev" onClick={prevPhoto}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className="gd__gallery-nav gd__gallery-nav--next" onClick={nextPhoto}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
              {/* Counter */}
              <div className="gd__gallery-counter">
                {currentPhoto + 1} / {game.photos.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            {game.photos.length > 1 && (
              <div className="gd__gallery-thumbs">
                {game.photos.map((photo, i) => (
                  <button
                    key={i}
                    className={`gd__thumb ${i === currentPhoto ? "gd__thumb--active" : ""}`}
                    onClick={() => setCurrentPhoto(i)}
                  >
                    <img src={photo} alt={`thumb ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* About section */}
          <div className="gd__card">
            <h3 className="gd__card-title">About This Game</h3>
            <p className="gd__card-body">{game.description}</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="gd__right">
          {/* Main info card */}
          <div className="gd__info-card">
            <span className="gd__genre-badge">{game.genre}</span>
            <h1 className="gd__game-title">{game.name}</h1>

            {/* Rating */}
            <div className="gd__stars">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className={i < 4 ? "star--lit" : "star--dim"} />
              ))}
              <span className="gd__star-count">4.1 (2.3K)</span>
            </div>

            <div className="gd__price-row">
              <span className="gd__price">${game.price.toFixed(2)}</span>
              <span className="gd__price-original">${(game.price * 1.2).toFixed(2)}</span>
              <span className="gd__discount">-20%</span>
            </div>

            <div className="gd__actions">
              <button
                className="gd-btn gd-btn--primary gd-btn--full"
                onClick={() => addToCart && addToCart(game)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                Add to Cart
              </button>
              <button
                className={`gd-btn gd-btn--icon ${wishlist ? "gd-btn--wishlist-active" : ""}`}
                onClick={() => setWishlist(!wishlist)}
                aria-label="Add to wishlist"
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>

          {/* Game info card */}
          <div className="gd__card">
            <h3 className="gd__card-title">Game Info</h3>
            <div className="gd__info-list">
              {[
                { icon: faCalendar, label: "Release Date", value: "TBD" },
                { icon: faCode, label: "Developer", value: "TBD" },
                { icon: faBuilding, label: "Publisher", value: "TBD" },
                { icon: faGamepad, label: "Genre", value: game.genre },
              ].map(({ icon, label, value }) => (
                <div key={label} className="gd__info-row">
                  <span className="gd__info-label">
                    <FontAwesomeIcon icon={icon} /> {label}
                  </span>
                  <span className="gd__info-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;