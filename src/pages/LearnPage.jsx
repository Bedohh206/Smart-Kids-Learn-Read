import React from "react";
import { Link } from "react-router-dom";

export default function LearnPage() {
	return (
		<main style={{ padding: 24 }}>
			<h2>Learning Modules</h2>
			<ul>
				<li><Link to="/alphabet">Alphabet</Link></li>
				<li><Link to="/phonics">Phonics</Link></li>
				<li><Link to="/numbers">Numbers</Link></li>
				<li><Link to="/spelling">Spelling</Link></li>
				<li><Link to="/shapes-colors">Shapes & Colors</Link></li>
				<li><Link to="/matching">Matching Game</Link></li>
				<li><Link to="/quiz">Quiz</Link></li>
			</ul>
		</main>
	);
}
