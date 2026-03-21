import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
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

        {/* Hero heading */}
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: 24,
            padding: "40px 48px",
            marginBottom: 32,
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          <h1 style={{ fontSize: 48, fontWeight: 900, margin: "0 0 16px", textShadow: "2px 2px 8px rgba(0,0,0,0.3)" }}>
            📚 About Smart Kids Quiz
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.8, margin: 0, opacity: 0.95 }}>
            Smart Kids Quiz was created to make early learning fun, simple, and accessible for
            every child. Our mission is to help kids build strong foundations in reading, math, and
            critical thinking through short, playful quizzes and activities designed for children
            ages 4–10.
          </p>
        </div>

        {/* What We Believe */}
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: 24,
            padding: "32px 48px",
            marginBottom: 32,
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 20px" }}>💡 What We Believe</h2>
          <ul style={{ fontSize: 18, lineHeight: 2, paddingLeft: 24, margin: 0 }}>
            <li>Learning should be joyful</li>
            <li>Kids learn best through repetition and play</li>
            <li>Safe, clean design helps children focus</li>
            <li>Parents deserve tools they can trust</li>
          </ul>
        </div>

        {/* What We Offer */}
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: 24,
            padding: "32px 48px",
            marginBottom: 32,
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 20px" }}>🎯 What We Offer</h2>
          <ul style={{ fontSize: 18, lineHeight: 2, paddingLeft: 24, margin: 0 }}>
            <li>Age-appropriate quizzes for children ages 4–10</li>
            <li>Colorful visuals and fun animations</li>
            <li>Simple navigation designed for young children</li>
            <li>Interactive activities covering reading, math, shapes, colors, animals, and more</li>
            <li>No confusing menus — just click and play</li>
            <li>No harmful content, ever</li>
          </ul>
        </div>

        {/* Our Story */}
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: 24,
            padding: "32px 48px",
            marginBottom: 32,
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 20px" }}>🌟 Our Story</h2>
          <p style={{ fontSize: 18, lineHeight: 1.8, margin: 0, opacity: 0.95 }}>
            Smart Kids Quiz is built with love, creativity, and a passion for helping kids grow.
            Every activity is carefully designed to match the cognitive development stages of early
            learners. We believe every child deserves a joyful start to their educational journey,
            and we are proud to be a small part of that journey.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "20px 48px",
              background: "linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)",
              color: "white",
              textDecoration: "none",
              borderRadius: 50,
              fontWeight: "bold",
              fontSize: 22,
              boxShadow: "0 10px 40px rgba(255,107,107,0.4)",
              border: "4px solid white",
            }}
          >
            🚀 Start Learning Now!
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
