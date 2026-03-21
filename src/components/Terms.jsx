import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Section({ title, children }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.12)",
        borderRadius: 20,
        padding: "28px 36px",
        marginBottom: 24,
        border: "2px solid rgba(255,255,255,0.2)",
      }}
    >
      <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 14px" }}>{title}</h2>
      {children}
    </div>
  );
}

export default function Terms() {
  const p = { fontSize: 16, lineHeight: 1.8, margin: "0 0 12px", opacity: 0.92 };
  const li = { fontSize: 16, lineHeight: 2 };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 24px",
            background: "rgba(255,255,255,0.2)",
            color: "white",
            textDecoration: "none",
            borderRadius: 12,
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 40,
            border: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: 44, fontWeight: 900, margin: "0 0 8px", textShadow: "2px 2px 8px rgba(0,0,0,0.3)" }}>
          📄 Terms of Use
        </h1>
        <p style={{ ...p, marginBottom: 32 }}>
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <Section title="1. Acceptance of Terms">
          <p style={p}>
            By accessing or using Smart Kids Quiz, you agree to be bound by these Terms of Use. If
            you do not agree to these terms, please do not use the site.
          </p>
        </Section>

        <Section title="2. Educational Purpose">
          <p style={p}>
            Smart Kids Quiz is an educational platform designed for children ages 4–10. All content
            is created to support early learning in a safe, engaging, and age-appropriate
            environment.
          </p>
        </Section>

        <Section title="3. Use of the Platform">
          <ul style={{ paddingLeft: 24, margin: 0 }}>
            <li style={li}>You may use Smart Kids Quiz for personal, non-commercial educational purposes.</li>
            <li style={li}>You may not copy, reproduce, or redistribute our content without permission.</li>
            <li style={li}>You may not use automated tools to scrape or download content from the platform.</li>
          </ul>
        </Section>

        <Section title="4. Content">
          <p style={p}>
            All educational content, activities, and interactive features on Smart Kids Quiz are
            provided for learning purposes. We strive to ensure all content is accurate and
            appropriate, but we make no warranties regarding completeness or fitness for a
            particular purpose.
          </p>
        </Section>

        <Section title="5. Intellectual Property">
          <p style={p}>
            All content, graphics, logos, and software on Smart Kids Quiz are the property of Smart
            Kids Quiz or its content suppliers. Unauthorized use is prohibited.
          </p>
        </Section>

        <Section title="6. Limitation of Liability">
          <p style={p}>
            Smart Kids Quiz is provided "as is." We are not liable for any damages arising from the
            use or inability to use this platform.
          </p>
        </Section>

        <Section title="7. Changes to Terms">
          <p style={p}>
            We reserve the right to update these Terms of Use at any time. Continued use of the
            platform after changes constitutes acceptance of the new terms.
          </p>
        </Section>

        <Section title="8. Contact">
          <p style={p}>
            For questions about these terms, please{" "}
            <Link to="/contact" style={{ color: "#FFD93D" }}>
              contact us
            </Link>
            .
          </p>
        </Section>
      </div>

      <Footer />
    </div>
  );
}
