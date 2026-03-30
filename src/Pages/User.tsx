import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faEnvelope,
  faRightToBracket,
  faRightFromBracket,
  faUser,
  faShoppingBag,
  faCalendar,
  faCheckCircle,
  faLock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../Context/CartContext";
import "./User.css";

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
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Orbitron', monospace",
          fontWeight: 700,
          fontSize: "0.7rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          borderRadius: "10px",
          padding: "0.75rem 1.5rem",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        },
      },
    },
  },
});

// ── Not logged in screen ──────────────────────────
function NotLoggedIn() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <CssBaseline />
      <Box className="profile-page">
        <Box className="login-orb login-orb--1" />
        <Box className="login-orb login-orb--2" />
        <Box className="login-grid" />

        <Box className="login-card" sx={{ textAlign: "center" }}>
          <Box className="login-card__bar" />

          {/* Icon */}
          <Box sx={{
            width: 80, height: 80, borderRadius: "50%", mx: "auto", mb: 3,
            background: "rgba(123,47,255,0.1)",
            border: "1px solid rgba(123,47,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2rem", color: "rgba(123,47,255,0.5)",
          }}>
            <FontAwesomeIcon icon={faUser} />
          </Box>

          {/* Brand */}
          <Typography sx={{
            fontFamily: "'Orbitron', monospace", fontWeight: 900,
            fontSize: "1rem", letterSpacing: "3px",
            background: "linear-gradient(90deg, #a855f7, #00d4ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", mb: 0.5,
          }}>
            CYBERPUNK
          </Typography>
          <Typography sx={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "0.58rem",
            color: "rgba(255,0,170,0.8)", letterSpacing: "4px",
            textTransform: "uppercase", fontWeight: 600, mb: 3,
          }}>
            Gaming Store
          </Typography>

          <Typography sx={{
            fontFamily: "'Orbitron', monospace", fontWeight: 700,
            fontSize: "1.2rem", color: "#fff", mb: 1,
          }}>
            No Account Found
          </Typography>

          <Typography sx={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem",
            color: "rgba(180,160,220,0.6)", mb: 3, lineHeight: 1.7,
          }}>
            It looks like you're not logged in. Sign in to view your profile,
            track purchases, and access your account details.
          </Typography>

          {/* Perks */}
          {[
            { icon: faShoppingBag, text: "View your purchase history" },
            { icon: faStar,        text: "Access exclusive member deals" },
            { icon: faGamepad,     text: "Manage your game library" },
          ].map(({ icon, text }) => (
            <Box key={text} sx={{
              display: "flex", alignItems: "center", gap: 1.5, mb: 1.2,
              background: "rgba(123,47,255,0.06)",
              border: "1px solid rgba(123,47,255,0.15)",
              borderRadius: "8px", px: 2, py: 1,
            }}>
              <Box sx={{ color: "#00d4ff", fontSize: "0.8rem", width: 16, textAlign: "center" }}>
                <FontAwesomeIcon icon={icon} />
              </Box>
              <Typography sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.88rem", color: "rgba(180,160,220,0.7)", fontWeight: 500,
              }}>
                {text}
              </Typography>
            </Box>
          ))}

          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/login")}
            startIcon={<FontAwesomeIcon icon={faRightToBracket} />}
            sx={{
              mt: 3,
              background: "linear-gradient(135deg, #7b2fff 0%, #00d4ff 100%)",
              boxShadow: "0 4px 20px rgba(123,47,255,0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #9b4fff 0%, #22e4ff 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(123,47,255,0.6)",
              },
            }}
          >
            Sign In
          </Button>

          <Typography sx={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem",
            color: "rgba(180,160,220,0.4)", mt: 2,
          }}>
            Don't have an account?{" "}
            <Typography component="a" href="/register" sx={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem",
              color: "#00d4ff", fontWeight: 600, textDecoration: "none",
              "&:hover": { color: "#fff" },
            }}>
              Register here
            </Typography>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// ── Logged in profile screen ──────────────────────
function ProfilePage({ user }: { user: any }) {
  const navigate = useNavigate();
  // const { cartItems } = useContext(CartContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Generate avatar initials from email
  const initials = user.email
    ? user.email.slice(0, 2).toUpperCase()
    : "CP";

  // Read real purchase history saved during checkout
  const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");

  const statCards = [
    { label: "Games Owned",    value: purchases.length,                       icon: faGamepad     },
    { label: "Total Spent",    value: `$${purchases.reduce((s: number, p: any) => s + Number(p.price), 0).toFixed(2)}`, icon: faShoppingBag },
    { label: "Member Since",   value: "2024",                                 icon: faCalendar    },
    { label: "Account Status", value: "Active",                               icon: faCheckCircle },
  ];

  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <CssBaseline />
      <Box className="profile-page">
        <Box className="login-orb login-orb--1" />
        <Box className="login-orb login-orb--2" />
        <Box className="login-grid" />

        <Box className="profile-inner">

          {/* ── LEFT: Account Details ── */}
          <Box className="profile-sidebar">
            <Box className="profile-card">
              <Box className="profile-card__bar" />

              {/* Avatar */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Avatar sx={{
                  width: 90, height: 90, mb: 2,
                  fontFamily: "'Orbitron', monospace",
                  fontWeight: 900, fontSize: "1.6rem",
                  background: "linear-gradient(135deg, #7b2fff, #00d4ff)",
                  boxShadow: "0 0 30px rgba(123,47,255,0.5), 0 0 60px rgba(0,212,255,0.2)",
                  border: "2px solid rgba(0,212,255,0.3)",
                }}>
                  {initials}
                </Avatar>

                <Typography sx={{
                  fontFamily: "'Orbitron', monospace", fontWeight: 700,
                  fontSize: "1rem", color: "#fff", mb: 0.5,
                }}>
                  {user.name || "Cyber Player"}
                </Typography>
                <Chip
                  label="PRO MEMBER"
                  size="small"
                  sx={{
                    fontFamily: "'Orbitron', monospace", fontSize: "0.55rem",
                    fontWeight: 700, letterSpacing: "1.5px",
                    background: "linear-gradient(135deg, rgba(123,47,255,0.3), rgba(0,212,255,0.2))",
                    border: "1px solid rgba(0,212,255,0.3)",
                    color: "#00d4ff",
                  }}
                />
              </Box>

              <Divider sx={{ borderColor: "rgba(123,47,255,0.15)", mb: 2.5 }} />

              {/* Account details */}
              <Typography sx={{
                fontFamily: "'Orbitron', monospace", fontSize: "0.62rem",
                fontWeight: 700, color: "#00d4ff", letterSpacing: "3px",
                textTransform: "uppercase", mb: 2,
              }}>
                Account Details
              </Typography>

              {[
                { icon: faEnvelope, label: "Email",    value: user.email    || "—" },
                { icon: faUser,     label: "Username", value: user.name     || user.email?.split("@")[0] || "—" },
                { icon: faLock,     label: "Password", value: "••••••••"             },
                { icon: faCalendar, label: "Joined",   value: "Dec 2024"             },
              ].map(({ icon, label, value }) => (
                <Box key={label} sx={{
                  display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.8,
                }}>
                  <Box sx={{
                    width: 32, height: 32, borderRadius: "8px",
                    background: "rgba(123,47,255,0.12)",
                    border: "1px solid rgba(123,47,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#a855f7", fontSize: "0.75rem", flexShrink: 0,
                  }}>
                    <FontAwesomeIcon icon={icon} />
                  </Box>
                  <Box>
                    <Typography sx={{
                      fontFamily: "'Orbitron', monospace", fontSize: "0.55rem",
                      color: "rgba(0,212,255,0.5)", letterSpacing: "2px",
                      textTransform: "uppercase", mb: 0.2,
                    }}>
                      {label}
                    </Typography>
                    <Typography sx={{
                      fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem",
                      color: "#e2d9f3", fontWeight: 500,
                      wordBreak: "break-all",
                    }}>
                      {value}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Divider sx={{ borderColor: "rgba(123,47,255,0.15)", my: 2.5 }} />

              {/* Logout */}
              <Button
                variant="outlined"
                fullWidth
                onClick={handleLogout}
                startIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
                sx={{
                  border: "1px solid rgba(248,113,113,0.35)",
                  color: "#f87171",
                  background: "rgba(248,113,113,0.05)",
                  "&:hover": {
                    background: "rgba(248,113,113,0.12)",
                    border: "1px solid rgba(248,113,113,0.6)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 16px rgba(248,113,113,0.2)",
                  },
                }}
              >
                Sign Out
              </Button>
            </Box>
          </Box>

          {/* ── RIGHT: Stats + Purchases ── */}
          <Box className="profile-main">

            {/* Stat cards */}
            <Box className="profile-stats">
              {statCards.map(({ label, value, icon }) => (
                <Box key={label} className="stat-card">
                  <Box className="stat-card__bar" />
                  <Box sx={{
                    width: 38, height: 38, borderRadius: "10px",
                    background: "rgba(123,47,255,0.12)",
                    border: "1px solid rgba(123,47,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#00d4ff", fontSize: "0.9rem", mb: 1.5,
                  }}>
                    <FontAwesomeIcon icon={icon} />
                  </Box>
                  <Typography sx={{
                    fontFamily: "'Orbitron', monospace", fontWeight: 700,
                    fontSize: "1.3rem",
                    background: "linear-gradient(90deg, #a855f7, #00d4ff)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", mb: 0.3,
                  }}>
                    {value}
                  </Typography>
                  <Typography sx={{
                    fontFamily: "'Rajdhani', sans-serif", fontSize: "0.75rem",
                    color: "rgba(180,160,220,0.5)", letterSpacing: "1px",
                    textTransform: "uppercase", fontWeight: 600,
                  }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Purchase history */}
            <Box className="profile-card" sx={{ mt: 0 }}>
              <Box className="profile-card__bar" />

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
                <Typography sx={{
                  fontFamily: "'Orbitron', monospace", fontSize: "0.72rem",
                  fontWeight: 700, color: "#00d4ff", letterSpacing: "3px",
                  textTransform: "uppercase",
                }}>
                  <FontAwesomeIcon icon={faShoppingBag} style={{ marginRight: 8 }} />
                  Purchase History
                </Typography>
                <Chip
                  label={`${purchases.length} orders`}
                  size="small"
                  sx={{
                    fontFamily: "'Orbitron', monospace", fontSize: "0.55rem",
                    fontWeight: 700, letterSpacing: "1px",
                    background: "rgba(123,47,255,0.12)",
                    border: "1px solid rgba(123,47,255,0.3)",
                    color: "#a855f7",
                  }}
                />
              </Box>

              {purchases.length === 0 ? (
                /* Empty purchases state */
                <Box sx={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  py: 5, gap: 1.5,
                }}>
                  <Box sx={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(123,47,255,0.08)",
                    border: "1px solid rgba(123,47,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.6rem", color: "rgba(123,47,255,0.35)",
                  }}>
                    <FontAwesomeIcon icon={faShoppingBag} />
                  </Box>
                  <Typography sx={{
                    fontFamily: "'Orbitron', monospace", fontSize: "0.85rem",
                    fontWeight: 700, color: "#e2d9f3",
                  }}>
                    No Purchases Yet
                  </Typography>
                  <Typography sx={{
                    fontFamily: "'Rajdhani', sans-serif", fontSize: "0.88rem",
                    color: "rgba(180,160,220,0.5)", textAlign: "center", maxWidth: 300,
                  }}>
                    Your purchase history will appear here once you buy your first game.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                    startIcon={<FontAwesomeIcon icon={faGamepad} />}
                    sx={{
                      mt: 1,
                      background: "linear-gradient(135deg, #7b2fff, #00d4ff)",
                      boxShadow: "0 4px 20px rgba(123,47,255,0.4)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #9b4fff, #22e4ff)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Browse Games
                  </Button>
                </Box>
              ) : (
                /* Purchase list */
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {purchases.map((item: any) => (
                    <Box key={item.orderId} sx={{
                      display: "flex", alignItems: "center", gap: 2,
                      background: "rgba(123,47,255,0.06)",
                      border: "1px solid rgba(123,47,255,0.15)",
                      borderRadius: "12px", p: 1.5,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        borderColor: "rgba(0,212,255,0.25)",
                        background: "rgba(0,212,255,0.04)",
                        transform: "translateX(4px)",
                      },
                    }}>
                      {/* Game image */}
                      <Box sx={{
                        width: 64, height: 44, borderRadius: "8px",
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

                      {/* Info */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{
                          fontFamily: "'Orbitron', monospace", fontSize: "0.75rem",
                          fontWeight: 700, color: "#e2d9f3",
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{
                          fontFamily: "'Rajdhani', sans-serif", fontSize: "0.75rem",
                          color: "rgba(180,160,220,0.45)", mt: 0.3,
                        }}>
                          Order {item.orderId} · {item.date}
                        </Typography>
                      </Box>

                      {/* Price */}
                      <Typography sx={{
                        fontFamily: "'Orbitron', monospace", fontSize: "0.9rem",
                        fontWeight: 700, flexShrink: 0,
                        background: "linear-gradient(90deg, #a855f7, #00d4ff)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}>
                        ${Number(item.price).toFixed(2)}
                      </Typography>

                      {/* Status badge */}
                      <Chip
                        label={item.status}
                        size="small"
                        icon={<FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: "0.6rem", color: "#4ade80" }} />}
                        sx={{
                          fontFamily: "'Rajdhani', sans-serif", fontSize: "0.7rem",
                          fontWeight: 600, flexShrink: 0,
                          background: "rgba(74,222,128,0.1)",
                          border: "1px solid rgba(74,222,128,0.3)",
                          color: "#4ade80",
                          "& .MuiChip-icon": { ml: "6px" },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// ── Main export: router between states ───────────
function User() {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  if (!user) return <NotLoggedIn />;
  return <ProfilePage user={user} />;
}

export default User;