import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
	return (
		<main style={{ padding: 24 }}>
			<h1>Smart Kids — Learn & Read</h1>
			<p>Choose a learning area:</p>

			<div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
				<Link to="/learn">Start Learning</Link>
				<Link to="/alphabet">Alphabet</Link>
				<Link to="/phonics">Phonics</Link>
				<Link to="/numbers">Numbers</Link>
				<Link to="/math">Math Practice</Link>
				<Link to="/spelling">Spelling</Link>
				<Link to="/shapes-colors">Shapes & Colors</Link>
			</div>
		</main>
	);
}
