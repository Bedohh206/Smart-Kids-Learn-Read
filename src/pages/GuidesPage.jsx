import React from "react";
import { Link } from "react-router-dom";

const guides = [
  {
    title: "How to teach letter sounds at home",
    paragraphs: [
      "Letter names are important, but early reading success often begins with letter sounds. Start with a small group of letters and repeat them daily through short activities like sound matching, picture cards, and simple songs.",
      "Use real words children hear every day. For example, pair the /b/ sound with ball, book, and bird. Keep sessions short and positive so children associate reading practice with confidence instead of pressure.",
      "When a child confuses sounds, return to slower practice rather than testing. Progress is usually faster when practice is consistent and playful."
    ]
  },
  {
    title: "Building early phonics confidence",
    paragraphs: [
      "Phonics helps children connect symbols and sounds so they can decode new words. Begin with easy consonant-vowel-consonant words such as cat, sun, and map.",
      "Say each sound clearly, then blend them together out loud. Hearing the blend process repeatedly helps children understand how spoken language maps to print.",
      "Children improve quickly when phonics practice includes listening, speaking, tracing, and reading in the same lesson."
    ]
  },
  {
    title: "Number sense before formal math",
    paragraphs: [
      "Before children solve written equations, they need number sense: understanding quantity, order, and comparison. Count objects in daily life such as toys, fruits, steps, or books.",
      "Practice one more, one less, and simple grouping so children can see numbers as relationships. This foundation makes addition and subtraction less abstract later.",
      "Encourage children to explain how they counted. Speaking their thinking helps memory and problem-solving skills."
    ]
  },
  {
    title: "Teaching spelling through patterns",
    paragraphs: [
      "Spelling becomes easier when children notice common sound patterns like -at, -an, and -it. Instead of memorizing isolated words, group words by families and read them aloud together.",
      "Use quick word-building games where children change one letter at a time, such as cat to cap to map. This shows how small changes create new words and meanings.",
      "Frequent short spelling practice is more effective than long occasional sessions."
    ]
  },
  {
    title: "Why shapes and colors matter for literacy",
    paragraphs: [
      "Learning shapes and colors supports vocabulary growth, visual discrimination, and descriptive language. These are important skills for reading comprehension and classroom communication.",
      "Children who can describe objects clearly using words like triangle, round, bright, or dark often show stronger expressive language when they begin writing.",
      "Connect shape and color lessons to books and storytelling so children can use new words in context."
    ]
  },
  {
    title: "Using stories to grow vocabulary",
    paragraphs: [
      "Story reading exposes children to richer language than everyday conversation. Choose short stories with repeated phrases, expressive characters, and clear emotional themes.",
      "Pause during reading to ask simple questions: What happened first? Why is the character happy? Which word is new today? These prompts build comprehension and memory.",
      "Retelling the story in their own words helps children practice sequencing and speaking confidence."
    ]
  },
  {
    title: "Simple weekly learning routine for ages 3-7",
    paragraphs: [
      "A practical home routine can include 10-15 minutes of letters or phonics, 10 minutes of number activities, and 10 minutes of reading or storytelling. Keep one day flexible for creative play.",
      "Consistency matters more than duration. Short sessions across the week help children retain skills and reduce frustration.",
      "Track small wins such as mastering new sounds or reading a short word independently. Visible progress motivates children to continue."
    ]
  },
  {
    title: "How parents and teachers can support together",
    paragraphs: [
      "Children progress faster when adults use similar language and goals at home and school. Share which sounds, words, or number skills are currently being practiced.",
      "Set clear short-term goals such as recognizing five letters or reading ten beginner words. Review progress weekly and adjust activities based on what the child enjoys most.",
      "Collaborative support creates a stable learning environment where children feel safe to try, make mistakes, and improve."
    ]
  }
];

export default function GuidesPage() {
  return (
    <main style={{ maxWidth: 980, margin: "24px auto", padding: "20px" }}>
      <h1>Parent & Teacher Guides</h1>
      <p style={{ color: "#4a5a6a", fontWeight: 600, margin: "6px 0 14px" }}>
        Last updated: March 9, 2026
      </p>
      <p style={{ lineHeight: 1.7, fontSize: "1.08rem" }}>
        These practical guides explain how to support early reading and foundational learning at home
        or in the classroom. Content is written for families, teachers, and caregivers looking for
        simple, research-aligned routines.
      </p>

      {guides.map((guide) => (
        <article key={guide.title} style={{ marginTop: 28 }}>
          <h2>{guide.title}</h2>
          {guide.paragraphs.map((paragraph) => (
            <p key={paragraph} style={{ lineHeight: 1.75 }}>
              {paragraph}
            </p>
          ))}
        </article>
      ))}

      <section style={{ marginTop: 30 }}>
        <h2>More site pages</h2>
        <p>
          <Link to="/">Home</Link> · <Link to="/about">About</Link> · <Link to="/privacy">Privacy</Link> · <Link to="/go-live">Go Live</Link> ·{" "}
          <Link to="/terms">Terms</Link> · <Link to="/contact">Contact</Link>
        </p>
      </section>
    </main>
  );
}