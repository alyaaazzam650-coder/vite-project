import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faShoppingCart,
  faGamepad,
  faArrowLeft,
  faCreditCard,
  faTag,
  faMinus,
  faPlus,
  faHome,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import "./Cart.css";

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    totalPrice,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart">

      <div className="cart__breadcrumb">
        <Link to="/" className="cart__breadcrumb-link">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className="cart__breadcrumb-sep" />
        <span className="cart__breadcrumb-current">Cart</span>
      </div>

    
      <div className="cart__header">
        <div className="cart__header-inner">
          <h1 className="cart__title">
            <FontAwesomeIcon icon={faShoppingCart} />
            Your Cart
          </h1>
          {cartItems.length > 0 && (
            <span className="cart__count">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart__empty">
          <div className="cart__empty-icon">
            <FontAwesomeIcon icon={faGamepad} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any games yet. Start exploring!</p>
          <button className="cart-btn cart-btn--primary" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faArrowLeft} /> Browse Games
          </button>
        </div>
      ) : (
        <div className="cart__layout">

          <div className="cart__items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart__item">

                <Link to={`/product/${item.id}`} className="cart__item-img-wrap" title="View product details">
                  <img src={item.image} alt={item.name} className="cart__item-img" />
                  <div className="cart__item-img-overlay">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </Link>

              
                <div className="cart__item-info">
                  <Link to={`/product/${item.id}`} className="cart__item-name">
                    {item.name}
                  </Link>
                  <span className="cart__item-genre">Digital Download</span>
                  <span className="cart__item-unit-price">
                    ${Number(item.price).toFixed(2)} each
                  </span>
                </div>

                <div className="cart__item-qty">
                  <button
                    className="cart__qty-btn"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label="Decrease quantity"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="cart__qty-value">{item.quantity}</span>
                  <button
                    className="cart__qty-btn"
                    onClick={() => increaseQuantity(item.id)}
                    aria-label="Increase quantity"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>

          
                <div className="cart__item-price">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </div>

           
                <button
                  className="cart__item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                  title="Remove from cart"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}

          
            <div className="cart__continue">
              <Link to="/" className="cart__continue-link">
                <FontAwesomeIcon icon={faArrowLeft} />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* ── Summary panel ── */}
          <div className="cart__summary">
            <div className="cart__summary-card">
              <h3 className="cart__summary-title">Order Summary</h3>

              {/* Per-item breakdown */}
              <div className="cart__summary-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart__summary-item-row">
                    <span className="cart__summary-item-name">
                      {item.name}
                      <span className="cart__summary-item-qty"> ×{item.quantity}</span>
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="cart__summary-rows">
                <div className="cart__summary-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="cart__summary-row">
                  <span>
                    <FontAwesomeIcon icon={faTag} /> Discount
                  </span>
                  <span className="cart__summary-free">-$0.00</span>
                </div>
                <div className="cart__summary-row">
                  <span>Taxes</span>
                  <span className="cart__summary-free">Calculated at checkout</span>
                </div>
              </div>

              <div className="cart__summary-total">
                <span>Total</span>
                <span className="cart__summary-total-price">${totalPrice.toFixed(2)}</span>
              </div>

              <button
                className="cart-btn cart-btn--primary cart-btn--full"
                onClick={() => navigate("/checkout")}
              >
                <FontAwesomeIcon icon={faCreditCard} />
                Proceed to Checkout
              </button>

              <button
                className="cart-btn cart-btn--ghost cart-btn--full"
                onClick={() => navigate("/")}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Continue Shopping
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default CartPage;