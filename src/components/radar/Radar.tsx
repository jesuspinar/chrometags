import React, { useState } from "react";
import "./Radar.css";

interface RadarProps {
	onClick: () => void;
	onCancel: () => void;
}

const Radar: React.FC<RadarProps> = ({ onClick, onCancel }) => {
	const [isAnimating, setIsAnimating] = useState(false);

	const handleToggle = () => {
		if (isAnimating) {
			setIsAnimating(false);
			onCancel();
		} else {
			setIsAnimating(true);
			onClick();
		}
	};

	return (
		<div className={`outer-circle ${isAnimating ? "active" : ""}`} onClick={handleToggle}>
			<div className={`scanner ${isAnimating ? "active" : ""}`}></div>
		</div>
	);
};

export default Radar;
