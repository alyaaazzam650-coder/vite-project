import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline,
  InputAdornment,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faUser,
  faEnvelope,
  faLocationDot,
  faShieldHalved,
  faCheckCircle,
  faCartShopping,
  faArrowLeft,
  faLock,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../Context/CartContext";
import "./Checkout.css";

// ── Same cyberpunk MUI theme ──────────────────────
const cyberpunkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00d4ff" },
    error: { main: "#f87171" },
    background: { default: "#04020f", paper: "#0c061e" },
    text: { primary: "#e2d9f3", secondary: "rgba(180,160,220,0.6)" },
  },
  typography: { fontFamily: "'Rajdhani', sans-serif" },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(4,2,15,0.7)",
            borderRadius: "10px",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.95rem",
            color: "#e2d9f3",
            "& fieldset": { borderColor: "rgba(123,47,255,0.3)" },
            "&:hover fieldset": { borderColor: "rgba(123,47,255,0.6)" },
            "&.Mui-focused fieldset": {
              borderColor: "#00d4ff",
              boxShadow: "0 0 0 3px rgba(0,212,255,0.08)",
            },
            "&.Mui-error fieldset": { borderColor: "rgba(248,113,113,0.6)" },
          },
          "& .MuiInputLabel-root": {
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.85rem",
            color: "rgba(0,212,255,0.5)",
            "&.Mui-focused": { color: "#00d4ff" },
            "&.Mui-error": { color: "#f87171" },
          },
          "& .MuiFormHelperText-root": {
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.75rem",
          },
          "& input": { color: "#e2d9f3" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Orbitron', monospace",
          fontWeight: 700,
          fontSize: "0.7rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          borderRadius: "10px",
          padding: "0.85rem",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        },
      },
    },
  },
});

// ── Success screen ────────────────────────────────
function SuccessScreen({ orderNumber }: { orderNumber: string }) {
  const navigate = useNavigate();
  return (
    <Box className="checkout-success">
      <Box className="checkout-success__icon">
        <FontAwesomeIcon icon={faCheckCircle} />
      </Box>
      <Typography sx={{
        fontFamily: "'Orbitron', monospace", fontWeight: 900,
        fontSize: "1.5rem", color: "#fff", mb: 1,
      }}>
        Order Confirmed!
      </Typography>
      <Typography sx={{
        fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem",
        color: "rgba(180,160,220,0.6)", mb: 1, lineHeight: 1.7,
        maxWidth: 340, textAlign: "center",
      }}>
        Your purchase was successful. Your games will be available
        in your library shortly.
      </Typography>
      <Box sx={{
        background: "rgba(123,47,255,0.08)",
        border: "1px solid rgba(123,47,255,0.2)",
        borderRadius: "10px", px: 3, py: 1.2, mb: 3,
      }}>
        <Typography sx={{
          fontFamily: "'Orbitron', monospace", fontSize: "0.65rem",
          color: "rgba(0,212,255,0.5)", letterSpacing: "2px", mb: 0.3,
        }}>
          ORDER NUMBER
        </Typography>
        <Typography sx={{
          fontFamily: "'Orbitron', monospace", fontSize: "1rem",
          fontWeight: 700,
          background: "linear-gradient(90deg, #a855f7, #00d4ff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {orderNumber}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/user")}
          startIcon={<FontAwesomeIcon icon={faUser} />}
          sx={{
            background: "linear-gradient(135deg, #7b2fff, #00d4ff)",
            boxShadow: "0 4px 20px rgba(123,47,255,0.4)",
            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 30px rgba(123,47,255,0.6)" },
          }}
        >
          View Profile
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          startIcon={<FontAwesomeIcon icon={faGamepad} />}
          sx={{
            border: "1px solid rgba(0,212,255,0.35)",
            color: "#00d4ff",
            "&:hover": { background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.6)" },
          }}
        >
          Browse More
        </Button>
      </Box>
    </Box>
  );
}

// ── Main Checkout ─────────────────────────────────
function Checkout() {
  const { cartItems, totalPrice, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderDone, setOrderDone] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (_data: any) => {
    // Generate order number
    const num = `CP-${Date.now().toString().slice(-6)}`;
    setOrderNumber(num);

    // Save to purchase history in localStorage
    const existing = JSON.parse(localStorage.getItem("purchases") || "[]");
    const newPurchases = cartItems.map((item) => ({
      ...item,
      orderId: num,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      }),
      status: "Completed",
    }));
    localStorage.setItem("purchases", JSON.stringify([...existing, ...newPurchases]));

    // Clear the cart
    cartItems.forEach((item) => removeFromCart(item.id));

    // Show success
    setOrderDone(true);
  };

  // Empty cart guard
  if (cartItems.length === 0 && !orderDone) {
    return (
      <ThemeProvider theme={cyberpunkTheme}>
        <CssBaseline />
        <Box className="checkout-page">
          <Box className="login-orb login-orb--1" />
          <Box className="login-orb login-orb--2" />
          <Box className="login-grid" />
          <Box className="checkout-empty">
            <Box className="checkout-empty__icon">
              <FontAwesomeIcon icon={faCartShopping} />
            </Box>
            <Typography sx={{
              fontFamily: "'Orbitron', monospace", fontWeight: 700,
              fontSize: "1.2rem", color: "#fff", mb: 1,
            }}>
              Your Cart is Empty
            </Typography>
            <Typography sx={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem",
              color: "rgba(180,160,220,0.55)", mb: 3,
            }}>
              Add some games before checking out!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
              sx={{
                background: "linear-gradient(135deg, #7b2fff, #00d4ff)",
                boxShadow: "0 4px 20px rgba(123,47,255,0.4)",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            >
              Browse Games
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <CssBaseline />
      <Box className="checkout-page">
        <Box className="login-orb login-orb--1" />
        <Box className="login-orb login-orb--2" />
        <Box className="login-grid" />

        {orderDone ? (
          <SuccessScreen orderNumber={orderNumber} />
        ) : (
          <Box className="checkout-inner">

            {/* ── LEFT: Form ── */}
            <Box className="checkout-form-col">
              <Box className="checkout-card">
                <Box className="checkout-card__bar" />

                {/* Header */}
                <Box sx={{ mb: 3 }}>
                  <Button
                    size="small"
                    onClick={() => navigate("/cart")}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                    sx={{
                      background: "transparent",
                      border: "1px solid rgba(123,47,255,0.25)",
                      color: "rgba(180,160,220,0.6)",
                      fontSize: "0.62rem", mb: 2, px: 1.5, py: 0.5,
                      "&:hover": { borderColor: "rgba(0,212,255,0.4)", color: "#00d4ff" },
                    }}
                  >
                    Back to Cart
                  </Button>
                  <Typography sx={{
                    fontFamily: "'Orbitron', monospace", fontWeight: 900,
                    fontSize: "1.3rem", color: "#fff",
                  }}>
                    Checkout
                  </Typography>
                  <Typography sx={{
                    fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem",
                    color: "rgba(180,160,220,0.5)", mt: 0.3,
                  }}>
                    Complete your purchase below
                  </Typography>
                </Box>

                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  {/* ── Section: Personal Info ── */}
                  <Typography sx={{
                    fontFamily: "'Orbitron', monospace", fontSize: "0.62rem",
                    fontWeight: 700, color: "#00d4ff", letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />
                    Personal Info
                  </Typography>

                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <TextField
                      label="First Name"
                      fullWidth
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message as string}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FontAwesomeIcon icon={faUser} style={{ color: "rgba(123,47,255,0.5)", fontSize: "0.75rem" }} />
                          </InputAdornment>
                        ),
                      }}
                      {...register("firstName", { required: "Required" })}
                    />
                    <TextField
                      label="Last Name"
                      fullWidth
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message as string}
                      {...register("lastName", { required: "Required" })}
                    />
                  </Box>

                  <TextField
                    label="Email Address"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faEnvelope} style={{ color: "rgba(123,47,255,0.5)", fontSize: "0.75rem" }} />
                        </InputAdornment>
                      ),
                    }}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /@/, message: "Must contain @" },
                    })}
                  />

                  <TextField
                    label="Address"
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address?.message as string}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faLocationDot} style={{ color: "rgba(123,47,255,0.5)", fontSize: "0.75rem" }} />
                        </InputAdornment>
                      ),
                    }}
                    {...register("address", { required: "Address is required" })}
                  />

                  <Divider sx={{ borderColor: "rgba(123,47,255,0.15)" }} />

                  {/* ── Section: Payment ── */}
                  <Typography sx={{
                    fontFamily: "'Orbitron', monospace", fontSize: "0.62rem",
                    fontWeight: 700, color: "#00d4ff", letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}>
                    <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: 8 }} />
                    Payment Details
                  </Typography>

                  <TextField
                    label="Cardholder Name"
                    fullWidth
                    error={!!errors.cardName}
                    helperText={errors.cardName?.message as string}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faUser} style={{ color: "rgba(123,47,255,0.5)", fontSize: "0.75rem" }} />
                        </InputAdornment>
                      ),
                    }}
                    {...register("cardName", { required: "Name on card is required" })}
                  />

                  <TextField
                    label="Card Number"
                    fullWidth
                    placeholder="1234 5678 9012 3456"
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber?.message as string}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faCreditCard} style={{ color: "rgba(123,47,255,0.5)", fontSize: "0.75rem" }} />
                        </InputAdornment>
                      ),
                    }}
                    {...register("cardNumber", {
                      required: "Card number is required",
                      minLength: { value: 16, message: "Enter a valid card number" },
                      maxLength: { value: 19, message: "Enter a valid card number" },
                    })}
                  />

                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <TextField
                      label="Expiry Date"
                      placeholder="MM/YY"
                      fullWidth
                      error={!!errors.expiry}
                      helperText={errors.expiry?.message as string}
                      {...register("expiry", {
                        required: "Required",
                        pattern: { value: /^\d{2}\/\d{2}$/, message: "Format: MM/YY" },
                      })}
                    />
                    <TextField
                      label="CVV"
                      placeholder="•••"
                      fullWidth
                      type="password"
                      error={!!errors.cvv}
                      helperText={errors.cvv?.message as string}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FontAwesomeIcon icon={faLock} style={{ color: "rgba(123,47,255,0.5)", fontSize: "0.75rem" }} />
                          </InputAdornment>
                        ),
                      }}
                      {...register("cvv", {
                        required: "Required",
                        minLength: { value: 3, message: "3 digits" },
                        maxLength: { value: 4, message: "3-4 digits" },
                      })}
                    />
                  </Box>

                  {/* Security note */}
                  <Box sx={{
                    display: "flex", alignItems: "center", gap: 1,
                    background: "rgba(74,222,128,0.06)",
                    border: "1px solid rgba(74,222,128,0.2)",
                    borderRadius: "8px", px: 1.5, py: 1,
                  }}>
                    <FontAwesomeIcon icon={faShieldHalved} style={{ color: "#4ade80", fontSize: "0.8rem" }} />
                    <Typography sx={{
                      fontFamily: "'Rajdhani', sans-serif", fontSize: "0.78rem",
                      color: "rgba(74,222,128,0.8)",
                    }}>
                      Your payment info is encrypted and secure
                    </Typography>
                  </Box>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    startIcon={<FontAwesomeIcon icon={faCheckCircle} />}
                    sx={{
                      mt: 1,
                      background: "linear-gradient(135deg, #7b2fff 0%, #00d4ff 100%)",
                      boxShadow: "0 4px 20px rgba(123,47,255,0.4)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #9b4fff 0%, #22e4ff 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 30px rgba(123,47,255,0.6)",
                      },
                      "&.Mui-disabled": {
                        opacity: 0.5,
                        background: "linear-gradient(135deg, #7b2fff, #00d4ff)",
                      },
                    }}
                  >
                    {isSubmitting ? "Processing..." : `Confirm Order · $${totalPrice.toFixed(2)}`}
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* ── RIGHT: Order Summary ── */}
            <Box className="checkout-summary-col">
              <Box className="checkout-card">
                <Box className="checkout-card__bar" />

                <Typography sx={{
                  fontFamily: "'Orbitron', monospace", fontSize: "0.65rem",
                  fontWeight: 700, color: "#00d4ff", letterSpacing: "3px",
                  textTransform: "uppercase", mb: 2.5,
                }}>
                  <FontAwesomeIcon icon={faCartShopping} style={{ marginRight: 8 }} />
                  Order Summary
                </Typography>

                {/* Items */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2.5 }}>
                  {cartItems.map((item) => (
                    <Box key={item.id} sx={{
                      display: "flex", alignItems: "center", gap: 1.5,
                      background: "rgba(123,47,255,0.06)",
                      border: "1px solid rgba(123,47,255,0.12)",
                      borderRadius: "10px", p: 1.2,
                    }}>
                      <Box sx={{
                        width: 52, height: 36, borderRadius: "6px",
                        overflow: "hidden", flexShrink: 0,
                        border: "1px solid rgba(123,47,255,0.2)",
                      }}>
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Box>
                      <Typography sx={{
                        fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem",
                        fontWeight: 600, color: "#e2d9f3", flex: 1,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {item.name}
                      </Typography>
                      <Typography sx={{
                        fontFamily: "'Orbitron', monospace", fontSize: "0.8rem",
                        fontWeight: 700, flexShrink: 0,
                        background: "linear-gradient(90deg, #a855f7, #00d4ff)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}>
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ borderColor: "rgba(123,47,255,0.15)", mb: 2 }} />

                {/* Totals */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
                  {[
                    { label: "Subtotal", value: `$${totalPrice.toFixed(2)}` },
                    { label: "Discount", value: "-$0.00", green: true },
                    { label: "Tax",      value: "$0.00" },
                  ].map(({ label, value, green }) => (
                    <Box key={label} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography sx={{
                        fontFamily: "'Rajdhani', sans-serif", fontSize: "0.88rem",
                        color: "rgba(180,160,220,0.55)", fontWeight: 500,
                      }}>
                        {label}
                      </Typography>
                      <Typography sx={{
                        fontFamily: "'Rajdhani', sans-serif", fontSize: "0.88rem",
                        color: green ? "#4ade80" : "rgba(180,160,220,0.55)", fontWeight: 500,
                      }}>
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ borderColor: "rgba(123,47,255,0.15)", mb: 2 }} />

                {/* Total */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography sx={{
                    fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem",
                    color: "#e2d9f3", fontWeight: 600,
                  }}>
                    Total
                  </Typography>
                  <Typography sx={{
                    fontFamily: "'Orbitron', monospace", fontSize: "1.4rem",
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #a855f7, #00d4ff)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 8px rgba(0,212,255,0.3))",
                  }}>
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Box>

          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default Checkout;