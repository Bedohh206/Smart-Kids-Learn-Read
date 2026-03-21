import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(8px)",
        borderTop: "2px solid rgba(255,255,255,0.15)",
        padding: "40px 24px 24px",
        marginTop: "60px",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
            marginBottom: "32px",
          }}
        >
          {/* Brand */}
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 10px", color: "#FFD93D" }}>
              📚 Smart Kids Quiz
            </h3>
            <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6, margin: 0 }}>
              A fun, safe, and interactive learning world for children ages 4–10. Building
              confidence through play.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px", color: "#A8EDEA" }}>
              Learning Categories
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { to: "/alphabet", label: "🔤 Alphabet & Phonics" },
                { to: "/numbers", label: "🔢 Numbers & Math" },
                { to: "/shapes-colors", label: "⭐ Shapes & Colors" },
                { to: "/animals", label: "🦁 Animals & Nature" },
                { to: "/spelling", label: "✏️ Spelling" },
                { to: "/continents", label: "🌍 Continents" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 14 }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px", color: "#A8EDEA" }}>
              Company
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 14 }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px", color: "#A8EDEA" }}>
              Legal
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Use" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 14 }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>
            © {new Date().getFullYear()} Smart Kids Quiz. All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>
            Safe · Educational · Ad-free during gameplay
          </p>
        </div>
      </div>
    </footer>
  );
}
