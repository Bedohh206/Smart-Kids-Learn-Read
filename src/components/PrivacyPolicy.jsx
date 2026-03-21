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

export default function PrivacyPolicy() {
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
          🔒 Privacy Policy
        </h1>
        <p style={{ ...p, marginBottom: 32 }}>
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <Section title="1. Introduction">
          <p style={p}>
            Welcome to Smart Kids Quiz ("we", "our", or "us"). We are committed to protecting the
            privacy of children and families who use our platform. This Privacy Policy explains how
            we collect, use, and safeguard information when you visit our website.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p style={p}>
            Smart Kids Quiz is designed for children and we take privacy seriously. We do{" "}
            <strong>not</strong> collect personally identifiable information from children under 13.
          </p>
          <ul style={{ paddingLeft: 24, margin: 0 }}>
            <li style={li}>We do not require account registration to use the app.</li>
            <li style={li}>Progress data is stored locally on your device using browser storage.</li>
            <li style={li}>We may use anonymous analytics (e.g. Google Analytics) to understand how the site is used overall, without identifying individuals.</li>
          </ul>
        </Section>

        <Section title="3. Cookies">
          <p style={p}>
            We may use cookies and similar tracking technologies to improve your experience and
            measure site traffic. No cookies are used to track children personally.
          </p>
        </Section>

        <Section title="4. Advertising">
          <p style={p}>
            Smart Kids Quiz may display advertisements through Google AdSense on content pages
            (such as the homepage, About page, and category pages). Ads are{" "}
            <strong>not displayed during gameplay</strong> or on activity screens.
          </p>
          <p style={p}>
            Google AdSense may use cookies to serve ads based on prior visits to our site or other
            sites. You can opt out of personalised advertising by visiting{" "}
            <a href="https://adssettings.google.com" style={{ color: "#FFD93D" }} rel="noopener noreferrer" target="_blank">
              Google Ads Settings
            </a>
            .
          </p>
        </Section>

        <Section title="5. Third-Party Services">
          <p style={p}>
            We may use third-party services including Google Analytics and Google AdSense. These
            services have their own privacy policies governing their data practices.
          </p>
        </Section>

        <Section title="6. Children's Privacy (COPPA)">
          <p style={p}>
            Smart Kids Quiz complies with the Children's Online Privacy Protection Act (COPPA). We
            do not knowingly collect personal information from children under 13. If you believe we
            have inadvertently collected such information, please contact us immediately.
          </p>
        </Section>

        <Section title="7. Contact Us">
          <p style={p}>
            If you have questions about this Privacy Policy, please{" "}
            <Link to="/contact" style={{ color: "#FFD93D" }}>
              contact us here
            </Link>
            .
          </p>
        </Section>
      </div>

      <Footer />
    </div>
  );
}
