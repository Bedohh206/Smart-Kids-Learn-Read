import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real deployment, wire this to a backend or service like Formspree.
    setSent(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    fontSize: 16,
    borderRadius: 12,
    border: "2px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    outline: "none",
    boxSizing: "border-box",
    marginTop: 6,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
        {/* Back button */}
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

        <h1 style={{ fontSize: 48, fontWeight: 900, margin: "0 0 12px", textShadow: "2px 2px 8px rgba(0,0,0,0.3)" }}>
          📬 Contact Us
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, lineHeight: 1.7, marginBottom: 40 }}>
          Have a question, suggestion, or just want to say hello? We'd love to hear from you!
          Fill out the form below and we'll get back to you as soon as possible.
        </p>

        {sent ? (
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 20,
              padding: "40px",
              textAlign: "center",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          >
            <p style={{ fontSize: 56, margin: "0 0 16px" }}>🎉</p>
            <h2 style={{ fontSize: 28, margin: "0 0 12px" }}>Message Sent!</h2>
            <p style={{ fontSize: 18, opacity: 0.9 }}>
              Thank you for reaching out. We'll respond within 1–2 business days.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: 24,
              padding: "40px",
              border: "2px solid rgba(255,255,255,0.2)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div>
              <label style={{ fontSize: 16, fontWeight: 600 }}>Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Jane Smith"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: 16, fontWeight: 600 }}>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="e.g. jane@example.com"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: 16, fontWeight: 600 }}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Write your message here..."
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "16px 32px",
                fontSize: 18,
                fontWeight: "bold",
                background: "linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)",
                color: "white",
                border: "4px solid white",
                borderRadius: 50,
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(255,107,107,0.4)",
              }}
            >
              Send Message 🚀
            </button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}
