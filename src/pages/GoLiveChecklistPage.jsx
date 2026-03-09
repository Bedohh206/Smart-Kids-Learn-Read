import React from "react";
import { Link } from "react-router-dom";

const checklistGroups = [
  {
    title: "AdSense Setup",
    items: [
      "Replace AdSense client ID in index.html with your real ca-pub value.",
      "Replace pub ID in public/ads.txt with your real publisher ID.",
      "Ensure ads.txt is accessible at /ads.txt on production.",
      "Confirm policy pages are publicly reachable and linked site-wide."
    ]
  },
  {
    title: "SEO & Indexing",
    items: [
      "Confirm canonical URLs resolve correctly on key routes.",
      "Verify robots.txt and sitemap.xml are live on your domain.",
      "Submit homepage, guides, privacy, and terms to Google Search Console.",
      "Request indexing for recently updated content pages."
    ]
  },
  {
    title: "Analytics & Monitoring",
    items: [
      "Replace GA4 placeholder with real G-Measurement ID.",
      "Confirm page_view events are arriving in GA4 Realtime.",
      "Check browser console for script/load errors after deploy.",
      "Re-test key pages on mobile and desktop."
    ]
  },
  {
    title: "Quality Review",
    items: [
      "Verify contact email is correct and monitored.",
      "Review guides and policy pages for clarity and consistency.",
      "Check deep links like /guides and /privacy load directly.",
      "Submit AdSense review after all checks are green."
    ]
  }
];

export default function GoLiveChecklistPage() {
  return (
    <main style={{ maxWidth: 980, margin: "24px auto", padding: "20px" }}>
      <h1>Go Live Checklist</h1>
      <p style={{ color: "#4a5a6a", fontWeight: 600, margin: "6px 0 14px" }}>
        Last updated: March 9, 2026
      </p>
      <p style={{ lineHeight: 1.7 }}>
        Use this checklist before launching or re-submitting your site for AdSense approval.
      </p>

      {checklistGroups.map((group) => (
        <section key={group.title} style={{ marginTop: 24 }}>
          <h2>{group.title}</h2>
          <ul>
            {group.items.map((item) => (
              <li key={item} style={{ marginBottom: 10, lineHeight: 1.65 }}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section style={{ marginTop: 28 }}>
        <h2>Quick Links</h2>
        <p>
          <Link to="/">Home</Link> · <Link to="/guides">Guides</Link> · <Link to="/privacy">Privacy</Link> ·{" "}
          <Link to="/terms">Terms</Link> · <Link to="/contact">Contact</Link>
        </p>
      </section>
    </main>
  );
}
