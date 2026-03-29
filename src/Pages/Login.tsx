import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faGamepad,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

// ── Cyberpunk MUI Theme ───────────────────────────
const cyberpunkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00d4ff" },
    error:   { main: "#f87171" },
    background: { default: "#04020f", paper: "#0c061e" },
    text: { primary: "#e2d9f3", secondary: "rgba(180,160,220,0.6)" },
  },
  typography: {
    fontFamily: "'Rajdhani', sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(4, 2, 15, 0.7)",
            borderRadius: "10px",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.95rem",
            color: "#e2d9f3",
            "& fieldset": {
              borderColor: "rgba(123, 47, 255, 0.3)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(123, 47, 255, 0.6)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00d4ff",
              boxShadow: "0 0 0 3px rgba(0,212,255,0.08), 0 0 20px rgba(0,212,255,0.12)",
            },
            "&.Mui-error fieldset": {
              borderColor: "rgba(248,113,113,0.6)",
            },
          },
          "& .MuiInputLabel-root": {
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.85rem",
            color: "rgba(0,212,255,0.5)",
            "&.Mui-focused": { color: "#00d4ff" },
            "&.Mui-error":   { color: "#f87171" },
          },
          "& .MuiFormHelperText-root": {
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.75rem",
          },
          "& input": {
            color: "#e2d9f3",
            "&::placeholder": { color: "rgba(180,160,220,0.25)" },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Orbitron', monospace",
          fontWeight: 700,
          fontSize: "0.72rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          borderRadius: "10px",
          padding: "0.85rem",
          background: "linear-gradient(135deg, #7b2fff 0%, #00d4ff 100%)",
          boxShadow: "0 4px 20px rgba(123,47,255,0.4)",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          "&:hover": {
            background: "linear-gradient(135deg, #9b4fff 0%, #22e4ff 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 30px rgba(123,47,255,0.6), 0 0 40px rgba(0,212,255,0.2)",
          },
          "&:active": { transform: "translateY(0)" },
          "&.Mui-disabled": {
            opacity: 0.5,
            background: "linear-gradient(135deg, #7b2fff, #00d4ff)",
          },
        },
      },
    },
  },
});

// ── Component ─────────────────────────────────────
function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    localStorage.setItem("user" , JSON.stringify(data))
    console.log(data);
    alert("Login Done");
    navigate("/");
  };

  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <CssBaseline />

      {/* ── Page wrapper ── */}
      <Box className="login-page">
        <Box className="login-orb login-orb--1" />
        <Box className="login-orb login-orb--2" />
        <Box className="login-grid" />

        {/* ── Card ── */}
        <Box className="login-card">
          <Box className="login-card__bar" />

          {/* Logo */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.4, mb: 3 }}>
            <Box className="login-logo-icon">
              <FontAwesomeIcon icon={faGamepad} />
            </Box>
            <Typography sx={{
              fontFamily: "'Orbitron', monospace",
              fontWeight: 900,
              fontSize: "1.1rem",
              letterSpacing: "3px",
              background: "linear-gradient(90deg, #a855f7, #00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              CYBERPUNK
            </Typography>
            <Typography sx={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.6rem",
              color: "rgba(255,0,170,0.8)",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}>
              Gaming Store
            </Typography>
          </Box>

          {/* Headings */}
          <Typography variant="h5" textAlign="center" sx={{
            fontFamily: "'Orbitron', monospace",
            fontWeight: 700,
            fontSize: "1.4rem",
            color: "#fff",
            mb: 0.5,
          }}>
            Welcome Back
          </Typography>
          <Typography textAlign="center" sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.88rem",
            color: "rgba(180,160,220,0.6)",
            mb: 3,
          }}>
            Sign in to your account to continue
          </Typography>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Email */}
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              placeholder="you@example.com"
              error={!!errors.email}
              helperText={errors.email?.message as string}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faEnvelope}
                      style={{ color: "rgba(123,47,255,0.5)", fontSize: "0.8rem" }} />
                  </InputAdornment>
                ),
              }}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /@/, message: "Email must contain @" },
              })}
            />

            {/* Password */}
            <TextField
              label="Password"
              type={showPass ? "text" : "password"}
              fullWidth
              placeholder="Min. 6 characters"
              error={!!errors.password}
              helperText={errors.password?.message as string}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faLock}
                      style={{ color: "rgba(123,47,255,0.5)", fontSize: "0.8rem" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass(!showPass)}
                      edge="end"
                      size="small"
                      sx={{ color: "rgba(123,47,255,0.4)", "&:hover": { color: "#00d4ff" } }}
                    >
                      <FontAwesomeIcon
                        icon={showPass ? faEyeSlash : faEye}
                        style={{ fontSize: "0.8rem" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
            />

            {/* Forgot password */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -1 }}>
              <Typography component="a" href="#" sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.78rem",
                color: "rgba(0,212,255,0.5)",
                textDecoration: "none",
                transition: "all 0.2s ease",
                "&:hover": { color: "#00d4ff", textShadow: "0 0 8px rgba(0,212,255,0.8)" },
              }}>
                Forgot password?
              </Typography>
            </Box>

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              startIcon={<FontAwesomeIcon icon={faRightToBracket} />}
              sx={{ mt: 0.5 }}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{
            my: 2.5,
            "&::before, &::after": { borderColor: "rgba(123,47,255,0.2)" },
            color: "rgba(180,160,220,0.4)",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "1px",
          }}>
            or
          </Divider>

          {/* Register link */}
          <Typography textAlign="center" sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.88rem",
            color: "rgba(180,160,220,0.5)",
          }}>
            Don't have an account?{" "}
            <Typography component={Link} to="/register" sx={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.88rem",
              color: "#00d4ff",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
              "&:hover": { color: "#fff", textShadow: "0 0 8px rgba(0,212,255,0.8)" },
            }}>
              Create one
            </Typography>
          </Typography>

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Login;