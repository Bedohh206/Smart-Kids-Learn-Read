import React from "react";
import { shapes } from "../data/shapes";
import { Howl } from "howler";

function ShapeSVG({ name }) {
	switch (name.toLowerCase()) {
		case "circle":
			return (
				<svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
					<circle cx="32" cy="32" r="20" fill="#ffd54f" stroke="#f57f17" strokeWidth="2" />
				</svg>
			);
		case "square":
			return (
				<svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
					<rect x="12" y="12" width="40" height="40" rx="6" fill="#90caf9" stroke="#0b84ff" strokeWidth="2" />
				</svg>
			);
		case "triangle":
			return (
				<svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
					<polygon points="32,12 52,52 12,52" fill="#a5d6a7" stroke="#2e7d32" strokeWidth="2" />
				</svg>
			);
		case "rectangle":
			return (
				<svg width="80" height="64" viewBox="0 0 80 64" aria-hidden="true">
					<rect x="8" y="12" width="64" height="40" rx="6" fill="#f48fb1" stroke="#c2185b" strokeWidth="2" />
				</svg>
			);
		case "star":
			return (
				<svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
					<polygon points="32,8 39,26 58,26 42,38 48,56 32,46 16,56 22,38 6,26 25,26" fill="#ffe082" stroke="#ffb300" strokeWidth="2" />
				</svg>
			);
		case "oval":
			return (
				<svg width="80" height="48" viewBox="0 0 80 48" aria-hidden="true">
					<ellipse cx="40" cy="24" rx="32" ry="18" fill="#b39ddb" stroke="#6a1b9a" strokeWidth="2" />
				</svg>
			);
		default:
			return null;
	}
}

export default function ShapesColors() {
	const colors = ["Red", "Blue", "Green", "Yellow"];

	const play = (audio) => {
		if (!audio) return;
		new Howl({ src: [`/audio/shapes/${audio}`], volume: 1.0 }).play();
	};

	return (
		<div style={{ padding: 24 }}>
			<h2>Shapes & Colors</h2>

			<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12 }}>
				{shapes.map((s) => (
					<button
						key={s.name}
						onClick={() => play(s.audio)}
						aria-label={`Play ${s.name}`}
						style={{ padding: 14, borderRadius: 10, background: "#fff", boxShadow: "0 6px 12px rgba(0,0,0,0.06)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
					>
						<div role="img" aria-label={s.name}>
							<ShapeSVG name={s.name} />
						</div>
						<div style={{ fontSize: 16, fontWeight: 700 }}>{s.name}</div>
					</button>
				))}
			</div>

			<div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
				{colors.map((c) => (
					<div key={c} role="img" aria-label={c} style={{ padding: 12, borderRadius: 8, background: c.toLowerCase(), color: "white" }}>{c}</div>
				))}
			</div>
		</div>
	);
}
