import React from "react";
import { Link } from "react-router-dom";

const pageContent = {
  about: {
    title: "About Smart Kids Learn & Read",
    intro:
      "Smart Kids Learn & Read is an educational app built for young learners who are starting to read, count, and communicate with confidence.",
    sections: [
      {
        heading: "What this website offers",
        paragraphs: [
          "This website combines playful lessons with simple practice activities in alphabet recognition, phonics, numbers, spelling, shapes, colors, and early logic games. Every section is designed for short, positive learning sessions that work well for preschool and early primary learners.",
          "Activities are intentionally visual and audio-friendly so that children can listen, speak, and interact. We use repetition, clear instructions, and bite-sized tasks to support early reading and language development without overwhelming the child."
        ]
      },
      {
        heading: "Learning approach",
        paragraphs: [
          "We focus on foundational skills: letter-sound awareness, number sense, pattern recognition, and vocabulary growth. Children can move between creative modules and structured lessons so learning feels balanced and enjoyable.",
          "Parents and teachers can use this platform as a support tool for home or classroom routines. The best results usually come from short sessions, frequent encouragement, and combining digital practice with real-world reading and conversation."
        ]
      },
      {
        heading: "Who the content is for",
        paragraphs: [
          "The content is suitable for children in early learning stages, including pre-readers and beginner readers. Difficulty varies by activity, and children can repeat modules as often as they need.",
          "This website is educational in nature and does not provide medical, diagnostic, or professional educational assessment services."
        ]
      }
    ]
  },
  contact: {
    title: "Contact",
    intro:
      "If you have questions, feedback, or suggestions for new learning activities, we would love to hear from you.",
    sections: [
      {
        heading: "How to reach us",
        paragraphs: [
          "Email: support@smartkidslearnread.com",
          "For bug reports, include device type, browser name, and a short description of what happened so we can reproduce and fix the issue quickly."
        ]
      },
      {
        heading: "Partnership and content requests",
        paragraphs: [
          "If you are a teacher, school, or early-learning content creator and want to collaborate, send a short proposal by email. We review ideas for additional activities, accessibility improvements, and localized learning resources.",
          "We aim to reply within 3-5 business days."
        ]
      }
    ]
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains what information may be collected when you use Smart Kids Learn & Read and how that information is handled.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We may collect limited technical information such as browser type, device information, app usage events, and performance data to maintain and improve the website.",
          "If analytics tools are enabled, aggregate usage data may be processed to understand which activities are most useful and to improve educational quality."
        ]
      },
      {
        heading: "How we use information",
        paragraphs: [
          "We use collected information to operate the service, improve learning experiences, monitor errors, and maintain security.",
          "We do not sell personal information."
        ]
      },
      {
        heading: "Children's privacy",
        paragraphs: [
          "This website is intended for educational use by children with parent, guardian, or teacher supervision.",
          "Parents or guardians who have privacy-related questions can contact us at support@smartkidslearnread.com."
        ]
      },
      {
        heading: "Third-party services",
        paragraphs: [
          "Some third-party tools (for example, analytics or advertising services) may set cookies or similar technologies according to their own policies.",
          "When ad services are active, users may see interest-based ads subject to applicable laws and platform policies."
        ]
      },
      {
        heading: "Policy updates",
        paragraphs: [
          "We may update this policy from time to time. Material changes will be reflected on this page with a revised effective date.",
          "Effective date: March 9, 2026"
        ]
      }
    ]
  },
  terms: {
    title: "Terms of Use",
    intro:
      "By using Smart Kids Learn & Read, you agree to these Terms of Use.",
    sections: [
      {
        heading: "Educational purpose",
        paragraphs: [
          "This website provides learning activities and educational content for informational and practice purposes.",
          "Users are responsible for supervising children and selecting age-appropriate activities."
        ]
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "You agree not to misuse the service, interfere with security, attempt unauthorized access, or use automated methods that harm site performance.",
          "You may not copy or republish large portions of site content for commercial resale without written permission."
        ]
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Site design, educational flow, and custom content are protected by applicable intellectual property laws.",
          "Third-party assets remain the property of their respective owners."
        ]
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "The service is provided on an as-is basis without guarantees of uninterrupted availability.",
          "To the maximum extent allowed by law, we are not liable for indirect or consequential damages arising from use of the website."
        ]
      },
      {
        heading: "Changes to terms",
        paragraphs: [
          "We may revise these terms periodically. Continued use of the website after updates means you accept the revised terms.",
          "Effective date: March 9, 2026"
        ]
      }
    ]
  }
};

function SiteInfoPage({ pageKey }) {
  const content = pageContent[pageKey] || pageContent.about;

  return (
    <main style={{ maxWidth: 980, margin: "24px auto", padding: "20px" }}>
      <h1>{content.title}</h1>
      <p style={{ color: "#4a5a6a", fontWeight: 600, margin: "6px 0 14px" }}>
        Last updated: March 9, 2026
      </p>
      <p style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>{content.intro}</p>

      {content.sections.map((section) => (
        <section key={section.heading} style={{ marginTop: 24 }}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((text) => (
            <p key={text} style={{ lineHeight: 1.7 }}>
              {text}
            </p>
          ))}
        </section>
      ))}

      <section style={{ marginTop: 28 }}>
        <h2>Quick Links</h2>
        <p>
          <Link to="/">Home</Link> · <Link to="/learn">Learn</Link> · <Link to="/guides">Guides</Link> ·{" "}
          <Link to="/about">About</Link> · <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link> ·{" "}
          <Link to="/contact">Contact</Link>
        </p>
      </section>
    </main>
  );
}

export default SiteInfoPage;