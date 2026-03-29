import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faFire,
  faStar,
  faGamepad,
  faFilter,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./TrendingNow.css";
import { CartContext } from "../Context/CartContext";

interface Game {
  id: number;
  price: number;
  name: string;
  genre: string;
  image: string;
  tags: string[];
}

const CATEGORY_LABELS: Record<string, string> = {
  "featured":     "Featured",
  "new-releases": "New Releases",
  "top-sellers":  "Top Sellers",
  "vr-games":     "VR Games",
  "":             "All Games",
};

function Trending() {
  const [games, setGames] = useState<Game[]>([]);
  const [toastGame, setToastGame] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useContext(CartContext);

  // Read filters from URL
  const params = new URLSearchParams(location.search);
  const activeCategory = params.get("category") || "";
  const searchQuery = params.get("search") || "";

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setGames(data.games));
  }, []);

  // Filter logic
  const filteredGames = games.filter((game) => {
    const matchesCategory =
      activeCategory === "" || game.tags?.includes(activeCategory);
    const matchesSearch =
      searchQuery === "" ||
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (e: React.MouseEvent, game: Game) => {
    e.stopPropagation();
    addToCart(game);
    setToastGame(game.name);
    setTimeout(() => setToastGame(null), 3000);
  };

  const clearFilter = () => navigate("/");

  const sectionLabel =
    searchQuery
      ? `Search: "${searchQuery}"`
      : CATEGORY_LABELS[activeCategory] ?? "All Games";

  return (
    <section className="trending" id="game-grid">
      {/* Section header */}
      <div className="trending__header">
        <div className="trending__header-left">
          <div className="trending__label">
            <FontAwesomeIcon
              icon={searchQuery ? faSearch : activeCategory ? faFilter : faFire}
              className="trending__label-icon"
            />
            <span>{searchQuery ? "Search Results" : activeCategory ? "Filtered" : "Hot Right Now"}</span>
          </div>
          <h2 className="trending__title">{sectionLabel}</h2>
        </div>

        <div className="trending__header-right">
        
          <span className="trending__count">
            {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""}
          </span>

         
          {(activeCategory || searchQuery) && (
            <button className="trending__clear" onClick={clearFilter}>
              <FontAwesomeIcon icon={faXmark} />
              Clear Filter
            </button>
          )}
        </div>
      </div>

    
      {filteredGames.length === 0 ? (
        <div className="trending__empty">
          <FontAwesomeIcon icon={faGamepad} />
          <p>No games found for "{searchQuery || activeCategory}"</p>
          <button className="trending__clear" onClick={clearFilter}>
            Browse All Games
          </button>
        </div>
      ) : (
        <div className="trending__grid">
          {filteredGames.map((game, index) => (
            <div
              key={game.id}
              className="game-card"
              style={{ animationDelay: `${index * 0.06}s` }}
              onClick={() => navigate(`/product/${game.id}`)}
            >
            
              <div className="game-card__img-wrap">
                <img src={game.image} alt={game.name} className="game-card__img" />
                <div className="game-card__img-overlay" />

                {game.tags?.includes("new-releases") && (
                  <span className="game-card__badge game-card__badge--new">New</span>
                )}
                {game.tags?.includes("top-sellers") && !game.tags?.includes("new-releases") && (
                  <span className="game-card__badge game-card__badge--hot">Hot</span>
                )}
                {game.tags?.includes("vr-games") && (
                  <span className="game-card__badge game-card__badge--vr">VR</span>
                )}

                <div className="game-card__hover-info">
                  <span className="game-card__hover-text">View Details</span>
                </div>
              </div>

              <div className="game-card__body">
                <span className="game-card__genre">{game.genre}</span>
                <h3 className="game-card__name">{game.name}</h3>

                <div className="game-card__stars">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={i < 4 ? "star--lit" : "star--dim"}
                    />
                  ))}
                </div>

                <div className="game-card__footer">
                  <div className="game-card__prices">
                    <span className="game-card__price">${game.price}</span>
                    <span className="game-card__price-old">
                      ${(game.price * 1.2).toFixed(2)}
                    </span>
                  </div>

                  <button
                    className="game-card__btn"
                    onClick={(e) => handleAddToCart(e, game)}
                    aria-label={`Add ${game.name} to cart`}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                </div>
              </div>

              <div className="game-card__glow" />
            </div>
          ))}
        </div>
      )}


      <div className={`trending__toast ${toastGame ? "trending__toast--show" : ""}`}>
        <FontAwesomeIcon icon={faCartShopping} className="trending__toast-icon" />
        <div>
          <p className="trending__toast-title">Added to Cart!</p>
          <p className="trending__toast-game">{toastGame}</p>
        </div>
      </div>
    </section>
  );
}

export default Trending;