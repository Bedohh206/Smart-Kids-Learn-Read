import React from "react";

export default function RewardModal({ open, onClose, children }) {
	if (!open) return null;
	return (
		<div className="modal-backdrop" role="presentation">
			<div className="modal" role="dialog" aria-modal="true" aria-label="Reward">
				{children}
				<div style={{ marginTop: 12, textAlign: "right" }}>
					<button onClick={onClose} aria-label="Close reward dialog">Close</button>
				</div>
			</div>
		</div>
	);
}
