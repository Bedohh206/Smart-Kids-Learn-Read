import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { startVoiceCommandListener, stopVoiceCommandListener } from "../utils/voiceCommands";

export default function LearnPage() {
	const navigate = useNavigate();
	const [isListening, setIsListening] = useState(false);
	const [recognition, setRecognition] = useState(null);

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
		<main style={{ padding: 24 }}>
			{/* Voice Command Button */}
			<button
				onClick={handleVoiceCommand}
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
				title={isListening ? "Stop Voice Command" : "Start Voice Command"}
			>
				{isListening ? "🔴" : "🎤"}
			</button>

			<h2>Learning Modules</h2>
			<ul>
				<li><Link to="/alphabet">Alphabet</Link></li>
				<li><Link to="/phonics">Phonics</Link></li>
				<li><Link to="/numbers">Numbers</Link></li>
				<li><Link to="/math">Math Practice</Link></li>
				<li><Link to="/spelling">Spelling</Link></li>
				<li><Link to="/shapes-colors">Shapes & Colors</Link></li>
				<li><Link to="/continents">Continents</Link></li>
				<li><Link to="/blocks">Block Game</Link></li>
				<li><Link to="/matching">Matching Game</Link></li>
				<li><Link to="/quiz">Quiz</Link></li>
			</ul>
		</main>
	);
}
