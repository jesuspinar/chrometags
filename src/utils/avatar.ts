function stringToColor(string: string) {
	let hash = 0;
	let i;

	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}

	return color;
}

function stringAvatar(name: string) {
	if (typeof name !== "string" || name.trim() === "") {
		name = "?";
	}
	const initials = name
		.split(" ")
		.map((part) => part.charAt(0).toUpperCase())
		.join("");

	const bgcolor = stringToColor(name) || "#000";

	return {
		sx: {
			color: "white",
			border: "2px solid white",
			bgcolor: bgcolor,
		},
		children: initials,
	};
}
export default stringAvatar;
