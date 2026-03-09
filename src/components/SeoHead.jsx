import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://smartkidsquiz.app";

const seoByPath = {
  "/": {
    title: "Smart Kids Learn & Read | Fun Early Learning Activities",
    description:
      "Interactive early-learning platform for kids with alphabet, phonics, numbers, stories, and creative activities for home and classroom practice."
  },
  "/learn": {
    title: "Learning Modules | Smart Kids Learn & Read",
    description:
      "Explore structured learning modules for letters, phonics, numbers, spelling, and more."
  },
  "/guides": {
    title: "Parent & Teacher Guides | Smart Kids Learn & Read",
    description:
      "Practical guides for parents and teachers to build reading, phonics, and number confidence in ages 3-7."
  },
  "/go-live": {
    title: "Go Live Checklist | Smart Kids Learn & Read",
    description:
      "Launch checklist for Smart Kids Learn & Read covering AdSense setup, indexing, analytics, and quality review steps."
  },
  "/about": {
    title: "About | Smart Kids Learn & Read",
    description:
      "Learn about Smart Kids Learn & Read, our educational approach, and who this platform is built for."
  },
  "/contact": {
    title: "Contact | Smart Kids Learn & Read",
    description:
      "Contact Smart Kids Learn & Read for support, feedback, and educational collaboration requests."
  },
  "/privacy": {
    title: "Privacy Policy | Smart Kids Learn & Read",
    description:
      "Read the Smart Kids Learn & Read privacy policy, including data usage and child privacy information."
  },
  "/terms": {
    title: "Terms of Use | Smart Kids Learn & Read",
    description:
      "Read the terms of use for Smart Kids Learn & Read educational services and acceptable use policies."
  }
};

function ensureMeta(name) {
  let element = document.querySelector(`meta[name=\"${name}\"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  return element;
}

function ensureCanonical() {
  let element = document.querySelector("link[rel='canonical']");
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  return element;
}

export default function SeoHead() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname || "/";
    const seo = seoByPath[path] || {
      title: "Smart Kids Learn & Read",
      description:
        "Educational activities for early learners including letters, phonics, numbers, and reading practice."
    };

    document.title = seo.title;
    ensureMeta("description").setAttribute("content", seo.description);
    ensureCanonical().setAttribute("href", `${SITE_URL}${path}`);
  }, [location.pathname]);

  return null;
}
