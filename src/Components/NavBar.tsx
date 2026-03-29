import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faMagnifyingGlass,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

const navLinks = [
  { label: "Featured",     tag: "featured"     },
  { label: "New Releases", tag: "new-releases" },
  { label: "Top Sellers",  tag: "top-sellers"  },
  { label: "VR Games",     tag: "vr-games"     },
  { label: "Browse All",   tag: ""             },
];

function NavBar() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  // Read active filter from URL
  const params = new URLSearchParams(location.search);
  const activeTag = params.get("category") || "";

  const handleNavClick = (tag: string) => {
    setMenuOpen(false);
    navigate(tag ? `/?category=${tag}` : "/");
    // Scroll to game grid
    setTimeout(() => {
      document.getElementById("game-grid")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__border" />

      <div className="navbar__inner">
        {/* Logo */}
        <a className="navbar__logo" href="/" onClick={() => setMenuOpen(false)}>
          <span className="navbar__logo-main">CYBERPUNK</span>
          <span className="navbar__logo-sub">Gaming Store</span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map(({ label, tag }) => (
            <li key={label}>
              <button
                className={`navbar__link ${activeTag === tag && location.pathname === "/" ? "navbar__link--active" : ""}`}
                onClick={() => handleNavClick(tag)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Search */}
        <form className="navbar__search" onSubmit={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="navbar__search-icon" />
          <input
            type="search"
            placeholder="Search games..."
            className="navbar__search-input"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </form>

        {/* Icons */}
        <div className="navbar__actions">
          <button className="navbar__icon-btn" aria-label="Profile" onClick={() => navigate("/user")}>
            <FontAwesomeIcon icon={faUser} />
          </button>

          <button
            className="navbar__icon-btn navbar__cart-btn"
            aria-label="Cart"
            onClick={() => navigate("/cart")}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            {cartItems.length > 0 && (
              <span className="navbar__badge">{cartItems.length}</span>
            )}
          </button>

          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {navLinks.map(({ label, tag }) => (
          <button
            key={label}
            className={`navbar__mobile-link ${activeTag === tag && location.pathname === "/" ? "navbar__mobile-link--active" : ""}`}
            onClick={() => handleNavClick(tag)}
          >
            {label}
          </button>
        ))}
        <form className="navbar__mobile-search" onSubmit={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="navbar__search-icon" />
          <input
            type="search"
            placeholder="Search games..."
            className="navbar__search-input"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
}

export default NavBar;