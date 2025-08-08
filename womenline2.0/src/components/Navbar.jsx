import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEmotion } from "../contexts/EmotionContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const { currentTheme } = useEmotion();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="emotion-navbar" style={{
      background: currentTheme.colors.gradient,
      padding: "1rem 2rem",
      boxShadow: currentTheme.colors.shadow,
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <Link to="/" style={{
          textDecoration: "none",
          color: "#fff",
          fontSize: "1.5rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          {currentTheme.emoji} WOMENLINE
        </Link>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {token ? (
            <>
              <Link to="/dashboard" style={{
                textDecoration: "none",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                transition: "background 0.2s",
                fontWeight: "500"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                Dashboard
              </Link>
              <Link to="/health" style={{
                textDecoration: "none",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                transition: "background 0.2s",
                fontWeight: "500"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                Health Data
              </Link>
              <Link to="/period-tracker" style={{
                textDecoration: "none",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                transition: "background 0.2s",
                fontWeight: "500"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                Period Tracker
              </Link>
              <Link to="/mental-wellness" style={{
                textDecoration: "none",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                transition: "background 0.2s",
                fontWeight: "500"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                Mental Wellness
              </Link>
              <Link to="/health-summary" style={{
                textDecoration: "none",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                transition: "background 0.2s",
                fontWeight: "500"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                Health Summary
              </Link>
              <Link to="/appointments" style={{
                textDecoration: "none",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                transition: "background 0.2s",
                fontWeight: "500"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                Appointments
              </Link>
              <Link to="/leaderboard" style={{
                textDecoration: "none",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                transition: "background 0.2s",
                fontWeight: "500"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                Leaderboard
              </Link>
              <Link to="/safety-tutorials" style={{
                textDecoration: "none",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                transition: "background 0.2s",
                fontWeight: "500"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                Safety
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.3)"}
                onMouseOut={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                textDecoration: "none",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                transition: "background 0.2s",
                fontWeight: "500"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                Login
              </Link>
              <Link to="/signup" style={{
                textDecoration: "none",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                transition: "background 0.2s",
                fontWeight: "500"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 