import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/images/home/main-hero.png";
import { greetChild } from "../utils/voiceInteraction";
import { startVoiceCommandListener, stopVoiceCommandListener } from "../utils/voiceCommands";
import { announcePageContent, announceHelp } from "../utils/accessibility";
import { useKeyboardNavigation } from "../utils/useKeyboardNavigation";
import "../HomePage.css";

export default function HomePage() {
	const navigate = useNavigate();
	const [isListening, setIsListening] = useState(false);
	const [recognition, setRecognition] = useState(null);
	const [blindMode, setBlindMode] = useState(false);
	
	// Enable keyboard navigation
	useKeyboardNavigation('Home');
	const categories = [
		{ path: "/alphabet", title: "Alphabet", emoji: "🔤", color: "#FF6B6B", desc: "Learn your ABCs!" },
		{ path: "/phonics", title: "Phonics", emoji: "🗣️", color: "#4ECDC4", desc: "Sound it out!" },
		{ path: "/numbers", title: "Numbers", emoji: "🔢", color: "#45B7D1", desc: "Count with us!" },
		{ path: "/math", title: "Math Practice", emoji: "➕", color: "#96CEB4", desc: "Solve problems!" },
		{ path: "/spelling", title: "Spelling", emoji: "✏️", color: "#FFEAA7", desc: "Spell words!" },
		{ path: "/shapes-colors", title: "Shapes & Colors", emoji: "🎨", color: "#DDA15E", desc: "Learn shapes!" },
		{ path: "/continents", title: "Continents", emoji: "🌍", color: "#54A0FF", desc: "Explore the world!" }
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

	// Handle voice commands
	const handleVoiceCommand = () => {
		if (isListening && recognition) {
			stopVoiceCommandListener(recognition);
			setRecognition(null);
			setIsListening(false);
		} else {
			const recog = startVoiceCommandListener(navigate, setIsListening);
			setRecognition(recog);
		}
	};

	return (
		<div className="home-page">
			{/* Voice Command Button */}
			<button
				onClick={handleVoiceCommand}
				aria-label={isListening ? "Stop Voice Command" : "Start Voice Command"}
				style={{
					position: "fixed",
					bottom: 32,
					right: 32,
					width: 80,
					height: 80,
					borderRadius: "50%",
					backgroundColor: isListening ? "#FF6B6B" : "#4CAF50",
					color: "white",
					border: "none",
					fontSize: 40,
					cursor: "pointer",
					boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
					zIndex: 1000,
					transition: "all 0.3s ease",
					animation: isListening ? "pulse 1s infinite" : "none"
				}}
				title={isListening ? "Stop Voice Command (Press V)" : "Start Voice Command (Press V)"}
			>
				{isListening ? "🔴" : "🎤"}
			</button>

			{/* Accessibility Help Button */}
			<button
				onClick={() => announceHelp('Home')}
				aria-label="Help and Instructions"
				style={{
					position: "fixed",
					bottom: 32,
					right: 120,
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
				<h2 className="section-title">
					🎯 Choose Your Adventure!
				</h2>
				<div className="categories-grid">
					{categories.map((category, index) => (
						<Link 
							to={category.path} 
							key={category.path}
							className="category-card"
							aria-label={`${category.title}: ${category.desc}`}
							tabIndex={0}
							onFocus={() => {
								if (blindMode) {
									const shortcutKey = category.path === '/alphabet' ? 'A' : 
														category.path === '/numbers' ? 'N' : 
														category.path === '/math' ? 'M' : 
														category.path === '/spelling' ? 'S' : 
														category.path === '/phonics' ? 'P' : 
														category.path === '/shapes-colors' ? 'C' : 'W';
									announcePageContent(category.title, `${category.desc} Press Enter to go, or press ${shortcutKey} anytime.`);
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
