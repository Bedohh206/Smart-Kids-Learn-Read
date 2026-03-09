import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/images/home/main-hero.png";
import { greetChild } from "../utils/voiceInteraction";
import { announcePageContent, announceHelp } from "../utils/accessibility";
import { useKeyboardNavigation } from "../utils/useKeyboardNavigation";
import "../HomePage.css";

export default function HomePage() {
	const navigate = useNavigate();
	const [blindMode, setBlindMode] = useState(false);
	
	// Enable keyboard navigation
	useKeyboardNavigation('Home');
	const categories = [
		// Fun & Creative Activities (Perfect for Under 5)
		{ path: "/art", title: "Art Studio", emoji: "🎨", color: "#FF6B6B", desc: "Draw & paint!", section: "creative" },
		{ path: "/music", title: "Music Studio", emoji: "🎵", color: "#F093FB", desc: "Play instruments!", section: "creative" },
		{ path: "/animals", title: "Animal World", emoji: "🦁", color: "#84FAB0", desc: "Meet animals!", section: "creative" },
		{ path: "/stories", title: "Story Time", emoji: "📚", color: "#A8EDEA", desc: "Listen to stories!", section: "creative" },
		{ path: "/color-mixing", title: "Color Lab", emoji: "🧪", color: "#FFA500", desc: "Mix colors!", section: "creative" },
		{ path: "/patterns", title: "Pattern Games", emoji: "🧩", color: "#FA709A", desc: "Find patterns!", section: "creative" },
		
		// Learning Activities
		{ path: "/alphabet", title: "Alphabet", emoji: "🔤", color: "#4ECDC4", desc: "Learn your ABCs!", section: "learning" },
		{ path: "/phonics", title: "Phonics", emoji: "🗣️", color: "#45B7D1", desc: "Sound it out!", section: "learning" },
		{ path: "/numbers", title: "Numbers", emoji: "🔢", color: "#96CEB4", desc: "Count with us!", section: "learning" },
		{ path: "/shapes-colors", title: "Shapes & Colors", emoji: "⭐", color: "#DDA15E", desc: "Learn shapes!", section: "learning" },
		
		// Advanced Activities
		{ path: "/math", title: "Math Practice", emoji: "➕", color: "#FFEAA7", desc: "Solve problems!", section: "advanced" },
		{ path: "/spelling", title: "Spelling", emoji: "✏️", color: "#54A0FF", desc: "Spell words!", section: "advanced" },
		{ path: "/continents", title: "Continents", emoji: "🌍", color: "#FF6B9D", desc: "Explore the world!", section: "advanced" },
		{ path: "/blocks", title: "Block Game", emoji: "🧱", color: "#C084FC", desc: "Build with blocks!", section: "advanced" }
	];

	// Greet child when page loads
	useEffect(() => {
		const timer = setTimeout(() => {
			greetChild();
			// Announce page for accessibility
			setTimeout(() => {
				announcePageContent(
					'Smart Kids Learn and Read',
					'Welcome! Choose a learning activity. Press I for instructions, or press question mark for keyboard shortcuts.'
				);
			}, 3000);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="home-page">
			{/* Accessibility Help Button */}
			<button
				onClick={() => announceHelp('Home')}
				aria-label="Help and Instructions"
				style={{
					position: "fixed",
					bottom: 32,
					right: 32,
					width: 60,
					height: 60,
					borderRadius: "50%",
					backgroundColor: "#2196F3",
					color: "white",
					border: "none",
					fontSize: 32,
					cursor: "pointer",
					boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
					zIndex: 1000
				}}
				title="Press I for Help"
			>
				ℹ️
			</button>

			{/* Hero Section */}
			<div className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">
						<span className="bounce-letter">S</span>
						<span className="bounce-letter">m</span>
						<span className="bounce-letter">a</span>
						<span className="bounce-letter">r</span>
						<span className="bounce-letter">t</span>
						<span className="space"> </span>
						<span className="bounce-letter">K</span>
						<span className="bounce-letter">i</span>
						<span className="bounce-letter">d</span>
						<span className="bounce-letter">s</span>
					</h1>
					<p className="hero-subtitle">🌟 Learn & Read with Fun! 🌟</p>
					<div className="hero-image-container">
						<img 
							src={heroImage} 
							alt="Kids Learning" 
							className="hero-image"
						/>
					</div>
				</div>
			</div>

			{/* Categories Grid */}
			<div className="categories-container">
				<h2 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
					✨ Fun & Creative Activities! ✨
				</h2>
				<p style={{ textAlign: "center", fontSize: "1.3rem", color: "#666", marginBottom: "30px" }}>
					Perfect for young learners!
				</p>
				<div className="categories-grid">
					{categories.filter(c => c.section === "creative").map((category, index) => (
						<Link 
							to={category.path} 
							key={category.path}
							className="category-card"
							aria-label={`${category.title}: ${category.desc}`}
							tabIndex={0}
							onFocus={() => {
								if (blindMode) {
									announcePageContent(category.title, `${category.desc} Press Enter to go.`);
								}
							}}
							style={{ 
								backgroundColor: category.color,
								animationDelay: `${index * 0.1}s`
							}}
						>
							<div className="category-emoji">{category.emoji}</div>
							<h3 className="category-title">{category.title}</h3>
							<p className="category-desc">{category.desc}</p>
							<div className="card-shine"></div>
						</Link>
					))}
				</div>

				<h2 className="section-title" style={{ fontSize: "2.5rem", marginTop: "50px", marginBottom: "10px" }}>
					📖 Learning Activities 📖
				</h2>
				<div className="categories-grid">
					{categories.filter(c => c.section === "learning").map((category, index) => (
						<Link 
							to={category.path} 
							key={category.path}
							className="category-card"
							aria-label={`${category.title}: ${category.desc}`}
							tabIndex={0}
							onFocus={() => {
								if (blindMode) {
									announcePageContent(category.title, `${category.desc} Press Enter to go.`);
								}
							}}
							style={{ 
								backgroundColor: category.color,
								animationDelay: `${index * 0.1}s`
							}}
						>
							<div className="category-emoji">{category.emoji}</div>
							<h3 className="category-title">{category.title}</h3>
							<p className="category-desc">{category.desc}</p>
							<div className="card-shine"></div>
						</Link>
					))}
				</div>

				<h2 className="section-title" style={{ fontSize: "2.5rem", marginTop: "50px", marginBottom: "10px" }}>
					🚀 Challenge Yourself! 🚀
				</h2>
				<div className="categories-grid">
					{categories.filter(c => c.section === "advanced").map((category, index) => (
						<Link 
							to={category.path} 
							key={category.path}
							className="category-card"
							aria-label={`${category.title}: ${category.desc}`}
							tabIndex={0}
							onFocus={() => {
								if (blindMode) {
									announcePageContent(category.title, `${category.desc} Press Enter to go.`);
								}
							}}
							style={{ 
								backgroundColor: category.color,
								animationDelay: `${index * 0.1}s`
							}}
						>
							<div className="category-emoji">{category.emoji}</div>
							<h3 className="category-title">{category.title}</h3>
							<p className="category-desc">{category.desc}</p>
							<div className="card-shine"></div>
						</Link>
					))}
				</div>

				{/* Start Learning Button */}
				<div className="start-button-container">
					<Link to="/learn" className="start-button">
						<span className="button-text">🚀 Start Learning Now!</span>
						<span className="button-arrow">→</span>
					</Link>
				</div>

				{/* Progress Button */}
				<div className="start-button-container" style={{ marginTop: '20px' }}>
					<Link to="/leaderboard" className="progress-button">
						<span className="button-text">🏆 View Your Progress</span>
					</Link>
				</div>

				<section className="site-content-section" aria-label="About this website">
					<h2 className="site-content-title">Why parents and teachers use this website</h2>
					<p>
						Smart Kids Learn &amp; Read provides structured early-learning practice for alphabet,
						phonics, numbers, spelling, and problem-solving. Each activity is designed for short,
						focused sessions so children can build confidence step by step.
					</p>
					<p>
						The platform combines creative play and foundational literacy tasks to support school
						readiness. Families can use it at home, and educators can use it as a classroom
						supplement for guided revision and reinforcement.
					</p>
					<p>
						Explore our Parent &amp; Teacher Guides for practical teaching tips, weekly routines,
						and skill-building strategies for ages 3-7.
					</p>
					<p>
						For transparency, we provide clear policy and contact pages so visitors can review how
						the website operates and how to request support.
					</p>
					<div className="site-footer-links">
						<Link to="/go-live">Go Live Checklist</Link>
						<Link to="/guides">Parent &amp; Teacher Guides</Link>
						<Link to="/about">About</Link>
						<Link to="/privacy">Privacy Policy</Link>
						<Link to="/terms">Terms of Use</Link>
						<Link to="/contact">Contact</Link>
					</div>
				</section>
			</div>

			{/* Floating Elements */}
			<div className="floating-elements">
				<div className="float float-1">⭐</div>
				<div className="float float-2">🎈</div>
				<div className="float float-3">🌈</div>
				<div className="float float-4">✨</div>
				<div className="float float-5">🎵</div>
				<div className="float float-6">🦋</div>
			</div>
		</div>
	);
}
