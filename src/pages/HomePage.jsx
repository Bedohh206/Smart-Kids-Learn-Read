import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/home/main-hero.png";
import "../HomePage.css";

export default function HomePage() {
	const categories = [
		{ path: "/alphabet", title: "Alphabet", emoji: "🔤", color: "#FF6B6B", desc: "Learn your ABCs!" },
		{ path: "/phonics", title: "Phonics", emoji: "🗣️", color: "#4ECDC4", desc: "Sound it out!" },
		{ path: "/numbers", title: "Numbers", emoji: "🔢", color: "#45B7D1", desc: "Count with us!" },
		{ path: "/math", title: "Math Practice", emoji: "➕", color: "#96CEB4", desc: "Solve problems!" },
		{ path: "/spelling", title: "Spelling", emoji: "✏️", color: "#FFEAA7", desc: "Spell words!" },
		{ path: "/shapes-colors", title: "Shapes & Colors", emoji: "🎨", color: "#DDA15E", desc: "Learn shapes!" }
	];

	return (
		<div className="home-page">
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
				<h2 className="section-title">
					🎯 Choose Your Adventure!
				</h2>
				<div className="categories-grid">
					{categories.map((category, index) => (
						<Link 
							to={category.path} 
							key={category.path}
							className="category-card"
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
